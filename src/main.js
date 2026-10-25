import QRCode from 'qrcode';
import { syncService } from './firebase.js';
import { sound } from './sound.js';

// State
let allClips = [];
let currentFilter = 'all';
let searchQuery = '';
let deferredPrompt = null;

// DOM Elements
const mainInput = document.getElementById('main-input');
const btnSubmit = document.getElementById('btn-submit');
const btnPasteSys = document.getElementById('btn-paste-sys');
const sidebarTypeBadge = document.getElementById('sidebar-type-badge');

const searchInput = document.getElementById('search-input');
const btnClearSearch = document.getElementById('btn-clear-search');
const btnExportClips = document.getElementById('btn-export-clips');
const btnClearHistory = document.getElementById('btn-clear-history');

const clipsList = document.getElementById('clips-list');
const emptyState = document.getElementById('empty-state');
const loadingState = document.getElementById('loading-state');
const toastContainer = document.getElementById('toast-container');

// Navigation Filters
const navItems = document.querySelectorAll('.nav-item');
const countAll = document.getElementById('count-all');
const countLink = document.getElementById('count-link');
const countText = document.getElementById('count-text');
const countCode = document.getElementById('count-code');
const countPinned = document.getElementById('count-pinned');

// Header & Room
const displayRoomId = document.getElementById('display-room-id');
const sidebarRoomId = document.getElementById('sidebar-room-id');
const statusDot = document.getElementById('status-dot');
const btnRoom = document.getElementById('btn-room');
const btnPair = document.getElementById('btn-pair');
const btnSidebarPair = document.getElementById('btn-sidebar-pair');
const btnSettings = document.getElementById('btn-settings');
const btnSound = document.getElementById('btn-sound');
const soundIconOn = document.getElementById('sound-icon-on');
const soundIconOff = document.getElementById('sound-icon-off');
const btnInstallPwa = document.getElementById('btn-install-pwa');
const btnSample = document.getElementById('btn-sample');

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
   Initialization
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
function getDeviceLabel() {
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'iPhone';
  if (/Macintosh|Mac OS X/.test(ua)) return 'Mac';
  if (/Android/.test(ua)) return 'Android';
  if (/Windows/.test(ua)) return 'PC';
  return 'Web';
}

function getDeviceIcon(label) {
  if (label === 'Mac') return '💻';
  if (label === 'iPhone') return '📱';
  if (label === 'Android') return '🤖';
  if (label === 'PC') return '🖥️';
  return '🌐';
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
      const type = detectContentType(text.trim());
      syncService.addClip({
        content: text.trim(),
        type,
        device: getDeviceLabel()
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
   Content Type Detection
   ========================================================================== */
function detectContentType(str) {
  if (!str) return 'text';
  const trimmed = str.trim();
  if (/^(https?:\/\/[^\s]+)$/i.test(trimmed)) return 'link';
  if (trimmed.includes('function') || trimmed.includes('const ') || trimmed.includes('class ') || (trimmed.includes('{') && trimmed.includes('}')) || (trimmed.includes('<') && trimmed.includes('>'))) {
    return 'code';
  }
  return 'text';
}

function updateComposeBadge(val) {
  const type = detectContentType(val);
  if (type === 'link') {
    sidebarTypeBadge.textContent = '🔗 Link';
  } else if (type === 'code') {
    sidebarTypeBadge.textContent = '💻 Code';
  } else {
    sidebarTypeBadge.textContent = '📝 Text';
  }
}

/* ==========================================================================
   Clips Grid Rendering
   ========================================================================== */
function renderClips() {
  let list = [...allClips];

  // Search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter((c) => {
      const matchText = (c.content || '').toLowerCase().includes(q);
      const matchDevice = (c.device || '').toLowerCase().includes(q);
      return matchText || matchDevice;
    });
  }

  // Sidebar Category Filter
  if (currentFilter === 'link') list = list.filter((c) => c.type === 'link');
  if (currentFilter === 'text') list = list.filter((c) => c.type === 'text');
  if (currentFilter === 'code') list = list.filter((c) => c.type === 'code');
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
    const card = document.createElement('article');
    card.className = `grid-card ${clip.pinned ? 'pinned' : ''}`;
    card.dataset.id = clip.id;

    const timeAgo = formatTimeAgo(clip.timestamp);
    const tagClass = clip.type === 'link' ? 'tag-link' : (clip.type === 'code' ? 'tag-code' : 'tag-text');
    const tagEmoji = clip.type === 'link' ? '🔗 Link' : (clip.type === 'code' ? '💻 Code' : '📝 Text');
    const deviceIcon = getDeviceIcon(clip.device);

    let contentHtml = '';
    if (clip.type === 'link') {
      const url = clip.content.trim();
      let domain = url;
      try {
        domain = new URL(url).hostname;
      } catch (e) {}

      contentHtml = `
        <div class="link-title">${escapeHtml(domain)}</div>
        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="link-url">${escapeHtml(url)}</a>
      `;
    } else if (clip.type === 'code') {
      contentHtml = `
        <div class="code-box"><code>${escapeHtml(clip.content)}</code></div>
      `;
    } else {
      contentHtml = `
        <div class="plain-text">${linkifyText(escapeHtml(clip.content))}</div>
      `;
    }

    card.innerHTML = `
      <div class="card-top">
        <span class="card-tag ${tagClass}">${tagEmoji}</span>
        <div class="card-top-actions">
          ${clip.type === 'link' ? `
            <a href="${escapeHtml(clip.content.trim())}" target="_blank" rel="noopener noreferrer" class="btn-card-action" title="Open Link in New Tab">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          ` : ''}

          <button class="btn-card-action btn-pin ${clip.pinned ? 'active-pin' : ''}" title="${clip.pinned ? 'Unpin' : 'Pin to top'}">
            <svg viewBox="0 0 24 24" fill="${clip.pinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>

          <button class="btn-card-action danger btn-delete" title="Delete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="card-body">
        ${contentHtml}
      </div>

      <div class="card-footer">
        <span class="card-meta">${deviceIcon} ${clip.device || 'Web'} • ${timeAgo}</span>

        <button class="btn-copy-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        </button>
      </div>
    `;

    // Card Actions
    card.querySelector('.btn-pin').addEventListener('click', () => {
      sound.playPop();
      syncService.togglePin(clip.id, clip.pinned);
    });

    card.querySelector('.btn-delete').addEventListener('click', () => {
      sound.playDelete();
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => syncService.deleteClip(clip.id), 130);
    });

    const btnCopy = card.querySelector('.btn-copy-card');
    btnCopy.addEventListener('click', () => {
      copyText(clip.content, btnCopy);
    });

    frag.appendChild(card);
  });

  clipsList.innerHTML = '';
  clipsList.appendChild(frag);
}

function updateCounts() {
  countAll.textContent = allClips.length;
  countLink.textContent = allClips.filter((c) => c.type === 'link').length;
  countText.textContent = allClips.filter((c) => c.type === 'text').length;
  countCode.textContent = allClips.filter((c) => c.type === 'code').length;
  countPinned.textContent = allClips.filter((c) => c.pinned).length;
}

/* ==========================================================================
   Copy & Toast
   ========================================================================== */
async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    if ('vibrate' in navigator) navigator.vibrate([16]);
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
  // Input typing in compose panel
  mainInput.addEventListener('input', () => {
    updateComposeBadge(mainInput.value);
  });

  mainInput.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      submitComposeInput();
    }
  });

  btnSubmit.addEventListener('click', submitComposeInput);

  // Paste from system clipboard button
  btnPasteSys.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim()) {
        mainInput.value = text;
        updateComposeBadge(text);
        mainInput.focus();
        showToast('Pasted from system clipboard!', 'info');
      } else {
        showToast('System clipboard is empty', 'info');
      }
    } catch (e) {
      mainInput.focus();
      showToast('Press ⌘V to paste manually', 'info');
    }
  });

  // Search input in main toolbar
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.trim();
    if (searchQuery.length > 0) {
      btnClearSearch.classList.remove('hidden');
    } else {
      btnClearSearch.classList.add('hidden');
    }
    renderClips();
  });

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    btnClearSearch.classList.add('hidden');
    renderClips();
    searchInput.focus();
  });

  // Navigation Filter items
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      sound.playPop();
      navItems.forEach((i) => i.classList.remove('active'));
      item.classList.add('active');
      currentFilter = item.dataset.filter;
      renderClips();
    });
  });

  // Export
  btnExportClips.addEventListener('click', () => {
    sound.playPop();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allClips, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `clipsync-${syncService.roomId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported clipboard history JSON', 'success');
  });

  // Clear unpinned
  btnClearHistory.addEventListener('click', () => {
    sound.playDelete();
    syncService.clearAll();
    showToast('Cleared unpinned clips', 'info');
  });

  // Load sample data button
  if (btnSample) {
    btnSample.addEventListener('click', () => {
      sound.playPop();
      const samples = [
        { content: 'https://news.ycombinator.com', type: 'link', device: 'Mac' },
        { content: 'https://github.com/features/actions', type: 'link', device: 'iPhone' },
        { content: 'function syncClipboard() {\n  return "Zero empty spaces, full-width responsive dashboard!";\n}', type: 'code', device: 'Mac' },
        { content: 'Meeting notes: Cross-device virtual clipboard testing on MacBook, iPhone, and Android.', type: 'text', device: 'Android' }
      ];
      samples.forEach((s) => syncService.addClip(s));
      showToast('Loaded sample clips!', 'success');
    });
  }

  // Modals & Room
  btnRoom.addEventListener('click', openPairModal);
  btnPair.addEventListener('click', openPairModal);
  btnSidebarPair.addEventListener('click', openPairModal);
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
      showToast('Invalid JSON format', 'error');
    }
  });

  btnResetFirebase.addEventListener('click', () => {
    syncService.resetToLocal();
    firebaseJsonInput.value = '';
    updateRoomUI();
    modalSettings.classList.add('hidden');
    showToast('Reset to local relay mode', 'info');
  });

  btnSound.addEventListener('click', () => {
    const on = sound.toggle();
    initSoundUI();
    showToast(on ? 'Sound on 🔔' : 'Sound muted 🔕', 'info');
  });

  // Global Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K or /: Focus search
    if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement !== mainInput && document.activeElement !== searchInput)) {
      e.preventDefault();
      searchInput.focus();
    }
    // Escape: Close modals
    if (e.key === 'Escape') {
      modalPair.classList.add('hidden');
      modalSettings.classList.add('hidden');
    }
  });

  // Close modals on outside click
  [modalPair, modalSettings].forEach((m) => {
    m.addEventListener('click', (e) => {
      if (e.target === m) m.classList.add('hidden');
    });
  });
}

function submitComposeInput() {
  const val = mainInput.value.trim();
  if (!val) {
    mainInput.focus();
    return;
  }

  const type = detectContentType(val);
  syncService.addClip({
    content: val,
    type,
    device: getDeviceLabel()
  }).then(() => {
    sound.playSyncTone();
    mainInput.value = '';
    updateComposeBadge('');
    renderClips();
    showToast('Synced to clipboard! ⚡', 'success');
  });
}

function updateRoomUI() {
  displayRoomId.textContent = syncService.roomId;
  sidebarRoomId.textContent = syncService.roomId;
  pairRoomInput.value = syncService.roomId;
  statusDot.className = syncService.isFirebaseConnected ? 'pulse-dot online' : 'pulse-dot';
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
    color: { dark: '#0B0D11', light: '#FFFFFF' }
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
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline;">${url}</a>`;
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
