import QRCode from 'qrcode';
import { syncService } from './firebase.js';
import { sound } from './sound.js';

// State
let allClips = [];
let currentFilter = 'all';
let searchFilterQuery = '';
let deferredPrompt = null;

// DOM Elements
const mainInput = document.getElementById('main-input');
const btnSubmit = document.getElementById('btn-submit');
const btnPasteSys = document.getElementById('btn-paste-sys');
const clipsList = document.getElementById('clips-list');
const emptyState = document.getElementById('empty-state');
const loadingState = document.getElementById('loading-state');
const toastContainer = document.getElementById('toast-container');
const displayRoomId = document.getElementById('display-room-id');
const statusDot = document.getElementById('status-dot');

const btnRoom = document.getElementById('btn-room');
const btnPair = document.getElementById('btn-pair');
const btnSettings = document.getElementById('btn-settings');
const btnSound = document.getElementById('btn-sound');
const soundIconOn = document.getElementById('sound-icon-on');
const soundIconOff = document.getElementById('sound-icon-off');
const btnInstallPwa = document.getElementById('btn-install-pwa');
const btnClearHistory = document.getElementById('btn-clear-history');
const btnSample = document.getElementById('btn-sample');

// Filter Pills
const pillButtons = document.querySelectorAll('.pill-btn');
const countAll = document.getElementById('count-all');
const countLink = document.getElementById('count-link');
const countText = document.getElementById('count-text');
const countPinned = document.getElementById('count-pinned');

// Modals
const modalPair = document.getElementById('modal-pair');
const btnClosePair = document.getElementById('btn-close-pair');
const qrCanvasHolder = document.getElementById('qr-canvas-holder');
const pairRoomInput = document.getElementById('pair-room-input');
const btnCopyLink = document.getElementById('btn-copy-link');
const inputCustomRoom = document.getElementById('input-custom-room');
const btnSwitchRoom = document.getElementById('btn-switch-room');
const btnNewRoom = document.getElementById('btn-new-room');

const modalSettings = document.getElementById('modal-settings');
const btnCloseSettings = document.getElementById('btn-close-settings');
const firebaseJsonInput = document.getElementById('firebase-json-input');
const btnSaveFirebase = document.getElementById('btn-save-firebase');
const btnResetFirebase = document.getElementById('btn-reset-firebase');

/* ==========================================================================
   Init
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  initServiceWorker();
  initSoundUI();
  updateRoomUI();
  handleWebShareTarget();
  bindEvents();

  syncService.onClipsUpdate((clips) => {
    allClips = clips;
    if (loadingState) loadingState.classList.add('hidden');
    renderClips();
    updateCounts();
  });
});

/* ==========================================================================
   Device Detection
   ========================================================================== */
function getDeviceName() {
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'iPhone';
  if (/Macintosh|Mac OS X/.test(ua)) return 'Mac';
  if (/Android/.test(ua)) return 'Android';
  if (/Windows/.test(ua)) return 'PC';
  return 'Web';
}

/* ==========================================================================
   Service Worker & PWA Install
   ========================================================================== */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (btnInstallPwa) btnInstallPwa.classList.remove('hidden');
  });

  if (btnInstallPwa) {
    btnInstallPwa.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        btnInstallPwa.classList.add('hidden');
      }
    });
  }
}

/* ==========================================================================
   Web Share Target (Share sheet from iPhone / Android)
   ========================================================================== */
function handleWebShareTarget() {
  const params = new URLSearchParams(window.location.search);
  const sharedTitle = params.get('title');
  const sharedText = params.get('text');
  const sharedUrl = params.get('url');

  if (sharedTitle || sharedText || sharedUrl) {
    let text = sharedUrl || sharedText || sharedTitle;
    if (sharedUrl && sharedText && sharedText !== sharedUrl) {
      text = sharedText + '\n' + sharedUrl;
    }

    if (text && text.trim()) {
      const type = detectType(text.trim());
      syncService.addClip({
        content: text.trim(),
        type,
        device: getDeviceName()
      }).then(() => {
        sound.playSyncTone();
        showToast('Shared item added! 📥', 'success');
      });
    }

    const clean = window.location.origin + window.location.pathname + 
      (params.has('room') ? `?room=${params.get('room')}` : '');
    window.history.replaceState({}, document.title, clean);
  }
}

/* ==========================================================================
   Type Detection
   ========================================================================== */
function detectType(str) {
  if (!str) return 'text';
  const trimmed = str.trim();
  if (/^(https?:\/\/[^\s]+)$/i.test(trimmed)) return 'link';
  if (trimmed.includes('function') || trimmed.includes('const ') || trimmed.includes('class ') || (trimmed.includes('{') && trimmed.includes('}'))) {
    return 'code';
  }
  return 'text';
}

/* ==========================================================================
   Rendering
   ========================================================================== */
function renderClips() {
  let list = [...allClips];

  // Search filter
  if (searchFilterQuery) {
    const q = searchFilterQuery.toLowerCase();
    list = list.filter((c) => (c.content || '').toLowerCase().includes(q));
  }

  // Pill filter
  if (currentFilter === 'link') list = list.filter((c) => c.type === 'link');
  if (currentFilter === 'text') list = list.filter((c) => c.type === 'text' || c.type === 'code');
  if (currentFilter === 'pinned') list = list.filter((c) => c.pinned);

  if (list.length === 0) {
    clipsList.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  } else {
    emptyState.classList.add('hidden');
  }

  const frag = document.createDocumentFragment();

  list.forEach((clip) => {
    const item = document.createElement('div');
    item.className = `clip-item ${clip.pinned ? 'pinned' : ''}`;
    item.dataset.id = clip.id;

    const timeAgo = formatTimeAgo(clip.timestamp);

    let contentHtml = '';
    if (clip.type === 'link') {
      const url = clip.content.trim();
      let domain = url;
      try {
        domain = new URL(url).hostname;
      } catch (e) {}

      contentHtml = `
        <div class="link-row">
          <span class="link-title">🔗 ${escapeHtml(domain)}</span>
        </div>
        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="link-href">${escapeHtml(url)}</a>
      `;
    } else if (clip.type === 'code') {
      contentHtml = `
        <div class="code-block">${escapeHtml(clip.content)}</div>
      `;
    } else {
      contentHtml = `
        <div class="text-body">${linkifyText(escapeHtml(clip.content))}</div>
      `;
    }

    item.innerHTML = `
      <div class="clip-top-row">
        <div class="clip-body">
          ${contentHtml}
        </div>
      </div>

      <div class="clip-bottom-bar">
        <span class="clip-info">${clip.device || 'Web'} • ${timeAgo}</span>

        <div class="clip-btns">
          ${clip.type === 'link' ? `
            <a href="${escapeHtml(clip.content.trim())}" target="_blank" rel="noopener noreferrer" class="btn-mini" title="Open Link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          ` : ''}

          <button class="btn-mini btn-pin ${clip.pinned ? 'pinned-active' : ''}" title="${clip.pinned ? 'Unpin' : 'Pin'}">
            <svg viewBox="0 0 24 24" fill="${clip.pinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>

          <button class="btn-mini danger btn-delete" title="Delete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>

          <button class="btn-copy-action">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          </button>
        </div>
      </div>
    `;

    // Listeners
    item.querySelector('.btn-pin').addEventListener('click', () => {
      sound.playPop();
      syncService.togglePin(clip.id, clip.pinned);
    });

    item.querySelector('.btn-delete').addEventListener('click', () => {
      sound.playDelete();
      item.style.opacity = '0';
      setTimeout(() => syncService.deleteClip(clip.id), 120);
    });

    const btnCopy = item.querySelector('.btn-copy-action');
    btnCopy.addEventListener('click', () => {
      copyText(clip.content, btnCopy);
    });

    frag.appendChild(item);
  });

  clipsList.innerHTML = '';
  clipsList.appendChild(frag);
}

function updateCounts() {
  countAll.textContent = allClips.length;
  countLink.textContent = allClips.filter((c) => c.type === 'link').length;
  countText.textContent = allClips.filter((c) => c.type === 'text' || c.type === 'code').length;
  countPinned.textContent = allClips.filter((c) => c.pinned).length;
}

/* ==========================================================================
   Copy Action
   ========================================================================== */
async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    if ('vibrate' in navigator) navigator.vibrate([15]);
    sound.playCopyChime();

    if (btn) {
      const old = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = `<span>✓ Copied</span>`;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = old;
      }, 1500);
    }
    showToast('Copied to clipboard! 📋', 'success');
  } catch (e) {
    showToast('Failed to copy', 'error');
  }
}

/* ==========================================================================
   Event Bindings
   ========================================================================== */
function bindEvents() {
  // Input: Realtime search + Enter to submit
  mainInput.addEventListener('input', () => {
    const val = mainInput.value.trim();
    // If not pasting a URL, use as search filter
    if (val.length > 0 && !val.startsWith('http')) {
      searchFilterQuery = val;
    } else {
      searchFilterQuery = '';
    }
    renderClips();
  });

  mainInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitMainInput();
    }
  });

  btnSubmit.addEventListener('click', submitMainInput);

  // Paste from system clipboard directly into virtual clipboard!
  btnPasteSys.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim()) {
        const type = detectType(text.trim());
        await syncService.addClip({
          content: text.trim(),
          type,
          device: getDeviceName()
        });
        sound.playSyncTone();
        showToast('Pasted & Synced! ⚡', 'success');
      } else {
        showToast('System clipboard is empty', 'info');
      }
    } catch (e) {
      mainInput.focus();
      showToast('Click in box and press ⌘V', 'info');
    }
  });

  // Filter pills
  pillButtons.forEach((pill) => {
    pill.addEventListener('click', () => {
      sound.playPop();
      pillButtons.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderClips();
    });
  });

  // Clear unpinned
  btnClearHistory.addEventListener('click', () => {
    sound.playDelete();
    syncService.clearAll();
    showToast('Cleared unpinned clips', 'info');
  });

  // Sample data button
  if (btnSample) {
    btnSample.addEventListener('click', () => {
      sound.playPop();
      const samples = [
        { content: 'https://news.ycombinator.com', type: 'link', device: 'Mac' },
        { content: 'https://github.com/trending', type: 'link', device: 'iPhone' },
        { content: 'Virtual clipboard is running. Clean, minimal, zero mess.', type: 'text', device: 'Android' }
      ];
      samples.forEach((s) => syncService.addClip(s));
      showToast('Loaded sample clips', 'success');
    });
  }

  // Modals
  btnRoom.addEventListener('click', openPairModal);
  btnPair.addEventListener('click', openPairModal);
  btnClosePair.addEventListener('click', () => modalPair.classList.add('hidden'));

  btnCopyLink.addEventListener('click', () => {
    const pairUrl = `${window.location.origin}${window.location.pathname}?room=${syncService.roomId}`;
    copyText(pairUrl, btnCopyLink);
  });

  btnSwitchRoom.addEventListener('click', () => {
    const val = inputCustomRoom.value.trim().toUpperCase();
    if (val) {
      syncService.setRoomId(val);
      updateRoomUI();
      renderQRCode();
      inputCustomRoom.value = '';
      showToast(`Joined ${val}`, 'success');
    }
  });

  btnNewRoom.addEventListener('click', () => {
    const code = 'CLIP-' + Math.floor(1000 + Math.random() * 9000);
    syncService.setRoomId(code);
    updateRoomUI();
    renderQRCode();
    showToast(`New Room: ${code}`, 'success');
  });

  btnSettings.addEventListener('click', () => {
    sound.playPop();
    modalSettings.classList.remove('hidden');
    const saved = syncService.getFirebaseConfig();
    if (saved) firebaseJsonInput.value = JSON.stringify(saved, null, 2);
  });

  btnCloseSettings.addEventListener('click', () => modalSettings.classList.add('hidden'));

  btnSaveFirebase.addEventListener('click', () => {
    const raw = firebaseJsonInput.value.trim();
    try {
      const parsed = JSON.parse(raw);
      if (parsed.apiKey) {
        syncService.saveFirebaseConfig(parsed);
        updateRoomUI();
        modalSettings.classList.add('hidden');
        showToast('Firebase connected!', 'success');
      }
    } catch (e) {
      showToast('Invalid JSON', 'error');
    }
  });

  btnResetFirebase.addEventListener('click', () => {
    syncService.resetToLocal();
    firebaseJsonInput.value = '';
    updateRoomUI();
    modalSettings.classList.add('hidden');
    showToast('Reset to local mode', 'info');
  });

  btnSound.addEventListener('click', () => {
    const on = sound.toggle();
    initSoundUI();
    showToast(on ? 'Sound on 🔔' : 'Sound muted 🔕', 'info');
  });

  // Close modals on outside click
  [modalPair, modalSettings].forEach((m) => {
    m.addEventListener('click', (e) => {
      if (e.target === m) m.classList.add('hidden');
    });
  });
}

function submitMainInput() {
  const val = mainInput.value.trim();
  if (!val) {
    mainInput.focus();
    return;
  }

  const type = detectType(val);
  syncService.addClip({
    content: val,
    type,
    device: getDeviceName()
  }).then(() => {
    sound.playSyncTone();
    mainInput.value = '';
    searchFilterQuery = '';
    renderClips();
    showToast('Synced to clipboard! ⚡', 'success');
  });
}

function updateRoomUI() {
  displayRoomId.textContent = syncService.roomId;
  pairRoomInput.value = syncService.roomId;
  statusDot.className = syncService.isFirebaseConnected ? 'live-dot online' : 'live-dot';
}

function openPairModal() {
  sound.playPop();
  modalPair.classList.remove('hidden');
  renderQRCode();
}

function renderQRCode() {
  const pairUrl = `${window.location.origin}${window.location.pathname}?room=${syncService.roomId}`;
  QRCode.toCanvas(pairUrl, {
    width: 140,
    margin: 1,
    color: { dark: '#0C0D10', light: '#FFFFFF' }
  }, (err, canvas) => {
    if (!err && canvas) {
      qrCanvasHolder.innerHTML = '';
      qrCanvasHolder.appendChild(canvas);
    }
  });
}

function initSoundUI() {
  if (sound.enabled) {
    soundIconOn.classList.remove('hidden');
    soundIconOff.classList.add('hidden');
  } else {
    soundIconOn.classList.add('hidden');
    soundIconOff.classList.remove('hidden');
  }
}

function showToast(msg, type = 'info') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  toastContainer.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    setTimeout(() => t.remove(), 200);
  }, 2200);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function linkifyText(text) {
  return text.replace(/(https?:\/\/[^\s]+)/g, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-blue); text-decoration: underline;">${url}</a>`;
  });
}

function formatTimeAgo(ts) {
  if (!ts) return 'Just now';
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return 'Just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
