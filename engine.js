// ===========================================================
// ENGINE.JS — Simulasi MIT App Inventor (Designer + Blocks)
// Berisi: definisi komponen, definisi blok, interpreter,
// API pengujian otomatis, dan generator padanan Android Studio.
// Tidak bergantung pada DOM sehingga dapat diuji lewat Node.
// ===========================================================

const WARNA = [
  { v: "#EF4444", l: "Merah" }, { v: "#2563EB", l: "Biru" }, { v: "#10B981", l: "Hijau" },
  { v: "#F59E0B", l: "Kuning" }, { v: "#111827", l: "Hitam" }, { v: "#FFFFFF", l: "Putih" },
  { v: "#7C3AED", l: "Ungu" }, { v: "#9CA3AF", l: "Abu-abu" }
];

const PROPDEF = {
  Text: { t: "text" }, Hint: { t: "text" }, FontSize: { t: "num" },
  BackgroundColor: { t: "color" }, TextColor: { t: "color" },
  Visible: { t: "bool" }, Enabled: { t: "bool" }
};

const KOMP = {
  Button: {
    ikon: "▭", click: true, desk: "Tombol yang dapat ditekan pengguna.",
    props: { Text: "Text for {n}", BackgroundColor: "none", TextColor: "none", FontSize: 14, Enabled: true, Visible: true }
  },
  Label: {
    ikon: "T", desk: "Menampilkan teks; tidak dapat diubah pengguna.",
    props: { Text: "Text for {n}", TextColor: "none", BackgroundColor: "none", FontSize: 14, Visible: true }
  },
  TextBox: {
    ikon: "⌶", desk: "Kolom isian teks untuk input pengguna.",
    props: { Hint: "Hint for {n}", Text: "", FontSize: 14, Enabled: true, Visible: true }
  }
};

// ---------- KOMPONEN ----------
function nextName(type, list) {
  let i = 1;
  while (list.some(c => c.name === type + i)) i++;
  return type + i;
}
function buatKomponen(type, list, props) {
  const name = nextName(type, list);
  const p = {};
  Object.entries(KOMP[type].props).forEach(([k, v]) => { p[k] = typeof v === "string" ? v.replace("{n}", name) : v; });
  Object.assign(p, props || {});
  return { name, type, props: p };
}
function buatDaftarKomponen(specs) {
  const list = [];
  (specs || []).forEach(s => {
    const o = typeof s === "string" ? { type: s } : s;
    list.push(buatKomponen(o.type, list, o.props));
  });
  return list;
}

// ---------- BLOK ----------
const KAT = {
  komponen: { l: "Komponen", c: "#439970" },
  kontrol: { l: "Control", c: "#B18E35" },
  variabel: { l: "Variables", c: "#D05F2D" },
  prosedur: { l: "Procedures", c: "#7C5385" },
  math: { l: "Math", c: "#3F71B5" },
  logika: { l: "Logic", c: "#77AB59" },
  teks: { l: "Text", c: "#B32D5E" },
  warna: { l: "Colors", c: "#7D7D7D" }
};
const KAT_ORDER = ["komponen", "kontrol", "variabel", "prosedur", "math", "logika", "teks", "warna"];

const OP_MATH = [["+", "+"], ["-", "−"], ["*", "×"], ["/", "÷"], ["%", "mod"]];
const OP_CMP = [["=", "="], ["!=", "≠"], ["<", "<"], [">", ">"], ["<=", "≤"], [">=", "≥"]];
const OP_LOG = [["and", "and"], ["or", "or"]];
const BOOLS = [["true", "true"], ["false", "false"]];

// k: event | decl | stmt | value
// spec: string = label; {s,o} = dropdown; {t} = teks; {n} = angka; {i} = soket nilai
const BD = {
  when_init: { k: "event", cat: "komponen", spec: ["when Screen1.Initialize"], stmts: ["do"] },
  when_click: { k: "event", cat: "komponen", spec: ["when", { s: "comp", o: "btn" }, ".Click"], stmts: ["do"] },
  decl: { k: "decl", cat: "variabel", spec: ["initialize global", { t: "name" }, "to", { i: "value" }], def: { name: "nama" } },
  set_prop: { k: "stmt", cat: "komponen", spec: ["set", { s: "comp", o: "comp" }, ".", { s: "prop", o: "prop" }, "to", { i: "value" }] },
  set_var: { k: "stmt", cat: "variabel", spec: ["set global", { s: "name", o: "var" }, "to", { i: "value" }] },
  if_then: { k: "stmt", cat: "kontrol", spec: ["if", { i: "cond" }], stmts: ["then"] },
  if_else: { k: "stmt", cat: "kontrol", spec: ["if", { i: "cond" }], stmts: ["then", "else"] },
  repeat: { k: "stmt", cat: "kontrol", spec: ["repeat", { i: "count" }, "times"], stmts: ["do"] },
  while_do: { k: "stmt", cat: "kontrol", spec: ["while", { i: "cond" }], stmts: ["do"] },
  proc_def: { k: "decl", cat: "prosedur", spec: ["to", { t: "name" }], stmts: ["do"], def: { name: "prosedur" } },
  proc_call: { k: "stmt", cat: "prosedur", spec: ["call", { s: "name", o: "proc" }] },
  text: { k: "value", cat: "teks", spec: ["“", { t: "text" }, "”"], def: { text: "" } },
  join: { k: "value", cat: "teks", spec: ["join", { i: "a" }, { i: "b" }] },
  number: { k: "value", cat: "math", spec: [{ n: "num" }], def: { num: 0 } },
  math_op: { k: "value", cat: "math", spec: [{ i: "a" }, { s: "op", o: OP_MATH }, { i: "b" }] },
  compare: { k: "value", cat: "math", spec: [{ i: "a" }, { s: "op", o: OP_CMP }, { i: "b" }] },
  bool: { k: "value", cat: "logika", spec: [{ s: "val", o: BOOLS }] },
  logic_op: { k: "value", cat: "logika", spec: [{ i: "a" }, { s: "op", o: OP_LOG }, { i: "b" }] },
  not: { k: "value", cat: "logika", spec: ["not", { i: "a" }] },
  color: { k: "value", cat: "warna", spec: [{ s: "color", o: "warna" }] },
  get_var: { k: "value", cat: "variabel", spec: ["get global", { s: "name", o: "var" }] },
  get_prop: { k: "value", cat: "komponen", spec: [{ s: "comp", o: "comp" }, ".", { s: "prop", o: "prop" }] }
};

let UID_COUNTER = 1;
const uid = () => "b" + (UID_COUNTER++);

function inputsOf(d) { return d.spec.filter(s => typeof s === "object" && s.i).map(s => s.i); }

function B(type, fields, inputs, stmts) {
  const d = BD[type];
  const b = { id: null, type, fields: Object.assign({}, d.def || {}, fields || {}), inputs: {}, stmts: {} };
  inputsOf(d).forEach(n => { b.inputs[n] = (inputs && inputs[n]) || null; });
  (d.stmts || []).forEach(n => { b.stmts[n] = (stmts && stmts[n]) || []; });
  return b;
}

// Pembangun ringkas untuk data pelajaran
const T = s => B("text", { text: s });
const N = n => B("number", { num: n });
const GET = n => B("get_var", { name: n });
const PROP = (c, p) => B("get_prop", { comp: c, prop: p });
const COL = h => B("color", { color: h });
const MATH = (op, a, b) => B("math_op", { op }, { a, b });
const CMP = (op, a, b) => B("compare", { op }, { a, b });
const SET = (c, p, v) => B("set_prop", { comp: c, prop: p }, { value: v });
const SETV = (n, v) => B("set_var", { name: n }, { value: v });
const DECL = (n, v) => B("decl", { name: n }, { value: v });
const CLICK = (c, ...body) => B("when_click", { comp: c }, {}, { do: body });
const INIT = (...body) => B("when_init", {}, {}, { do: body });
const IFELSE = (c, t, e) => B("if_else", {}, { cond: c }, { then: t, else: e });
const REPEAT = (n, body) => B("repeat", {}, { count: n }, { do: body });
const WHILE = (c, body) => B("while_do", {}, { cond: c }, { do: body });
const PROC = (n, ...body) => B("proc_def", { name: n }, {}, { do: body });
const CALL = n => B("proc_call", { name: n });

function walkBlocks(list, fn) {
  list.forEach(b => {
    if (!b) return;
    fn(b);
    Object.values(b.inputs).forEach(c => { if (c) walkBlocks([c], fn); });
    Object.values(b.stmts).forEach(l => walkBlocks(l, fn));
  });
}
function assignIds(list) { walkBlocks(list, b => { if (!b.id) b.id = uid(); }); return list; }
const clone = o => JSON.parse(JSON.stringify(o));

function optsFor(b, s, state) {
  const o = s.o, comps = state.komponen;
  if (Array.isArray(o)) return o;
  if (o === "comp") return comps.length ? comps.map(c => [c.name, c.name]) : [["", "(tidak ada komponen)"]];
  if (o === "btn") {
    const l = comps.filter(c => KOMP[c.type].click);
    return l.length ? l.map(c => [c.name, c.name]) : [["", "(tidak ada Button)"]];
  }
  if (o === "prop") {
    const c = comps.find(x => x.name === b.fields.comp);
    const k = c ? Object.keys(KOMP[c.type].props) : [];
    return k.length ? k.map(x => [x, x]) : [["", "-"]];
  }
  if (o === "var") {
    const n = [];
    walkBlocks(state.blok, x => { if (x.type === "decl" && x.fields.name && !n.includes(x.fields.name)) n.push(x.fields.name); });
    return n.length ? n.map(x => [x, x]) : [["", "(buat variabel dulu)"]];
  }
  if (o === "proc") {
    const n = [];
    walkBlocks(state.blok, x => { if (x.type === "proc_def" && x.fields.name && !n.includes(x.fields.name)) n.push(x.fields.name); });
    return n.length ? n.map(x => [x, x]) : [["", "(buat prosedur dulu)"]];
  }
  if (o === "warna") return WARNA.map(w => [w.v, w.l]);
  return [["", ""]];
}
function fixFields(b, state) {
  BD[b.type].spec.forEach(s => {
    if (typeof s === "object" && s.s) {
      const opts = optsFor(b, s, state);
      if (!opts.some(o => o[0] === b.fields[s.s])) b.fields[s.s] = opts[0][0];
    }
  });
}

// ---------- STATE ----------
function stateAwal(spec) {
  const st = {
    komponen: buatDaftarKomponen(spec && spec.komponen),
    blok: assignIds(clone((spec && spec.blok) || []))
  };
  walkBlocks(st.blok, b => fixFields(b, st));
  return st;
}

// ---------- INTERPRETER ----------
function fmt(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "number") return String(Math.round(v * 1e6) / 1e6);
  return String(v);
}
function isNum(v) {
  return typeof v === "number" || (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v.replace(",", "."))));
}
function toNum(v) {
  if (typeof v === "number") return v;
  const n = parseFloat(String(v === null || v === undefined ? "" : v).replace(",", "."));
  return isNaN(n) ? 0 : n;
}

function createRuntime(state) {
  const comps = {};
  state.komponen.forEach(c => { comps[c.name] = { type: c.type, props: Object.assign({}, c.props) }; });
  const rt = { comps, globals: {}, errors: [], warns: [], steps: 0, depth: 0 };
  const init = [], clicks = {}, decls = [], procs = {};
  state.blok.forEach(b => {
    if (b.type === "decl") decls.push(b);
    else if (b.type === "proc_def") procs[b.fields.name] = b;
    else if (b.type === "when_init") init.push(b);
    else if (b.type === "when_click") (clicks[b.fields.comp] = clicks[b.fields.comp] || []).push(b);
  });
  const tick = () => {
    if (++rt.steps > 20000) throw new Error("Program dihentikan: terlalu banyak langkah (kemungkinan perulangan tak berujung).");
  };
  const ev = (b) => {
    if (!b) { rt.warns.push("Ada soket nilai yang masih kosong."); return null; }
    tick();
    const f = b.fields;
    switch (b.type) {
      case "text": return f.text || "";
      case "number": return Number(f.num) || 0;
      case "bool": return f.val === "true";
      case "color": return f.color;
      case "get_var":
        if (!(f.name in rt.globals)) throw new Error('Variabel "' + f.name + '" belum dibuat.');
        return rt.globals[f.name];
      case "get_prop": {
        const c = comps[f.comp];
        if (!c) throw new Error('Komponen "' + f.comp + '" tidak ditemukan.');
        return c.props[f.prop];
      }
      case "math_op": {
        const a = toNum(ev(b.inputs.a)), c = toNum(ev(b.inputs.b));
        if (f.op === "+") return a + c;
        if (f.op === "-") return a - c;
        if (f.op === "*") return a * c;
        if (f.op === "%") { if (c === 0) throw new Error("Pembagian dengan nol."); return a % c; }
        if (c === 0) throw new Error("Pembagian dengan nol.");
        return a / c;
      }
      case "compare": {
        const a = ev(b.inputs.a), c = ev(b.inputs.b);
        if (f.op === "=" || f.op === "!=") {
          const eq = (isNum(a) && isNum(c)) ? toNum(a) === toNum(c) : fmt(a) === fmt(c);
          return f.op === "=" ? eq : !eq;
        }
        const x = toNum(a), y = toNum(c);
        return f.op === "<" ? x < y : f.op === ">" ? x > y : f.op === "<=" ? x <= y : x >= y;
      }
      case "logic_op": {
        const a = !!ev(b.inputs.a), c = !!ev(b.inputs.b);
        return f.op === "and" ? (a && c) : (a || c);
      }
      case "not": return !ev(b.inputs.a);
      case "join": return fmt(ev(b.inputs.a)) + fmt(ev(b.inputs.b));
    }
    throw new Error("Blok tidak dikenal: " + b.type);
  };
  const exec = (list) => list.forEach(s => {
    tick();
    const f = s.fields;
    switch (s.type) {
      case "set_prop": {
        const c = comps[f.comp];
        if (!c) throw new Error('Komponen "' + f.comp + '" tidak ditemukan.');
        if (!(f.prop in c.props)) throw new Error(f.comp + " tidak memiliki properti " + f.prop + ".");
        const v = ev(s.inputs.value);
        if (v === null) return;
        const t = PROPDEF[f.prop].t;
        c.props[f.prop] = t === "text" ? fmt(v) : t === "num" ? toNum(v) : t === "bool" ? (v === true || v === "true") : String(v);
        return;
      }
      case "set_var": {
        if (!f.name) throw new Error("Variabel belum dipilih.");
        const v = ev(s.inputs.value);
        rt.globals[f.name] = v === null ? 0 : v;
        return;
      }
      case "if_then": if (ev(s.inputs.cond)) exec(s.stmts.then); return;
      case "if_else": if (ev(s.inputs.cond)) exec(s.stmts.then); else exec(s.stmts.else); return;
      case "while_do": {
        let n = 0;
        while (ev(s.inputs.cond)) {
          if (++n > 5000) throw new Error("Perulangan while terlalu panjang (kemungkinan tak berujung).");
          exec(s.stmts.do);
        }
        return;
      }
      case "proc_call": {
        const pr = procs[f.name];
        if (!pr) throw new Error('Prosedur "' + f.name + '" belum dibuat.');
        if (++rt.depth > 50) { rt.depth = 0; throw new Error("Pemanggilan prosedur terlalu dalam."); }
        try { exec(pr.stmts.do); } finally { if (rt.depth > 0) rt.depth--; }
        return;
      }
      case "repeat": {
        const n = Math.max(0, Math.floor(toNum(ev(s.inputs.count))));
        if (n > 1000) throw new Error("Jumlah pengulangan terlalu besar (maks. 1000).");
        for (let i = 0; i < n; i++) exec(s.stmts.do);
        return;
      }
    }
  });
  const safe = (fn) => { try { fn(); } catch (e) { rt.errors.push(e.message); } };
  rt.start = () => {
    safe(() => decls.forEach(d => { const v = ev(d.inputs.value); rt.globals[d.fields.name] = v === null ? 0 : v; }));
    init.forEach(h => safe(() => exec(h.stmts.do)));
  };
  rt.click = (name) => {
    const c = comps[name];
    if (!c || c.props.Enabled === false || c.props.Visible === false) return;
    (clicks[name] || []).forEach(h => safe(() => exec(h.stmts.do)));
  };
  rt.setText = (name, v) => { if (comps[name]) comps[name].props.Text = String(v); };
  rt.get = (n, p) => comps[n] ? comps[n].props[p] : undefined;
  return rt;
}

// ---------- API PENGUJIAN ----------
function makeTestApi(state) {
  const rts = [];
  return {
    jumlah: t => state.komponen.filter(c => c.type === t).length,
    ada: n => state.komponen.some(c => c.name === n),
    prop: (n, p) => { const c = state.komponen.find(x => x.name === n); return c ? c.props[p] : undefined; },
    kotlin: () => genKotlin(state),
    blok: t => { let n = 0; walkBlocks(state.blok, b => { if (!t || b.type === t) n++; }); return n; },
    kosong: () => { let n = 0; walkBlocks(state.blok, b => { Object.values(b.inputs).forEach(v => { if (!v) n++; }); }); return n; },
    jalan: () => { const rt = createRuntime(state); rt.start(); rts.push(rt); return rt; },
    pesan: () => {
      const e = [], w = [];
      rts.forEach(r => { r.errors.forEach(x => { if (!e.includes(x)) e.push(x); }); r.warns.forEach(x => { if (!w.includes(x)) w.push(x); }); });
      return { errors: e, warns: w };
    }
  };
}

// ---------- GENERATOR PADANAN ANDROID STUDIO ----------
function ktVar(n) { return n ? n.charAt(0).toLowerCase() + n.slice(1) : "view"; }
function ktIndent(s, n) { const p = "    ".repeat(n); return s.split("\n").map(l => l ? p + l : l).join("\n"); }
function ktGetter(c, p) {
  const v = ktVar(c);
  switch (p) {
    case "Text": return v + ".text.toString()";
    case "Hint": return v + ".hint.toString()";
    case "FontSize": return v + ".textSize";
    case "Visible": return "(" + v + ".visibility == View.VISIBLE)";
    case "Enabled": return v + ".isEnabled";
    case "TextColor": return v + ".currentTextColor";
    default: return "(" + v + ".background as ColorDrawable).color";
  }
}
function ktName(n) { return String(n || "prosedur").replace(/\W+/g, "_"); }
function ktNum(b) {
  if (b && b.type === "get_prop" && b.fields.prop === "Text") return "(" + ktVar(b.fields.comp) + ".text.toString().toDoubleOrNull() ?: 0.0)";
  return ktExpr(b);
}
function ktExpr(b) {
  if (!b) return "/* kosong */";
  const f = b.fields;
  switch (b.type) {
    case "text": return JSON.stringify(f.text || "");
    case "number": return String(Number(f.num) || 0);
    case "bool": return f.val;
    case "color": return 'Color.parseColor("' + f.color + '")';
    case "get_var": return f.name || "/* variabel */";
    case "get_prop": return ktGetter(f.comp, f.prop);
    case "math_op": return "(" + ktNum(b.inputs.a) + " " + f.op + " " + ktNum(b.inputs.b) + ")";
    case "compare": {
      const eq = f.op === "=" || f.op === "!=";
      const x = eq ? ktExpr(b.inputs.a) : ktNum(b.inputs.a), y = eq ? ktExpr(b.inputs.b) : ktNum(b.inputs.b);
      return "(" + x + " " + (f.op === "=" ? "==" : f.op) + " " + y + ")";
    }
    case "logic_op": return "(" + ktExpr(b.inputs.a) + (f.op === "and" ? " && " : " || ") + ktExpr(b.inputs.b) + ")";
    case "not": return "!" + ktExpr(b.inputs.a);
    case "join": return "(" + ktExpr(b.inputs.a) + ".toString() + " + ktExpr(b.inputs.b) + ".toString())";
  }
  return "/* ? */";
}
function ktStr(b) {
  if (b && (b.type === "text" || b.type === "join" || (b.type === "get_prop" && (b.fields.prop === "Text" || b.fields.prop === "Hint")))) return ktExpr(b);
  return ktExpr(b) + ".toString()";
}
function ktBody(list) { return ktIndent(list.length ? ktStmts(list) : "// (kosong)", 1); }
function ktStmts(list) { return list.map(ktStmt).join("\n"); }
function ktStmt(b) {
  const f = b.fields, v = ktVar(f.comp || "");
  switch (b.type) {
    case "set_prop": {
      const e = ktExpr(b.inputs.value);
      switch (f.prop) {
        case "Text": return v + ".text = " + ktStr(b.inputs.value);
        case "Hint": return v + ".hint = " + ktStr(b.inputs.value);
        case "FontSize": return v + ".textSize = " + e + ".toFloat()";
        case "Visible": return v + ".visibility = if (" + e + ") View.VISIBLE else View.GONE";
        case "Enabled": return v + ".isEnabled = " + e;
        case "TextColor": return v + ".setTextColor(" + e + ")";
        default: return v + ".setBackgroundColor(" + e + ")";
      }
    }
    case "set_var": return (f.name || "variabel") + " = " + ktExpr(b.inputs.value);
    case "if_then": return "if (" + ktExpr(b.inputs.cond) + ") {\n" + ktBody(b.stmts.then) + "\n}";
    case "if_else": return "if (" + ktExpr(b.inputs.cond) + ") {\n" + ktBody(b.stmts.then) + "\n} else {\n" + ktBody(b.stmts.else) + "\n}";
    case "while_do": return "while (" + ktExpr(b.inputs.cond) + ") {\n" + ktBody(b.stmts.do) + "\n}";
    case "proc_call": return ktName(f.name) + "()";
    case "repeat": return "repeat(" + ktExpr(b.inputs.count) + ".toInt()) {\n" + ktBody(b.stmts.do) + "\n}";
  }
  return "";
}
function genKotlin(state) {
  const decls = state.blok.filter(b => b.type === "decl");
  const inits = state.blok.filter(b => b.type === "when_init");
  const clicks = state.blok.filter(b => b.type === "when_click");
  const L = [];
  if (state.komponen.length) L.push("// View (dari activity_main.xml): " + state.komponen.map(c => ktVar(c.name)).join(", "));
  L.push("class MainActivity : AppCompatActivity() {");
  decls.forEach(d => L.push("    var " + (d.fields.name || "variabel") + " = " + ktExpr(d.inputs.value)));
  if (decls.length) L.push("");
  state.blok.filter(b => b.type === "proc_def").forEach(pd => {
    L.push("    fun " + ktName(pd.fields.name) + "() {");
    L.push(ktIndent(pd.stmts.do.length ? ktStmts(pd.stmts.do) : "// (kosong)", 2));
    L.push("    }", "");
  });
  L.push("    override fun onCreate(savedInstanceState: Bundle?) {",
    "        super.onCreate(savedInstanceState)",
    "        setContentView(R.layout.activity_main)");
  const parts = [];
  inits.forEach(h => parts.push("// when Screen1.Initialize\n" + (h.stmts.do.length ? ktStmts(h.stmts.do) : "// (kosong)")));
  clicks.forEach(h => parts.push(ktVar(h.fields.comp) + ".setOnClickListener {\n" + ktBody(h.stmts.do) + "\n}"));
  L.push(parts.length ? "\n" + ktIndent(parts.join("\n\n"), 2) : "        // (belum ada logika — susun blok pada tab Blocks)");
  L.push("    }", "}");
  return L.join("\n");
}
function xesc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
function genXml(state) {
  const tag = { Button: "Button", Label: "TextView", TextBox: "EditText" };
  const L = ['<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"',
    '    android:layout_width="match_parent"', '    android:layout_height="match_parent"',
    '    android:orientation="vertical">'];
  state.komponen.forEach(c => {
    const p = c.props, d = KOMP[c.type].props;
    const a = ['android:id="@+id/' + ktVar(c.name) + '"', 'android:layout_width="match_parent"', 'android:layout_height="wrap_content"'];
    if (p.Text) a.push('android:text="' + xesc(p.Text) + '"');
    if (p.Hint) a.push('android:hint="' + xesc(p.Hint) + '"');
    if (p.FontSize !== d.FontSize) a.push('android:textSize="' + p.FontSize + 'sp"');
    if (p.TextColor && p.TextColor !== "none" && p.TextColor !== d.TextColor) a.push('android:textColor="' + p.TextColor + '"');
    if (p.BackgroundColor && p.BackgroundColor !== "none" && p.BackgroundColor !== d.BackgroundColor)
      a.push((c.type === "Button" ? 'android:backgroundTint="' : 'android:background="') + p.BackgroundColor + '"');
    if (p.Visible === false) a.push('android:visibility="gone"');
    if (p.Enabled === false) a.push('android:enabled="false"');
    L.push("");
    L.push("    <" + tag[c.type]);
    a.forEach((x, i) => L.push("        " + x + (i === a.length - 1 ? " />" : "")));
  });
  L.push("", "</LinearLayout>");
  return L.join("\n");
}
