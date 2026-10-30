// ===========================================================
// APP.JS — Antarmuka & logika Praktikum MIT App Inventor
// Bergantung pada engine.js (simulasi) dan data.js (kurikulum).
// Penyimpanan: localStorage dengan fallback memori (protokol file://).
// ===========================================================

// ---------- STORAGE ----------
const memoryStore = {};
let STORAGE_MODE = "local";
(function detectStorage() {
  try { localStorage.setItem("__t__", "1"); localStorage.removeItem("__t__"); STORAGE_MODE = "local"; }
  catch (e) { STORAGE_MODE = "memory"; }
})();
function storageGet(k) {
  if (STORAGE_MODE === "local") { try { return localStorage.getItem(k); } catch (e) { return memoryStore[k] ?? null; } }
  return memoryStore[k] ?? null;
}
function storageSet(k, v) {
  if (STORAGE_MODE === "local") { try { localStorage.setItem(k, v); return; } catch (e) { /* ke memori */ } }
  memoryStore[k] = v;
}
function storageRemove(k) {
  if (STORAGE_MODE === "local") { try { localStorage.removeItem(k); return; } catch (e) { /* ke memori */ } }
  delete memoryStore[k];
}
function renderStorageWarning() {
  const el = $("storageWarning");
  if (STORAGE_MODE === "memory") {
    el.style.display = "block";
    el.innerHTML = "<strong>Perhatian:</strong> penyimpanan lokal tidak tersedia pada peramban ini. Progres dan nilai hanya tersimpan selama tab terbuka.";
    document.querySelector("main").style.marginTop = "42px";
  }
}
const LS = { progress: "ai_lab_progress", history: "ai_quiz_history", work: "ai_lab_work_v2" };
function readJSON(k, fb) { try { const v = JSON.parse(storageGet(k)); return v == null ? fb : v; } catch (e) { return fb; } }
function writeJSON(k, v) { storageSet(k, JSON.stringify(v)); }

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

BAB.forEach(b => b.pelajaran.forEach((p, i) => { p.no = b.nomor + "." + (i + 1); }));
const SEMUA = BAB.flatMap(b => b.pelajaran.map(p => Object.assign({}, p, { babId: b.id })));
const getProgress = () => readJSON(LS.progress, {});
const setDone = id => { const p = getProgress(); p[id] = true; writeJSON(LS.progress, p); };
const getHistory = () => readJSON(LS.history, []);

// ---------- NAVIGASI ----------
const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav-item");
let ACTIVE_BAB_ID = null;

function gotoPage(name) {
  if (name === "belajar" && !Lab.lessonId) {
    const p = getProgress();
    loadLesson((SEMUA.find(x => !p[x.id]) || SEMUA[0]).id);
  }
  pages.forEach(p => p.classList.toggle("active", p.id === "page-" + name));
  navItems.forEach(n => n.classList.toggle("active", n.dataset.page === name));
  document.body.classList.toggle("lab-mode", name === "belajar");
  if (name === "home") renderHome();
  if (name === "belajar") renderBelajar();
  if (name === "kuis") renderKuisPage();
  if (name === "nilai") renderNilai();
  if (name === "pustaka") renderPustaka();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
navItems.forEach(b => b.addEventListener("click", () => gotoPage(b.dataset.page)));
document.body.addEventListener("click", e => {
  const el = e.target.closest("[data-goto]");
  if (el) gotoPage(el.dataset.goto);
});
function updateSidebarFoot() {
  const L = currentLesson();
  $("sidebarFoot").textContent = L ? "Pelajaran " + L.no + " — " + L.judul : "Pilih pelajaran untuk mulai";
}

// ===========================================================
// HOME
// ===========================================================
const LOCK_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const OPEN_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#047857" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/></svg>';
let HOME_BAB = null;
const babDone = b => { const p = getProgress(); return b.pelajaran.every(x => p[x.id]); };
const babSisa = b => { const p = getProgress(); return b.pelajaran.filter(x => !p[x.id]); };
function nextLessonId() { const p = getProgress(); const x = SEMUA.find(s => !p[s.id]); return x ? x.id : null; }

function renderHome() {
  const prog = getProgress();
  const total = SEMUA.length, done = SEMUA.filter(p => prog[p.id]).length;
  $("statSubbab").textContent = done + "/" + total;
  $("statSubbabNote").textContent = "Dari " + BAB.length + " bab";
  const h = getHistory();
  $("statAttempts").textContent = h.length;
  $("statAttemptsNote").textContent = h.length ? "Terakhir: " + new Date(h[0].date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "Belum ada percobaan";
  if (h.length) {
    const best = h.reduce((a, b) => b.score > a.score ? b : a, h[0]);
    $("statBest").textContent = best.score + "%";
    $("statBestNote").textContent = best.babJudul + " · " + best.correct + "/" + best.total + " benar";
  } else { $("statBest").textContent = "—"; $("statBestNote").textContent = "Belum ada percobaan kuis"; }

  const nid = nextLessonId(), nl = nid && SEMUA.find(x => x.id === nid);
  const cta = $("heroCta");
  cta.textContent = !nl ? "Tinjau kembali Pelajaran 1.1 →" : (done === 0 ? "Mulai Pelajaran " + nl.no + " →" : "Lanjutkan Pelajaran " + nl.no + " →");
  cta.dataset.lesson = nl ? nl.id : SEMUA[0].id;

  if (!HOME_BAB || !BAB.some(b => b.id === HOME_BAB)) HOME_BAB = nl ? nl.babId : BAB[0].id;
  $("babSelect").innerHTML = BAB.map(b => {
    const d = b.pelajaran.filter(p => prog[p.id]).length;
    return `<option value="${b.id}" ${b.id === HOME_BAB ? "selected" : ""}>Bab ${b.nomor} — ${esc(b.judul)} (${d}/${b.pelajaran.length} selesai)</option>`;
  }).join("");
  renderBabPanel();
}

function renderBabPanel() {
  const prog = getProgress(), bab = BAB.find(b => b.id === HOME_BAB) || BAB[0];
  const d = bab.pelajaran.filter(p => prog[p.id]).length, t = bab.pelajaran.length, nid = nextLessonId();
  const rows = bab.pelajaran.map(p => `
    <li><button class="lesson-row ${p.id === nid ? "next" : ""}" data-lesson="${p.id}">
      <span class="ls ${prog[p.id] ? "ok" : ""}">${prog[p.id] ? "✓" : esc(p.no)}</span>
      <span>${esc(p.judul)}</span><span class="mode-chip">${esc(p.mode)}</span></button></li>`).join("");
  const open = d === t, sisa = babSisa(bab);
  const quiz = open
    ? `<div class="quiz-box open">${OPEN_SVG}<div class="qb-text"><b>Kuis Bab ${bab.nomor} terbuka</b>${bab.soal.length} soal, jenjang C1–C4.</div><button class="btn" data-kuis="${bab.id}">Kerjakan Kuis →</button></div>`
    : `<div class="quiz-box locked"><span style="color:#4B5563">${LOCK_SVG}</span><div class="qb-text"><b>Kuis Bab ${bab.nomor} terkunci</b>Selesaikan ${sisa.length} pelajaran lagi untuk membuka kuis.</div><button class="btn" data-lesson="${sisa[0].id}">Lanjut ke Pelajaran ${esc(sisa[0].no)} →</button></div>`;
  $("babPanel").innerHTML = `
    <div class="bab-num"><span>BAB ${bab.nomor}</span>${open ? '<span class="bab-badge">Selesai</span>' : ""}</div>
    <h2 class="bab-title">${esc(bab.judul)}</h2>
    <p class="bab-desc">${esc(bab.deskripsi)}</p>
    <div class="track"><div class="track-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${d}" aria-label="Progres Bab ${bab.nomor}"><div class="track-fill ${open ? "done" : ""}" style="width:${Math.round(d / t * 100)}%"></div></div><div class="track-label">${d} dari ${t} pelajaran</div></div>
    <ul class="lesson-list">${rows}</ul>
    ${quiz}`;
}
$("babSelect").addEventListener("change", e => { HOME_BAB = e.target.value; renderBabPanel(); });
$("heroCta").addEventListener("click", e => openLesson(e.currentTarget.dataset.lesson));
$("babPanel").addEventListener("click", e => {
  const l = e.target.closest("[data-lesson]");
  if (l) { openLesson(l.dataset.lesson); return; }
  const k = e.target.closest("[data-kuis]");
  if (k) { ACTIVE_BAB_ID = k.dataset.kuis; gotoPage("kuis"); }
});

// ===========================================================
// RUANG PRAKTIK — gaya MIT App Inventor
// ===========================================================
const Lab = {
  lessonId: null, babId: null, state: null, tab: "designer", sel: "Screen1", selSlot: null,
  run: null, hasil: null, hintIdx: 0, fly: null, zoom: 1, device: "phone", showHidden: false, collapsed: {}
};
let DRAG = null;

const currentLesson = () => SEMUA.find(p => p.id === Lab.lessonId) || null;
const izin = () => (currentLesson() && currentLesson().izin) || {};

// ----- ikon -----
const SV = (inner, w) => `<svg viewBox="0 0 24 24" width="${w || 20}" height="${w || 20}" aria-hidden="true">${inner}</svg>`;
const IC = {
  Button: SV('<rect x="3" y="7" width="18" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 12h4" stroke="currentColor" stroke-width="2"/>'),
  Label: SV('<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7.5 17l4.5-10 4.5 10M9.3 13.5h5.4" fill="none" stroke="currentColor" stroke-width="2"/>'),
  TextBox: SV('<path d="M3 7h12M3 12h8M3 17h8" stroke="currentColor" stroke-width="2" fill="none"/><path d="M13 20l1-4 6-6 3 3-6 6z" fill="currentColor"/>'),
  Screen: SV('<rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><rect x="6" y="2" width="12" height="4" fill="#8BC34A"/>'),
  help: SV('<circle cx="12" cy="12" r="9.5" fill="none" stroke="#9E9E9E" stroke-width="1.6"/><text x="12" y="16.5" text-anchor="middle" font-size="13" fill="#9E9E9E" font-family="Arial">?</text>', 14),
  warn: SV('<path d="M12 3L1.5 21h21z" fill="#F4B400"/><path d="M12 10v5M12 17.5v1.5" stroke="#fff" stroke-width="2"/>', 15),
  err: SV('<circle cx="12" cy="12" r="10" fill="#E53935"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" stroke-width="2"/>', 15),
  trash: SV('<path d="M6 7h12l-1 14H7zM9 4h6l1 2H8z" fill="currentColor"/>', 28)
};
const STATUS_ICONS = '<svg width="14" height="12" viewBox="0 0 24 20" aria-hidden="true"><path d="M12 19L0 5a17 17 0 0 1 24 0z" fill="#fff"/></svg><svg width="12" height="12" viewBox="0 0 20 20" aria-hidden="true"><path d="M20 20V0L0 20z" fill="#fff"/></svg><svg width="9" height="14" viewBox="0 0 10 16" aria-hidden="true"><rect x="1" y="2" width="8" height="14" rx="1" fill="#fff"/><rect x="3.5" y="0" width="3" height="2" fill="#fff"/></svg><span>12:30</span>';
const KEBAB = '<svg width="6" height="22" viewBox="0 0 6 22" aria-hidden="true"><circle cx="3" cy="3" r="2.2" fill="#fff"/><circle cx="3" cy="11" r="2.2" fill="#fff"/><circle cx="3" cy="19" r="2.2" fill="#fff"/></svg>';
const NAV_ICONS = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 4v16L5 12z" fill="none" stroke="#fff" stroke-width="2"/></svg><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.5" fill="none" stroke="#fff" stroke-width="2"/></svg><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="1.5" fill="none" stroke="#fff" stroke-width="2"/></svg>';

const PROP_DESC = {
  BackgroundColor: "Warna latar komponen.", TextColor: "Warna huruf.", FontSize: "Ukuran huruf (dalam sp).",
  Text: "Teks yang tampil pada komponen.", Hint: "Petunjuk samar yang tampil saat kolom kosong.",
  Visible: "Menentukan komponen tampil atau tersembunyi.", Enabled: "Menentukan komponen dapat disentuh atau tidak.",
  Title: "Judul yang tampil pada bilah atas layar.", ShowStatusBar: "Menampilkan bilah status ponsel.", TitleVisible: "Menampilkan bilah judul."
};
const SCREEN_DEF = { Title: { t: "text" }, BackgroundColor: { t: "color" }, ShowStatusBar: { t: "bool" }, TitleVisible: { t: "bool" } };
const defOf = k => PROPDEF[k] || SCREEN_DEF[k];
const COMP_SECS = { Appearance: ["BackgroundColor", "FontSize", "Hint", "Text", "TextColor", "Visible"], Behavior: ["Enabled"] };
const SCREEN_SECS = { Appearance: ["BackgroundColor", "ShowStatusBar", "Title", "TitleVisible"] };

// ----- state -----
function normState(st) {
  st.screen = Object.assign({ Title: "Screen1", BackgroundColor: "none", ShowStatusBar: true, TitleVisible: true }, st.screen || {});
  return st;
}
function freshState(p) { return normState(stateAwal(p.awal)); }
function syncUid(st) {
  let max = 0;
  walkBlocks(st.blok, b => { const n = parseInt(String(b.id).slice(1), 10); if (n > max) max = n; });
  if (max >= UID_COUNTER) UID_COUNTER = max + 1;
}

function loadLesson(id) {
  const p = SEMUA.find(x => x.id === id);
  if (!p) return;
  Lab.lessonId = id; Lab.babId = p.babId; ACTIVE_BAB_ID = p.babId;
  Lab.run = null; Lab.hasil = null; Lab.hintIdx = 0; Lab.sel = "Screen1"; Lab.selSlot = null; Lab.fly = null; Lab.zoom = 1; Lab.cek = {};
  const saved = readJSON(LS.work, {})[id];
  Lab.state = saved ? normState(saved) : freshState(p);
  syncUid(Lab.state);
  Lab.tab = p.tabAwal || "designer";
  const iz = p.izin || {};
  if (Lab.tab === "designer" && iz.designer === false) Lab.tab = "blocks";
  if (Lab.tab === "blocks" && iz.blocks === false) Lab.tab = "designer";
  updateSidebarFoot();
}
function openLesson(id) { loadLesson(id); gotoPage("belajar"); }

function saveWork() {
  const all = readJSON(LS.work, {});
  all[Lab.lessonId] = Lab.state;
  writeJSON(LS.work, all);
}

// rerender: true -> segarkan editor (blok/komponen berubah dari luar kontrol yang sedang diedit)
function changed(rerender) {
  if (Lab.run) { Lab.run = null; renderRunBtn(); }
  Lab.hasil = null;
  saveWork();
  renderPhone(); renderStudio(); renderTasks();
  if (rerender) {
    if (Lab.tab === "blocks") { renderBkTree(); renderWorkspace(); renderFlyout(); }
    else renderEditor();
  }
}

function renderBelajar() {
  const bab = BAB.find(b => b.id === Lab.babId);
  $("belajarLabel").textContent = "Sedang berlatih: " + bab.judulLengkap;
  const reading = currentLesson().tipe === "bacaan";
  document.querySelector(".lab").classList.toggle("reading", reading);
  renderLessonTabs(); renderLessonPanel(); renderFooter();
  if (reading) return;
  renderToolbar(); renderEditor(); renderStudio();
  logConsole([{ k: "info", t: "Konsol: hasil pemeriksaan dan pesan kesalahan program muncul di sini." }]);
}

function renderLessonTabs() {
  const bab = BAB.find(b => b.id === Lab.babId), prog = getProgress();
  $("lessonTabs").innerHTML = bab.pelajaran.map(p =>
    `<button class="materi-tab ${p.id === Lab.lessonId ? "active" : ""}" role="tab" data-lesson="${p.id}">${prog[p.id] ? "✓ " : ""}${esc(p.no)} ${esc(p.judul)}</button>`).join("");
}
$("lessonTabs").addEventListener("click", e => {
  const b = e.target.closest("[data-lesson]");
  if (b && b.dataset.lesson !== Lab.lessonId) openLesson(b.dataset.lesson);
});

function renderLessonPanel() {
  const L = currentLesson();
  if (L.tipe === "bacaan") { renderBacaan(L); return; }
  $("lessonPanel").innerHTML = `
    <div class="lp-eyebrow">Pelajaran ${esc(L.no)} · ${esc(L.mode)} <span class="ct-tag">${esc(CT_LABEL[L.ct])}</span></div>
    <h2>${esc(L.judul)}</h2>
    <div class="lp-teori">${L.teori}</div>
    <h3>Tugas</h3>
    <ul class="tasks" id="taskList"></ul>
    <div class="help-row">
      <button class="btn btn-outline btn-sm" id="hintBtn"></button>
      <button class="btn btn-outline btn-sm" id="solBtn">Lihat Solusi</button>
    </div>
    <div class="hint-box" id="hintBox"></div>`;
  renderTasks(); renderHint();
  $("hintBtn").addEventListener("click", () => { if (Lab.hintIdx < L.petunjuk.length) Lab.hintIdx++; renderHint(); });
  $("solBtn").addEventListener("click", muatSolusi);
}
// ----- pelajaran bacaan -----
function renderBacaan(L) {
  $("lessonPanel").innerHTML = `
    <div class="lp-eyebrow">Pelajaran ${esc(L.no)} · Bacaan <span class="ct-tag">${esc(CT_LABEL[L.ct])}</span></div>
    <h2>${esc(L.judul)}</h2>
    <div class="lp-teori">${L.teori}</div>
    <h3>Cek Pemahaman</h3>
    <div id="cekList"></div>`;
  renderCek();
}
function renderCek() {
  const L = currentLesson(), box = $("cekList"); if (!box) return;
  const LT = ["A", "B", "C", "D", "E"];
  const semua = L.cek.every((_, i) => Lab.cek[i] && Lab.cek[i].ok) || !!getProgress()[L.id];
  box.innerHTML = L.cek.map((q, qi) => {
    const st = Lab.cek[qi];
    const opts = q.opsi.map((o, oi) => {
      const cls = st && st.pick === oi ? (st.ok ? "correct" : "incorrect") : "";
      return `<button class="cq-opt ${cls}" data-q="${qi}" data-o="${oi}">${LT[oi]}. ${esc(o)}</button>`;
    }).join("");
    const fb = st ? `<div class="cq-fb">${st.ok ? "<strong>Benar.</strong> " + esc(q.pembahasan) : "<strong>Belum tepat.</strong> Coba pilihan lain."}</div>` : "";
    return `<div class="cek-q"><div class="cq-t">${qi + 1}. ${esc(q.teks)}</div><div class="cq-o">${opts}</div>${fb}</div>`;
  }).join("") + (semua ? `<div class="cek-done">✓ Bacaan selesai. Lanjutkan ke pelajaran berikutnya.</div>` : "");
  if (semua && !getProgress()[L.id]) { setDone(L.id); renderLessonTabs(); renderFooter(); }
}
$("lessonPanel").addEventListener("click", e => {
  const b = e.target.closest(".cq-opt"); if (!b) return;
  const L = currentLesson(); if (!L || L.tipe !== "bacaan") return;
  const qi = +b.dataset.q, oi = +b.dataset.o;
  if (Lab.cek[qi] && Lab.cek[qi].ok) return;
  Lab.cek[qi] = { pick: oi, ok: oi === L.cek[qi].jawaban };
  renderCek();
});

function renderHint() {
  const L = currentLesson(), n = Lab.hintIdx, tot = L.petunjuk.length;
  $("hintBtn").textContent = n >= tot ? "Petunjuk habis (" + tot + "/" + tot + ")" : "💡 Petunjuk (" + n + "/" + tot + ")";
  $("hintBtn").disabled = n >= tot;
  const box = $("hintBox");
  box.classList.toggle("show", n > 0);
  box.innerHTML = n ? "<ol>" + L.petunjuk.slice(0, n).map(h => "<li>" + esc(h) + "</li>").join("") + "</ol>" : "";
}
function renderTasks() {
  const ul = $("taskList"); if (!ul) return;
  const L = currentLesson();
  ul.innerHTML = L.uji.map((u, i) => {
    const r = Lab.hasil && Lab.hasil[i];
    const cls = r ? (r.ok ? "pass" : "fail") : "";
    return `<li class="task ${cls}"><span class="ti" aria-hidden="true">${r ? (r.ok ? "✓" : "✕") : ""}</span><span>${esc(u.teks)}<span class="visually-hidden">${r ? (r.ok ? " (lulus)" : " (belum lulus)") : ""}</span></span></li>`;
  }).join("");
}
function muatSolusi() {
  const L = currentLesson();
  if (!confirm("Tampilkan solusi? Pekerjaan Anda saat ini pada pelajaran ini akan diganti.")) return;
  Lab.state = normState(stateAwal({ komponen: L.solusi.komponen || L.awal.komponen, blok: L.solusi.blok || [] }));
  syncUid(Lab.state);
  Lab.sel = "Screen1"; Lab.selSlot = null; Lab.fly = null;
  changed(true);
  logConsole([{ k: "info", t: "Solusi dimuat. Pelajari strukturnya, tekan ▶ Jalankan, lalu ✓ Periksa Jawaban." }]);
}

// ----- toolbar -----
function renderToolbar() {
  const iz = izin(), L = currentLesson();
  $("aiProj").textContent = "Pelajaran_" + L.no.replace(".", "_");
  document.querySelectorAll(".ed-tab").forEach(b => {
    const t = b.dataset.tab;
    b.classList.toggle("active", t === Lab.tab);
    b.setAttribute("aria-selected", t === Lab.tab ? "true" : "false");
    b.disabled = (t === "designer" && iz.designer === false) || (t === "blocks" && iz.blocks === false);
    b.title = b.disabled ? "Tidak digunakan pada pelajaran ini" : "";
  });
}
document.querySelectorAll(".ed-tab").forEach(b => b.addEventListener("click", () => {
  if (b.disabled) return;
  Lab.tab = b.dataset.tab; Lab.selSlot = null; Lab.fly = null;
  renderToolbar(); renderEditor();
}));
function renderEditor() {
  Lab.tab === "designer" ? renderDesigner() : renderBlocksView();
  renderPhone(); renderRunBtn();
}

function renderRunBtn() {
  $("runBtn").textContent = Lab.run ? "■ Hentikan" : "▶ Jalankan";
  const st = $("emuState");
  if (st) { st.textContent = Lab.run ? "Berjalan" : "Berhenti"; st.classList.toggle("on", !!Lab.run); }
}
$("runBtn").addEventListener("click", () => {
  if (Lab.run) { Lab.run = null; }
  else { Lab.run = createRuntime(Lab.state); Lab.run.start(); flushRuntime(); }
  renderRunBtn(); renderPhone();
});
function flushRuntime() {
  const rt = Lab.run; if (!rt) return;
  const lines = [];
  rt.errors.slice(rt._e || 0).forEach(m => lines.push({ k: "err", t: "Kesalahan: " + m }));
  rt.warns.slice(rt._w || 0).forEach(m => { if (!lines.some(l => l.t === "Peringatan: " + m)) lines.push({ k: "warn", t: "Peringatan: " + m }); });
  rt._e = rt.errors.length; rt._w = rt.warns.length;
  if (lines.length) logConsole(lines);
}
function logConsole(lines) {
  $("console").innerHTML = lines.map(l => `<div class="l-${l.k}">${esc(l.t)}</div>`).join("");
}

$("checkBtn").addEventListener("click", () => {
  const L = currentLesson(), api = makeTestApi(Lab.state);
  Lab.hasil = L.uji.map(u => { let ok = false; try { ok = !!u.cek(api); } catch (e) { ok = false; } return { ok }; });
  const lulus = Lab.hasil.filter(r => r.ok).length, tot = L.uji.length;
  renderTasks();
  const lines = [];
  const ps = api.pesan();
  if (lulus === tot) {
    setDone(L.id); renderLessonTabs(); renderFooter();
    lines.push({ k: "ok", t: "✓ Semua uji lulus (" + lulus + "/" + tot + "). Pelajaran " + L.no + " selesai." });
  } else {
    lines.push({ k: "warn", t: lulus + "/" + tot + " uji lulus. Periksa tugas bertanda ✕; gunakan Petunjuk bila perlu." });
  }
  ps.errors.forEach(m => lines.push({ k: "err", t: "Kesalahan program: " + m }));
  ps.warns.forEach(m => lines.push({ k: "warn", t: "Peringatan: " + m }));
  logConsole(lines);
});
$("resetBtn").addEventListener("click", () => {
  if (!confirm("Atur ulang pekerjaan pelajaran ini ke kondisi awal?")) return;
  Lab.state = freshState(currentLesson()); syncUid(Lab.state);
  Lab.sel = "Screen1"; Lab.selSlot = null; Lab.fly = null;
  changed(true);
  logConsole([{ k: "info", t: "Pekerjaan diatur ulang." }]);
});

function renderStudio() {
  if (!$("codeXml")) return;
  $("codeXml").textContent = genXml(Lab.state);
  $("codeKt").textContent = genKotlin(Lab.state);
}
function renderFooter() {
  const bab = BAB.find(b => b.id === Lab.babId);
  const idx = bab.pelajaran.findIndex(p => p.id === Lab.lessonId);
  const prog = getProgress();
  $("prevLesson").disabled = idx <= 0;
  const last = idx === bab.pelajaran.length - 1;
  $("nextLesson").textContent = last ? "Kerjakan Kuis Bab " + bab.nomor + " →" : "Pelajaran berikutnya →";
  $("nextLesson").className = "btn " + (prog[Lab.lessonId] ? "btn-ok" : "btn-primary");
}
$("prevLesson").addEventListener("click", () => {
  const bab = BAB.find(b => b.id === Lab.babId);
  const idx = bab.pelajaran.findIndex(p => p.id === Lab.lessonId);
  if (idx > 0) openLesson(bab.pelajaran[idx - 1].id);
});
$("nextLesson").addEventListener("click", () => {
  const bab = BAB.find(b => b.id === Lab.babId);
  const idx = bab.pelajaran.findIndex(p => p.id === Lab.lessonId);
  if (idx < bab.pelajaran.length - 1) openLesson(bab.pelajaran[idx + 1].id);
  else { ACTIVE_BAB_ID = bab.id; gotoPage("kuis"); }
});

// ---------- PONSEL ----------
function renderPhone() {
  const host = $("phoneHost"); if (!host) return;
  const mini = host.dataset.mini === "1", running = !!Lab.run, S = Lab.state.screen;
  const dev = { phone: [300, 600], tablet: [420, 600], monitor: [540, 600] }[Lab.device] || [300, 600];
  host.innerHTML = "";
  const ph = document.createElement("div");
  ph.className = "ai-phone" + (running ? " running" : "");
  if (!mini) { ph.style.setProperty("--pw", dev[0] + "px"); ph.style.setProperty("--ph", dev[1] + "px"); }
  if (S.ShowStatusBar) { const sb = document.createElement("div"); sb.className = "ai-status"; sb.innerHTML = STATUS_ICONS; ph.appendChild(sb); }
  if (S.TitleVisible) { const tb = document.createElement("div"); tb.className = "ai-title"; tb.innerHTML = "<span>" + esc(S.Title) + "</span>" + KEBAB; ph.appendChild(tb); }
  const body = document.createElement("div");
  body.className = "ai-screen"; body.dataset.name = "Screen1";
  if (S.BackgroundColor && S.BackgroundColor !== "none") body.style.background = S.BackgroundColor;
  ph.appendChild(body);
  const nav = document.createElement("div"); nav.className = "ai-nav"; nav.innerHTML = NAV_ICONS; ph.appendChild(nav);

  const items = Lab.state.komponen;
  if (!items.length) {
    const h = document.createElement("div"); h.className = "empty";
    h.textContent = running ? "Aplikasi kosong." : "Layar kosong. Seret atau klik komponen pada Palette untuk menambahkannya.";
    body.appendChild(h);
  }
  items.forEach(c => {
    const props = running ? Lab.run.comps[c.name].props : c.props;
    const hidden = props.Visible === false;
    if (hidden && (running || !Lab.showHidden)) return;
    const bg = props.BackgroundColor && props.BackgroundColor !== "none" ? props.BackgroundColor : null;
    const fg = props.TextColor && props.TextColor !== "none" ? props.TextColor : null;
    let el;
    if (c.type === "Button") {
      el = document.createElement("button"); el.type = "button"; el.className = "pc pc-btn"; el.textContent = props.Text;
      if (bg) el.style.background = bg;
      if (fg) el.style.color = fg;
      el.disabled = running && props.Enabled === false;
    } else if (c.type === "Label") {
      el = document.createElement("div"); el.className = "pc pc-lbl"; el.textContent = props.Text;
      if (bg) el.style.background = bg;
      if (fg) el.style.color = fg;
    } else {
      el = document.createElement("input"); el.type = "text"; el.className = "pc pc-txt";
      el.placeholder = props.Hint; el.value = props.Text;
      el.readOnly = !running || props.Enabled === false;
      el.setAttribute("aria-label", c.name);
      if (fg) el.style.color = fg;
    }
    el.style.fontSize = (props.FontSize || 14) + "px";
    el.dataset.name = c.name;
    if (!running) {
      if (hidden) el.classList.add("is-hidden");
      if (Lab.sel === c.name) el.classList.add("is-sel");
    }
    body.appendChild(el);
  });
  host.appendChild(ph);
  const cap = $("phoneCaption");
  if (cap) cap.textContent = running ? "Aplikasi berjalan. Tekan tombol atau isi kolom pada layar." : "Tekan ▶ Jalankan untuk mencoba aplikasi pada emulator.";
}

// ---------- DESIGNER ----------
function palAllowed(t) { const p = izin().palet; return p === undefined || p.includes(t); }
function canEditComps() { const p = izin().palet; return p === undefined || p.length > 0; }

function selectComp(name) {
  Lab.sel = name; renderPhone();
  if (Lab.tab === "designer") { renderTree(); renderProps(); }
}
function addComponent(type) {
  if (!palAllowed(type)) { logConsole([{ k: "warn", t: type + " tidak digunakan pada pelajaran ini." }]); return; }
  const maks = izin().maks || 8;
  if (Lab.state.komponen.length >= maks) { logConsole([{ k: "warn", t: "Jumlah komponen maksimum pada pelajaran ini: " + maks + "." }]); return; }
  const c = buatKomponen(type, Lab.state.komponen);
  Lab.state.komponen.push(c);
  Lab.sel = c.name;
  changed(false);
  if (Lab.tab === "designer") { renderTree(); renderProps(); }
}
function deleteComponent(name) {
  Lab.state.komponen = Lab.state.komponen.filter(c => c.name !== name);
  const ids = []; walkBlocks(Lab.state.blok, b => { if (b.fields.comp === name) ids.push(b.id); });
  ids.forEach(id => detach(id));
  if (Lab.sel === name) Lab.sel = "Screen1";
  changed(false);
  if (Lab.tab === "designer") { renderTree(); renderProps(); }
}

function renderDesigner() {
  const ed = $("editorCol");
  ed.className = "ai-body ai-designer";
  ed.innerHTML = `
    <section class="ai-pal" aria-label="Palette">
      <div class="ai-search"><input id="palSearch" type="text" placeholder="Type / to search components" aria-label="Cari komponen" autocomplete="off"></div>
      <div class="ai-cat">User Interface</div>
      <div id="palList"></div>
      <div class="ai-cat ai-cat-off" title="Tidak digunakan dalam modul ini">Layout</div>
      <div class="ai-cat ai-cat-off" title="Tidak digunakan dalam modul ini">Media</div>
    </section>
    <section class="ai-viewer" aria-label="Viewer">
      <div class="ai-vbar">
        <select class="ai-sel" id="devSel" aria-label="Ukuran layar">
          <option value="phone">Phone (320 x 650)</option><option value="tablet">Tablet (480 x 675)</option><option value="monitor">Monitor (768 x 1024)</option>
        </select>
        <select class="ai-sel" id="osSel" aria-label="Tema" disabled><option>Android 5+ (Material)</option></select>
        <label title="Tampilkan komponen tersembunyi di Viewer" style="display:flex;align-items:center;gap:4px;">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5l2-1.5 17 17-2 1.5zM12 6c4 0 7.5 2.6 9 6-.6 1.4-1.6 2.7-2.9 3.6l-1.5-1.5A4.5 4.5 0 0 0 9 8.5L7.2 6.7C8.7 6.2 10.3 6 12 6zM3 12c.9-2 2.4-3.7 4.2-4.8l2 2A4.5 4.5 0 0 0 14.8 14.8l2 2C15.4 17.600 13.800 18 12 18c-4 0-7.500-2.600-9-6z" fill="#37474F"/></svg>
          <input type="checkbox" id="hiddenChk" aria-label="Tampilkan komponen tersembunyi"></label>
      </div>
      <div class="ai-vstage"><div id="phoneHost"></div></div>
    </section>
    <section class="ai-comp" aria-label="Components">
      <div class="ai-comp-tree" id="compTree"></div>
      <div class="ai-comp-btns">
        <button type="button" class="ai-gbtn" disabled title="Nama komponen dikunci agar uji otomatis berjalan">Rename</button>
        <button type="button" class="ai-gbtn" id="delBtn">Delete</button>
      </div>
      <div class="ai-media-h">Media</div>
      <div class="ai-media-b"><button type="button" class="ai-gbtn" disabled title="Tidak digunakan dalam modul ini">Upload File...</button></div>
    </section>
    <section class="ai-props" aria-label="Properties"><div id="propPanel"></div></section>`;
  $("devSel").value = Lab.device;
  $("hiddenChk").checked = Lab.showHidden;
  const pl = $("palList");
  Object.keys(KOMP).forEach(t => {
    const ok = palAllowed(t);
    const d = document.createElement("div");
    d.className = "ai-pi" + (ok ? "" : " off"); d.draggable = ok; d.dataset.type = t;
    d.tabIndex = ok ? 0 : -1; d.setAttribute("role", "button");
    if (!ok) { d.setAttribute("aria-disabled", "true"); d.title = "Tidak digunakan pada pelajaran ini"; }
    d.innerHTML = `<span class="ico">${IC[t]}</span><span class="nm">${t}</span><span class="hlp" title="${esc(KOMP[t].desk)}">${IC.help}</span>`;
    pl.appendChild(d);
  });
  renderTree(); renderProps();
}
function renderTree() {
  const t = $("compTree"); if (!t) return;
  if (Lab.sel !== "Screen1" && !Lab.state.komponen.some(c => c.name === Lab.sel)) Lab.sel = "Screen1";
  let h = `<button type="button" class="ai-tn ${Lab.sel === "Screen1" ? "sel" : ""}" data-sel="Screen1"><span class="ico">${IC.Screen}</span><span>Screen1</span></button>`;
  Lab.state.komponen.forEach(c => {
    h += `<button type="button" class="ai-tn child ${Lab.sel === c.name ? "sel" : ""}" data-sel="${esc(c.name)}"><span class="ico">${IC[c.type]}</span><span>${esc(c.name)}</span></button>`;
  });
  t.innerHTML = h;
  const d = $("delBtn");
  if (d) d.disabled = !(Lab.sel !== "Screen1" && canEditComps());
}

function propRow(obj, k) {
  const def = defOf(k), val = obj[k];
  const row = document.createElement("div"); row.className = "ai-prow";
  const id = "prop-" + k;
  row.innerHTML = `<div class="ai-plab"><label for="${id}">${k}</label><span class="hlp" title="${esc(PROP_DESC[k] || "")}">${IC.help}</span></div>`;
  let ctl;
  if (def.t === "text") {
    ctl = document.createElement("input"); ctl.type = "text"; ctl.className = "ai-in"; ctl.value = val;
    ctl.addEventListener("input", () => { obj[k] = ctl.value; changed(false); });
  } else if (def.t === "num") {
    ctl = document.createElement("input"); ctl.type = "number"; ctl.className = "ai-in"; ctl.min = 8; ctl.max = 60; ctl.step = 0.5; ctl.value = val;
    ctl.addEventListener("input", () => { obj[k] = Number(ctl.value) || 14; changed(false); });
  } else if (def.t === "color") {
    const wrap = document.createElement("div"); wrap.className = "ai-colorsel";
    const sw = document.createElement("span"); sw.className = "sw";
    const paint = () => { sw.style.background = obj[k] === "none" ? "#fff" : obj[k]; };
    ctl = document.createElement("select");
    const isLabelBg = k === "BackgroundColor" && Lab.sel !== "Screen1" && (Lab.state.komponen.find(c => c.name === Lab.sel) || {}).type === "Label";
    [{ v: "none", l: isLabelBg ? "None" : "Default" }].concat(WARNA).forEach(w => {
      const o = document.createElement("option"); o.value = w.v; o.textContent = w.l; if (w.v === val) o.selected = true; ctl.appendChild(o);
    });
    ctl.addEventListener("change", () => { obj[k] = ctl.value; paint(); changed(false); });
    paint(); wrap.appendChild(sw); wrap.appendChild(ctl); ctl.id = id;
    row.appendChild(wrap); return row;
  } else {
    ctl = document.createElement("input"); ctl.type = "checkbox"; ctl.className = "ai-chk"; ctl.checked = !!val;
    ctl.addEventListener("change", () => { obj[k] = ctl.checked; changed(false); });
  }
  ctl.id = id; row.appendChild(ctl); return row;
}
function renderProps() {
  const p = $("propPanel"); if (!p) return;
  let obj, secs, title, sub = "";
  if (Lab.sel === "Screen1") { obj = Lab.state.screen; secs = SCREEN_SECS; title = "Screen1"; }
  else {
    const c = Lab.state.komponen.find(x => x.name === Lab.sel);
    if (!c) { Lab.sel = "Screen1"; return renderProps(); }
    obj = c.props; secs = COMP_SECS; title = c.name; sub = "(" + c.type + ")";
  }
  p.innerHTML = `<div class="ai-ptitle">${esc(title)}<span class="muted">${esc(sub)}</span></div>`;
  Object.keys(secs).forEach(sec => {
    const keys = secs[sec].filter(k => k in obj);
    if (!keys.length) return;
    const open = !Lab.collapsed[sec];
    const head = document.createElement("div");
    head.className = "ai-psec"; head.dataset.sec = sec; head.tabIndex = 0; head.setAttribute("role", "button"); head.setAttribute("aria-expanded", open ? "true" : "false");
    head.innerHTML = `<span class="tri ${open ? "" : "shut"}">▼</span><span>${sec}</span>`;
    p.appendChild(head);
    if (open) keys.forEach(k => p.appendChild(propRow(obj, k)));
  });
}

// ---------- BLOCKS ----------
function allowedBlocks() { return izin().blok || Object.keys(BD); }
function newBlock(type, fields) {
  const b = B(type, fields); assignIds([b]); fixFields(b, Lab.state); return b;
}
function findBlock(id) {
  let res = null;
  const inList = list => { for (let i = 0; i < list.length && !res; i++) { const b = list[i]; if (b.id === id) { res = { block: b, list }; return; } inBlock(b); } };
  const inBlock = b => {
    for (const k in b.inputs) { const c = b.inputs[k]; if (!c || res) continue; if (c.id === id) { res = { block: c, owner: b, key: k }; return; } inBlock(c); }
    for (const k in b.stmts) { if (res) return; inList(b.stmts[k]); }
  };
  inList(Lab.state.blok);
  return res;
}
function detach(id) {
  const r = findBlock(id); if (!r) return null;
  if (r.list) r.list.splice(r.list.indexOf(r.block), 1); else r.owner.inputs[r.key] = null;
  return r.block;
}
function containsId(b, id) { let f = false; walkBlocks([b], x => { if (x.id === id) f = true; }); return f; }

function place(t, blk) {
  if (t.t === "top") { Lab.state.blok.push(blk); return; }
  if (t.t === "val") { const p = findBlock(t.bid); if (p) p.block.inputs[t.name] = blk; return; }
  if (t.refId) {
    const r = findBlock(t.refId); if (!r || !r.list) return;
    const i = r.list.indexOf(r.block);
    r.list.splice(t.after ? i + 1 : i, 0, blk); return;
  }
  const p = findBlock(t.bid); if (p) p.block.stmts[t.name].push(blk);
}
function applyDrop(t, drag) {
  let blk;
  if (drag.mode === "move") {
    const info = findBlock(drag.id); if (!info) return;
    blk = info.block;
    const ref = t.refId || t.bid;
    if (ref && (ref === blk.id || containsId(blk, ref))) return;
    detach(blk.id);
  } else { blk = newBlock(drag.type, drag.fields); }
  place(t, blk);
  Lab.selSlot = null; Lab.fly = null;
  changed(true);
}
function insertFromDrawer(type, fields) {
  const d = BD[type], sel = Lab.selSlot;
  let t = null;
  if (d.k === "event" || d.k === "decl") t = { t: "top" };
  else if (sel && ((d.k === "value" && sel.t === "val") || (d.k === "stmt" && sel.t === "stmt"))) t = sel;
  else if (d.k === "value") {
    let first = null;
    walkBlocks(Lab.state.blok, b => {
      if (first) return;
      for (const k of inputsOf(BD[b.type])) if (!b.inputs[k]) { first = { t: "val", bid: b.id, name: k }; return; }
    });
    t = first;
  } else if (d.k === "stmt") {
    const ev = Lab.state.blok.slice().reverse().find(b => BD[b.type].k === "event");
    if (ev) t = { t: "stmt", bid: ev.id, name: Object.keys(ev.stmts)[0] };
  }
  if (!t) {
    logConsole([{ k: "warn", t: d.k === "value" ? "Tidak ada soket kosong. Tambahkan blok yang memiliki soket, atau seret blok ini ke soket tertentu." : "Tambahkan blok event terlebih dahulu, atau klik slot tujuan lebih dulu." }]);
    return;
  }
  place(t, newBlock(type, fields));
  Lab.selSlot = null; Lab.fly = null;
  changed(true);
}

function optLabel(b, s) {
  const o = optsFor(b, s, Lab.state).find(x => x[0] === b.fields[s.s]);
  return o ? o[1] : "";
}
function renderBlock(b, opts) {
  opts = opts || {};
  const d = BD[b.type], cat = KAT[d.cat];
  const el = document.createElement("div");
  el.className = "blk blk-" + d.k + (opts.preview ? " blk-preview" : "");
  el.style.setProperty("--bc", b.type === "color" ? b.fields.color : cat.c);
  el.dataset.kind = d.k;
  if (!opts.preview) { el.dataset.id = b.id; el.draggable = true; }
  const head = document.createElement("div"); head.className = "blk-head";
  const spec = d.spec;
  for (let i = 0; i < spec.length; i++) {
    const s = spec[i];
    if (typeof s === "string") {
      const sp = document.createElement("span"); sp.textContent = s; head.appendChild(sp);
    } else if (s.s && (s.o === "comp" || s.o === "btn")) {
      let txt = b.fields[s.s] || "?";
      const nx = spec[i + 1];
      if (typeof nx === "string" && nx[0] === ".") { txt += nx; i++; }
      const sp = document.createElement("span"); sp.className = "blk-comp"; sp.textContent = txt; head.appendChild(sp);
    } else if (s.s) {
      if (opts.preview) { const sp = document.createElement("span"); sp.textContent = optLabel(b, s) + " ▾"; head.appendChild(sp); }
      else {
        const sel = document.createElement("select"); sel.dataset.bid = b.id; sel.dataset.f = s.s;
        optsFor(b, s, Lab.state).forEach(o => {
          const op = document.createElement("option"); op.value = o[0]; op.textContent = o[1];
          if (o[0] === b.fields[s.s]) op.selected = true; sel.appendChild(op);
        });
        sel.setAttribute("aria-label", s.s); head.appendChild(sel);
      }
    } else if (s.t || s.n) {
      const key = s.t || s.n;
      if (opts.preview) { const sp = document.createElement("span"); sp.textContent = String(b.fields[key] === "" ? "…" : b.fields[key]); head.appendChild(sp); }
      else {
        const inp = document.createElement("input"); inp.dataset.bid = b.id; inp.dataset.f = key;
        if (s.n) { inp.type = "number"; inp.value = b.fields[key]; }
        else { inp.type = "text"; inp.value = b.fields[key]; inp.size = Math.max(4, String(b.fields[key]).length + 1); }
        inp.setAttribute("aria-label", key); head.appendChild(inp);
      }
    } else if (s.i) {
      const slot = document.createElement("span"); slot.className = "slot-val";
      slot.dataset.bid = b.id || ""; slot.dataset.name = s.i;
      const child = b.inputs[s.i];
      if (child && !opts.preview) slot.appendChild(renderBlock(child, opts));
      else slot.classList.add("empty");
      const sl = Lab.selSlot;
      if (!opts.preview && sl && sl.t === "val" && sl.bid === b.id && sl.name === s.i) slot.classList.add("sel");
      head.appendChild(slot);
    }
  }
  if (!opts.preview) {
    const del = document.createElement("button"); del.className = "blk-del"; del.dataset.bid = b.id; del.type = "button";
    del.textContent = "×"; del.setAttribute("aria-label", "Hapus blok"); head.appendChild(del);
  }
  el.appendChild(head);
  (d.stmts || []).forEach(name => {
    const row = document.createElement("div"); row.className = "stmt-row";
    const lab = document.createElement("div"); lab.className = "stmt-label"; lab.textContent = name;
    const slot = document.createElement("div"); slot.className = "slot-stmt";
    slot.dataset.bid = b.id || ""; slot.dataset.name = name;
    if (!opts.preview) (b.stmts[name] || []).forEach(c => slot.appendChild(renderBlock(c, opts)));
    const sl = Lab.selSlot;
    if (!opts.preview && sl && sl.t === "stmt" && sl.bid === b.id && sl.name === name) slot.classList.add("sel");
    row.appendChild(lab); row.appendChild(slot); el.appendChild(row);
  });
  return el;
}

function renderBlocksView() {
  const ed = $("editorCol");
  ed.className = "ai-body ai-blocks";
  ed.innerHTML = `
    <aside class="bk-tree" id="bkTree" aria-label="Daftar blok"></aside>
    <div class="bk-main">
      <div class="bk-fly" id="bkFly" hidden></div>
      <div class="ws" id="ws" aria-label="Area kerja blok"><div class="ws-inner" id="wsInner"></div></div>
      <div class="bk-warn" id="bkWarn" title="Peringatan dan kesalahan"></div>
      <div class="bk-ctl">
        <button type="button" class="bk-zoom" data-zoom="in" aria-label="Perbesar">+</button>
        <button type="button" class="bk-zoom" data-zoom="out" aria-label="Perkecil">−</button>
        <div class="bk-trash" id="bkTrash" title="Seret blok ke sini untuk menghapus">${IC.trash}</div>
      </div>
    </div>
    <aside class="bk-emu" aria-label="Emulator">
      <div class="bk-emu-h">Emulator <span class="st" id="emuState">Berhenti</span></div>
      <div id="phoneHost" data-mini="1"></div>
      <div class="bk-emu-cap" id="phoneCaption"></div>
    </aside>`;
  renderBkTree(); renderFlyout(); renderWorkspace();
}
function renderBkTree() {
  const t = $("bkTree"); if (!t) return;
  const allowed = allowedBlocks();
  const cats = KAT_ORDER.filter(c => c !== "komponen" && allowed.some(x => BD[x].cat === c));
  let h = '<div class="bk-h">Blocks</div><div class="bk-grp">Built-in</div>';
  cats.forEach(c => {
    h += `<button type="button" class="bk-tn ${Lab.fly === "cat:" + c ? "sel" : ""}" data-fly="cat:${c}"><span class="dot" style="background:${KAT[c].c}"></span>${KAT[c].l}</button>`;
  });
  h += `<div class="bk-grp">Screen1</div>`;
  h += `<button type="button" class="bk-tn ${Lab.fly === "comp:Screen1" ? "sel" : ""}" data-fly="comp:Screen1"><span class="dot" style="background:${KAT.komponen.c}"></span>Screen1</button>`;
  Lab.state.komponen.forEach(c => {
    h += `<button type="button" class="bk-tn child ${Lab.fly === "comp:" + c.name ? "sel" : ""}" data-fly="comp:${esc(c.name)}"><span class="dot" style="background:${KAT.komponen.c}"></span>${esc(c.name)}</button>`;
  });
  t.innerHTML = h;
}
function flyItems(key) {
  const allowed = allowedBlocks(), out = [];
  const add = (type, fields) => { if (allowed.includes(type)) out.push({ type, fields: fields || {} }); };
  if (key === "comp:Screen1") add("when_init");
  else if (key.startsWith("comp:")) {
    const name = key.slice(5), c = Lab.state.komponen.find(x => x.name === name);
    if (!c) return [];
    if (KOMP[c.type].click) add("when_click", { comp: name });
    const prop = "Text" in KOMP[c.type].props ? "Text" : Object.keys(KOMP[c.type].props)[0];
    add("set_prop", { comp: name, prop }); add("get_prop", { comp: name, prop });
  } else {
    const cat = key.slice(4);
    Object.keys(BD).filter(t => BD[t].cat === cat && allowed.includes(t)).forEach(t => {
      if (t === "color") WARNA.forEach(w => add("color", { color: w.v }));
      else if (t === "bool") { add("bool", { val: "true" }); add("bool", { val: "false" }); }
      else add(t);
    });
  }
  return out;
}
function renderFlyout() {
  const fl = $("bkFly"); if (!fl) return;
  fl.parentElement.classList.toggle("fly-open", !!Lab.fly);
  if (!Lab.fly) { fl.hidden = true; fl.innerHTML = ""; return; }
  fl.hidden = false; fl.innerHTML = "";
  const items = flyItems(Lab.fly);
  if (!items.length) { fl.innerHTML = '<p class="muted">Tidak ada blok pada bagian ini yang digunakan di pelajaran ini.</p>'; return; }
  items.forEach(it => {
    const w = document.createElement("div"); w.className = "drawer-item"; w.draggable = true;
    w.dataset.type = it.type; w.dataset.fields = JSON.stringify(it.fields);
    w.tabIndex = 0; w.setAttribute("role", "button"); w.setAttribute("aria-label", "Tambah blok " + it.type);
    const pb = B(it.type, it.fields); fixFields(pb, Lab.state);
    w.appendChild(renderBlock(pb, { preview: true }));
    w.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); insertFromDrawer(it.type, it.fields); } });
    fl.appendChild(w);
  });
}
function renderWorkspace() {
  const ws = $("ws"), inner = $("wsInner"); if (!ws) return;
  const top = ws.scrollTop;
  inner.innerHTML = "";
  walkBlocks(Lab.state.blok, b => fixFields(b, Lab.state));
  inner.style.zoom = Lab.zoom;
  if (!Lab.state.blok.length) {
    const h = document.createElement("div"); h.className = "ws-hint";
    h.innerHTML = "Area kerja kosong.<br>Klik <strong>Screen1</strong> atau nama komponen di daftar sebelah kiri untuk mengambil blok, lalu seret ke sini.";
    inner.appendChild(h);
  }
  Lab.state.blok.forEach(b => inner.appendChild(renderBlock(b)));
  ws.scrollTop = top;
  let w = 0; walkBlocks(Lab.state.blok, b => { Object.values(b.inputs).forEach(v => { if (!v) w++; }); });
  $("bkWarn").innerHTML = `<span>${IC.warn} ${w}</span><span>${IC.err} 0</span>`;
}

// ---------- Delegasi event editor ----------
const ED = $("editorCol");
ED.addEventListener("click", e => {
  const t = e.target;
  // Designer
  const pi = t.closest(".ai-pi");
  if (pi) { if (!pi.classList.contains("off")) addComponent(pi.dataset.type); return; }
  const tn = t.closest(".ai-tn");
  if (tn) { selectComp(tn.dataset.sel); return; }
  if (t.closest("#delBtn")) {
    if (Lab.sel !== "Screen1" && confirm("Hapus " + Lab.sel + "?")) deleteComponent(Lab.sel);
    return;
  }
  const sec = t.closest(".ai-psec");
  if (sec) { Lab.collapsed[sec.dataset.sec] = !Lab.collapsed[sec.dataset.sec]; renderProps(); return; }
  if (t.closest(".ai-phone")) {
    const pn = t.closest("[data-name]");
    if (!pn) return;
    const name = pn.dataset.name;
    if (Lab.run) {
      if (pn.tagName === "BUTTON") { Lab.run.click(name); flushRuntime(); renderPhone(); }
    } else selectComp(name);
    return;
  }
  // Blocks
  if (Lab.tab !== "blocks") return;
  const del = t.closest(".blk-del");
  if (del) { detach(del.dataset.bid); Lab.selSlot = null; changed(true); return; }
  if (t.closest("input,select")) return;
  const bt = t.closest(".bk-tn");
  if (bt) { Lab.fly = Lab.fly === bt.dataset.fly ? null : bt.dataset.fly; renderBkTree(); renderFlyout(); return; }
  const di = t.closest(".drawer-item");
  if (di) { insertFromDrawer(di.dataset.type, JSON.parse(di.dataset.fields || "{}")); return; }
  const zm = t.closest("[data-zoom]");
  if (zm) {
    Lab.zoom = Math.max(0.6, Math.min(1.6, Math.round((Lab.zoom + (zm.dataset.zoom === "in" ? 0.1 : -0.1)) * 10) / 10));
    renderWorkspace(); return;
  }
  if (!t.closest(".ws")) return;
  if (Lab.fly) { Lab.fly = null; renderBkTree(); renderFlyout(); }
  const sv = t.closest(".slot-val.empty");
  if (sv) { Lab.selSlot = { t: "val", bid: sv.dataset.bid, name: sv.dataset.name }; renderWorkspace(); return; }
  const ss = t.closest(".slot-stmt");
  if (ss) { Lab.selSlot = { t: "stmt", bid: ss.dataset.bid, name: ss.dataset.name }; renderWorkspace(); return; }
  Lab.selSlot = { t: "top" }; renderWorkspace();
});
ED.addEventListener("input", e => {
  const t = e.target;
  if (t.dataset && t.dataset.name && Lab.run && t.closest(".ai-phone")) { Lab.run.setText(t.dataset.name, t.value); return; }
  if (t.id === "palSearch") {
    const q = t.value.trim().toLowerCase();
    ED.querySelectorAll(".ai-pi").forEach(p => { p.style.display = !q || p.dataset.type.toLowerCase().includes(q) ? "" : "none"; });
    return;
  }
  if (!t.dataset || !t.dataset.f || !t.dataset.bid) return;
  const r = findBlock(t.dataset.bid); if (!r) return;
  r.block.fields[t.dataset.f] = t.type === "number" ? (Number(t.value) || 0) : t.value;
  if (t.type === "text") t.size = Math.max(4, t.value.length + 1);
});
ED.addEventListener("change", e => {
  const t = e.target;
  if (t.id === "devSel") { Lab.device = t.value; renderPhone(); return; }
  if (t.id === "hiddenChk") { Lab.showHidden = t.checked; renderPhone(); return; }
  if (!t.dataset || !t.dataset.f || !t.dataset.bid) return;
  const r = findBlock(t.dataset.bid); if (!r) return;
  if (t.tagName === "SELECT") r.block.fields[t.dataset.f] = t.value;
  changed(t.tagName === "SELECT" || r.block.type === "decl");
});
ED.addEventListener("keydown", e => {
  const t = e.target;
  if ((e.key === "Enter" || e.key === " ") && t.classList) {
    if (t.classList.contains("ai-pi")) { e.preventDefault(); if (!t.classList.contains("off")) addComponent(t.dataset.type); }
    else if (t.classList.contains("ai-psec")) { e.preventDefault(); Lab.collapsed[t.dataset.sec] = !Lab.collapsed[t.dataset.sec]; renderProps(); }
  }
});
document.addEventListener("keydown", e => {
  if (!$("page-belajar").classList.contains("active")) return;
  const typing = e.target.matches && e.target.matches("input,textarea,select");
  if (e.key === "/" && !typing && Lab.tab === "designer") { const s = $("palSearch"); if (s) { e.preventDefault(); s.focus(); } }
  if (e.key === "Escape" && Lab.fly) { Lab.fly = null; renderBkTree(); renderFlyout(); }
});
ED.addEventListener("focusin", e => {
  if (e.target.matches && e.target.matches(".blk input")) ED.querySelectorAll(".blk[data-id]").forEach(b => { b.draggable = false; });
});
ED.addEventListener("focusout", () => { ED.querySelectorAll(".blk[data-id]").forEach(b => { b.draggable = true; }); });

// ---------- Drag & drop ----------
function clearHover() {
  document.querySelectorAll(".drop-hover,.drop-before,.drop-after").forEach(x => x.classList.remove("drop-hover", "drop-before", "drop-after"));
}
function resolveTarget(e) {
  if (!DRAG || DRAG.mode === "comp" || !e.target.closest) return null;
  const ws = $("ws");
  if (!ws || !e.target.closest(".ws")) return null;
  const k = DRAG.kind;
  if (k === "value") {
    const s = e.target.closest(".slot-val");
    return s ? { t: "val", bid: s.dataset.bid, name: s.dataset.name, el: s, cls: "drop-hover" } : null;
  }
  if (k === "stmt") {
    const sb = e.target.closest(".blk-stmt"), ss = e.target.closest(".slot-stmt");
    const useSlot = ss && (!sb || sb.contains(ss));
    if (useSlot) return { t: "stmt", bid: ss.dataset.bid, name: ss.dataset.name, el: ss, cls: "drop-hover" };
    if (sb && sb.dataset.id && !(DRAG.mode === "move" && sb.dataset.id === DRAG.id)) {
      const r = sb.getBoundingClientRect(), after = e.clientY > r.top + r.height / 2;
      return { t: "stmt", refId: sb.dataset.id, after, el: sb, cls: after ? "drop-after" : "drop-before" };
    }
    return null;
  }
  return { t: "top", el: ws, cls: "drop-hover" };
}
ED.addEventListener("dragstart", e => {
  const el = e.target;
  if (!el.classList) return;
  if (el.classList.contains("drawer-item")) DRAG = { mode: "new", type: el.dataset.type, fields: JSON.parse(el.dataset.fields || "{}"), kind: BD[el.dataset.type].k };
  else if (el.classList.contains("ai-pi")) DRAG = { mode: "comp", type: el.dataset.type };
  else if (el.classList.contains("blk") && el.dataset.id) { DRAG = { mode: "move", id: el.dataset.id, kind: el.dataset.kind }; e.stopPropagation(); }
  else return;
  e.dataTransfer.effectAllowed = "copyMove";
  e.dataTransfer.setData("text/plain", "x");
});
ED.addEventListener("dragover", e => {
  if (!DRAG) return;
  clearHover();
  if (DRAG.mode === "comp") {
    const ph = e.target.closest(".ai-phone");
    if (ph) { e.preventDefault(); ph.classList.add("drop-hover"); }
    return;
  }
  const t = resolveTarget(e);
  if (t) { e.preventDefault(); t.el.classList.add(t.cls); return; }
  if (DRAG.mode === "move") {
    const bin = e.target.closest(".bk-tree,.bk-fly,.bk-trash");
    if (bin) { e.preventDefault(); bin.classList.add("drop-hover"); }
  }
});
ED.addEventListener("drop", e => {
  if (!DRAG) return;
  const drag = DRAG;
  if (drag.mode === "comp") {
    clearHover(); DRAG = null;
    if (e.target.closest(".ai-phone")) { e.preventDefault(); addComponent(drag.type); }
    return;
  }
  const t = resolveTarget(e);
  clearHover(); DRAG = null;
  if (t) { e.preventDefault(); applyDrop(t, drag); }
  else if (drag.mode === "move" && e.target.closest(".bk-tree,.bk-fly,.bk-trash")) { e.preventDefault(); detach(drag.id); changed(true); }
});
document.addEventListener("dragend", () => {
  DRAG = null; clearHover();
  if (Lab.tab === "blocks" && Lab.fly) { Lab.fly = null; renderBkTree(); renderFlyout(); }
});

// ===========================================================
// KUIS
// ===========================================================
let quizQuestions = [], quizIdx = 0, quizAnswers = [], answered = false;
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const quizBab = () => BAB.find(b => b.id === ACTIVE_BAB_ID) || BAB[0];

function showQuizPanel(which) {
  $("quizLocked").style.display = which === "locked" ? "block" : "none";
  $("quizSetup").style.display = which === "setup" ? "block" : "none";
  $("quizRunning").style.display = which === "running" ? "block" : "none";
  $("quizResult").style.display = which === "result" ? "block" : "none";
}
function renderKuisPage() {
  if (!ACTIVE_BAB_ID) ACTIVE_BAB_ID = BAB[0].id;
  const bab = quizBab();
  $("kuisBabTabs").innerHTML = BAB.map(b => `<button class="materi-tab ${b.id === bab.id ? "active" : ""} ${babDone(b) ? "" : "locked"}" data-bab="${b.id}">${babDone(b) ? "" : '<span class="lk">' + LOCK_SVG.replace(/width="20" height="20"/, 'width="14" height="14"') + "</span>"}Bab ${b.nomor}${babDone(b) ? "" : '<span class="visually-hidden"> (terkunci)</span>'}</button>`).join("");
  $("kuisPageTitle").textContent = "Kuis " + bab.judulLengkap;
  $("quizSetupTitle").textContent = "Kuis Bab " + bab.nomor + " — " + bab.soal.length + " soal";
  if (!babDone(bab)) {
    const sisa = babSisa(bab);
    $("lockedTitle").textContent = "Kuis Bab " + bab.nomor + " terkunci";
    $("lockedMsg").textContent = "Selesaikan " + sisa.length + " pelajaran lagi pada " + bab.judulLengkap + " untuk membuka kuis. Berikutnya: Pelajaran " + sisa[0].no + " — " + sisa[0].judul + ".";
    $("lockedGoBtn").dataset.lesson = sisa[0].id;
    showQuizPanel("locked"); return;
  }
  showQuizPanel("setup");
}
$("kuisBabTabs").addEventListener("click", e => {
  const b = e.target.closest("[data-bab]");
  if (b) { ACTIVE_BAB_ID = b.dataset.bab; renderKuisPage(); }
});
$("startQuizBtn").addEventListener("click", startQuiz);
$("lockedGoBtn").addEventListener("click", e => openLesson(e.currentTarget.dataset.lesson));
function startQuiz() {
  if (!babDone(quizBab())) { renderKuisPage(); return; }
  quizQuestions = shuffle(quizBab().soal); quizIdx = 0; quizAnswers = [];
  showQuizPanel("running"); renderQuestion();
}
function renderQuestion() {
  answered = false;
  const q = quizQuestions[quizIdx], total = quizQuestions.length;
  $("quizProgressFill").style.width = (quizIdx / total * 100) + "%";
  $("quizProgressLabel").textContent = "Soal " + (quizIdx + 1) + "/" + total;
  $("qMeta").innerHTML = `<span class="q-tag ${q.level}">${BLOOM_LABEL[q.level]}</span><span class="q-tag ct">${CT_LABEL[q.ct]}</span>`;
  $("qText").textContent = q.teks;
  const L = ["A", "B", "C", "D"];
  $("qOptions").innerHTML = q.opsi.map((o, i) => `<button class="option" data-idx="${i}" role="radio" aria-checked="false"><div class="opt-letter" aria-hidden="true">${L[i]}</div><div>${esc(o)}</div></button>`).join("");
  document.querySelectorAll("#qOptions .option").forEach(el => el.addEventListener("click", () => selectOption(+el.dataset.idx)));
  const fb = $("qFeedback"); fb.className = "feedback"; fb.textContent = "";
  $("qNextBtn").disabled = true;
  $("qNextBtn").textContent = quizIdx === total - 1 ? "Lihat Hasil →" : "Selanjutnya →";
}
function selectOption(idx) {
  if (answered) return;
  answered = true;
  const q = quizQuestions[quizIdx], ok = idx === q.jawaban;
  document.querySelectorAll("#qOptions .option").forEach((el, i) => {
    el.setAttribute("aria-checked", i === idx ? "true" : "false");
    if (i === q.jawaban) el.classList.add("correct"); else if (i === idx) el.classList.add("incorrect");
  });
  const fb = $("qFeedback"); fb.classList.add("show", ok ? "ok" : "bad");
  fb.innerHTML = `<strong>${ok ? "Benar! " : "Kurang tepat. "}</strong>${esc(q.pembahasan)}`;
  quizAnswers.push({ level: q.level, ct: q.ct, correct: ok });
  $("qNextBtn").disabled = false;
}
$("qNextBtn").addEventListener("click", () => {
  if (quizIdx < quizQuestions.length - 1) { quizIdx++; renderQuestion(); } else finishQuiz();
});
function finishQuiz() {
  const bab = quizBab(), total = quizAnswers.length, correct = quizAnswers.filter(a => a.correct).length;
  const score = Math.round(correct / total * 100);
  const bd = {}, bdct = {};
  ["c1", "c2", "c3", "c4"].forEach(l => { const it = quizAnswers.filter(a => a.level === l); bd[l] = { correct: it.filter(a => a.correct).length, total: it.length }; });
  ["dekomposisi", "pola", "abstraksi", "algoritma"].forEach(c => { const it = quizAnswers.filter(a => a.ct === c); bdct[c] = { correct: it.filter(a => a.correct).length, total: it.length }; });
  const h = getHistory();
  h.unshift({ babId: bab.id, babJudul: bab.judulLengkap, date: new Date().toISOString(), score, correct, total, breakdown: bd, breakdownCT: bdct });
  writeJSON(LS.history, h);
  showQuizPanel("result");
  $("resultScore").textContent = score + "%";
  $("resultLabel").textContent = correct + " dari " + total + " jawaban benar — " + bab.judulLengkap;
  $("resultBreakdown").innerHTML = ["c1", "c2", "c3", "c4"].map(l => `<div class="breakdown-item"><div class="bd-lvl">${l.toUpperCase()}</div><div class="bd-val">${bd[l].correct}/${bd[l].total}</div></div>`).join("");
  const ni = BAB.findIndex(b => b.id === bab.id), nb = BAB[ni + 1];
  const nbtn = $("nextBabBtn");
  nbtn.style.display = nb ? "inline-block" : "none";
  if (nb) { nbtn.textContent = "Lanjut ke Bab " + nb.nomor + " →"; nbtn.dataset.lesson = nb.pelajaran[0].id; }
  $("resultBreakdownCT").innerHTML = ["dekomposisi", "pola", "abstraksi", "algoritma"].map(c => `<div class="breakdown-ct-item"><div class="bd-lvl">${CT_LABEL[c]}</div><div class="bd-val">${bdct[c].correct}/${bdct[c].total}</div></div>`).join("");
}
$("retryQuizBtn").addEventListener("click", startQuiz);
$("viewNilaiBtn").addEventListener("click", () => gotoPage("nilai"));
$("nextBabBtn").addEventListener("click", e => openLesson(e.currentTarget.dataset.lesson));

// ===========================================================
// NILAI
// ===========================================================
let nilaiFilter = "all";
const scoreClass = s => s >= 80 ? "high" : s >= 60 ? "mid" : "low";
function renderNilai() {
  const items = [{ id: "all", judul: "Semua Bab" }].concat(BAB.map(b => ({ id: b.id, judul: "Bab " + b.nomor })));
  const f = $("nilaiBabFilter");
  f.innerHTML = items.map(it => `<button class="materi-tab ${nilaiFilter === it.id ? "active" : ""}" data-filter="${it.id}">${it.judul}</button>`).join("");
  f.querySelectorAll("[data-filter]").forEach(b => b.addEventListener("click", () => { nilaiFilter = b.dataset.filter; renderNilai(); }));

  const all = getHistory(), hist = nilaiFilter === "all" ? all : all.filter(x => x.babId === nilaiFilter);
  const c = $("nilaiContainer");
  if (!hist.length) {
    c.innerHTML = `<div class="history-empty"><div style="font-size:2rem;" aria-hidden="true">◈</div><div style="font-weight:600;margin:6px 0;">Belum ada riwayat nilai</div><div style="font-size:.85rem;">Kerjakan kuis untuk melihat riwayat skor di sini.</div></div>`;
  } else {
    c.innerHTML = `<table class="history-table"><thead><tr><th>Bab</th><th>Tanggal</th><th>Skor</th><th>Benar</th><th>Dekomp.</th><th>Pola</th><th>Abstr.</th><th>Algo.</th></tr></thead><tbody>${hist.map(h => {
      const ct = h.breakdownCT;
      return `<tr><td>${esc(h.babJudul)}</td><td>${new Date(h.date).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</td><td><span class="badge-score ${scoreClass(h.score)}">${h.score}%</span></td><td>${h.correct}/${h.total}</td><td>${ct.dekomposisi.correct}/${ct.dekomposisi.total}</td><td>${ct.pola.correct}/${ct.pola.total}</td><td>${ct.abstraksi.correct}/${ct.abstraksi.total}</td><td>${ct.algoritma.correct}/${ct.algoritma.total}</td></tr>`;
    }).join("")}</tbody></table>`;
  }
  const prog = getProgress();
  $("latihanContainer").innerHTML = `<table class="bridge"><thead><tr><th>Pelajaran</th><th>Fokus CT</th><th>Status</th></tr></thead><tbody>${BAB.map(b => {
    const d = b.pelajaran.filter(p => prog[p.id]).length;
    return `<tr class="nilai-grp"><td colspan="3">Bab ${b.nomor} — ${esc(b.judul)} · ${d}/${b.pelajaran.length} selesai</td></tr>` + b.pelajaran.map(p =>
      `<tr><td>${esc(p.no)} ${esc(p.judul)}</td><td>${esc(CT_LABEL[p.ct])}</td><td>${prog[p.id] ? '<span class="badge-score high">Selesai</span>' : '<span class="muted">Belum</span>'}</td></tr>`).join("");
  }).join("")}</tbody></table>`;
}
$("clearHistoryBtn").addEventListener("click", () => {
  if (confirm("Hapus seluruh riwayat kuis? Tindakan ini tidak dapat dibatalkan.")) { storageRemove(LS.history); renderNilai(); renderHome(); }
});

// ===========================================================
// GLOSARIUM
// ===========================================================
function renderPustaka() {
  $("jembatan").innerHTML = JEMBATAN.map(g => `<tr class="grp"><td colspan="2">${esc(g.grup)}</td></tr>` + g.baris.map(r => `<tr><td>${esc(r.ai)}</td><td class="c-as">${esc(r.as)}</td></tr>`).join("")).join("");
  renderGlosarium();
  $("pustakaList").innerHTML = REFERENSI.map(r => `<li>${esc(r)}</li>`).join("");
}
function renderGlosarium() {
  const q = $("glosSearch").value.trim().toLowerCase();
  const list = GLOSARIUM.filter(g => !q || g.istilah.toLowerCase().includes(q) || g.definisi.toLowerCase().includes(q));
  $("glosariumList").innerHTML = list.length ? list.map(g => `<div class="glosarium-item"><dt>${esc(g.istilah)}</dt><dd>${esc(g.definisi)}</dd></div>`).join("") : '<p class="muted">Tidak ada istilah yang cocok.</p>';
}
$("glosSearch").addEventListener("input", renderGlosarium);

// ---------- INIT ----------
renderStorageWarning();
updateSidebarFoot();
renderHome();
