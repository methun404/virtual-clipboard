import QRCode from 'qrcode';
import { syncService } from './firebase.js';
import { sound } from './sound.js';

// State
let allClips = [];
let currentFilter = 'all';
let searchQuery = '';
let deferredPrompt = null;

// DOM Elements
const clipsList = document.getElementById('clips-list');
const emptyState = document.getElementById('empty-state');
const loadingState = document.getElementById('loading-state');
const searchInput = document.getElementById('search-input');
const btnClearSearch = document.getElementById('btn-clear-search');
const filterTabs = document.querySelectorAll('.tab-btn');
const toastContainer = document.getElementById('toast-container');
const displayRoomId = document.getElementById('display-room-id');
const statusDot = document.getElementById('status-dot');
const btnRoomBadge = document.getElementById('btn-room-badge');
const btnPairDevice = document.getElementById('btn-pair-device');
const btnOpenSettings = document.getElementById('btn-open-settings');
const btnSoundToggle = document.getElementById('btn-sound-toggle');
const soundIconOn = document.getElementById('sound-icon-on');
const soundIconOff = document.getElementById('sound-icon-off');
const btnInstallPwa = document.getElementById('btn-install-pwa');
const btnClearAll = document.getElementById('btn-clear-all');
const btnExportClips = document.getElementById('btn-export-clips');
const btnQuickPaste = document.getElementById('btn-quick-paste');
const btnAddSample = document.getElementById('btn-add-sample');
const btnEmptyAdd = document.getElementById('btn-empty-add');
const btnMobileFab = document.getElementById('btn-mobile-fab');

// Modals: New Clip
const btnOpenNewClip = document.getElementById('btn-open-new-clip');
const modalNewClip = document.getElementById('modal-new-clip');
const btnCloseNewClip = document.getElementById('btn-close-new-clip');
const btnCancelCompose = document.getElementById('btn-cancel-compose');
const clipInput = document.getElementById('clip-input');
const btnSyncClip = document.getElementById('btn-sync-clip');
const charCount = document.getElementById('char-count');
const detectedIcon = document.getElementById('detected-icon');
const detectedText = document.getElementById('detected-text');
const btnModalPaste = document.getElementById('btn-modal-paste');

// Modals: Pair Devices
const modalPair = document.getElementById('modal-pair');
const btnClosePair = document.getElementById('btn-close-pair');
const qrCanvasHolder = document.getElementById('qr-canvas-holder');
const pairRoomInput = document.getElementById('pair-room-input');
const btnCopyRoomLink = document.getElementById('btn-copy-room-link');
const inputCustomRoom = document.getElementById('input-custom-room');
const btnSwitchRoom = document.getElementById('btn-switch-room');
const btnRandomRoom = document.getElementById('btn-random-room');

// Modals: Settings
const modalSettings = document.getElementById('modal-settings');
const btnCloseSettings = document.getElementById('btn-close-settings');
const firebaseJsonInput = document.getElementById('firebase-json-input');
const btnSaveFirebase = document.getElementById('btn-save-firebase');
const btnResetFirebase = document.getElementById('btn-reset-firebase');
const settingsStatusBadge = document.getElementById('settings-status-badge');
const settingsStatusDetail = document.getElementById('settings-status-detail');
const btnToggleGuide = document.getElementById('btn-toggle-guide');
const guideContent = document.getElementById('guide-content');

// Modals: Confirm Clear
const modalConfirmClear = document.getElementById('modal-confirm-clear');
const btnCloseConfirm = document.getElementById('btn-close-confirm');
const btnCancelClear = document.getElementById('btn-cancel-clear');
const btnExecuteClear = document.getElementById('btn-execute-clear');

// Counts
const countAll = document.getElementById('count-all');
const countLink = document.getElementById('count-link');
const countCode = document.getElementById('count-code');
const countText = document.getElementById('count-text');
const countPinned = document.getElementById('count-pinned');

/* ==========================================================================
   Initialization
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  initServiceWorker();
  initSoundUI();
  updateRoomUI();
  handleWebShareTarget();
  bindEventListeners();

  // Listen to sync updates
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
  if (/Macintosh|Mac OS X/.test(ua)) return 'MacBook';
  if (/Android/.test(ua)) return 'Android';
  if (/Windows/.test(ua)) return 'Windows PC';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Web Device';
}

function getDeviceIcon(label) {
  if (label === 'MacBook') return '💻';
  if (label === 'iPhone') return '📱';
  if (label === 'Android') return '🤖';
  if (label === 'Windows PC') return '🖥️';
  return '🌐';
}

/* ==========================================================================
   PWA Service Worker & Install Prompt
   ========================================================================== */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('[PWA] Service Worker registered:', reg.scope);
    }).catch((err) => {
      console.warn('[PWA] Service Worker registration failed:', err);
    });
  }

  // Intercept PWA Install Banner
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (btnInstallPwa) btnInstallPwa.classList.remove('hidden');
  });

  window.addEventListener('appinstalled', () => {
    showToast('ClipSync installed successfully! 🚀', 'success');
    if (btnInstallPwa) btnInstallPwa.classList.add('hidden');
    deferredPrompt = null;
  });

  if (btnInstallPwa) {
    btnInstallPwa.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('[PWA] Installation accepted');
        }
        deferredPrompt = null;
        btnInstallPwa.classList.add('hidden');
      } else {
        showToast('To install: Tap Share (⎙) -> "Add to Home Screen"', 'info');
      }
    });
  }
}

/* ==========================================================================
   Web Share Target Handler (Receiving shares from iPhone / Android)
   ========================================================================== */
function handleWebShareTarget() {
  const params = new URLSearchParams(window.location.search);
  const sharedTitle = params.get('title');
  const sharedText = params.get('text');
  const sharedUrl = params.get('url');

  if (sharedTitle || sharedText || sharedUrl) {
    let combined = '';
    if (sharedUrl) {
      combined = sharedUrl;
      if (sharedText && sharedText !== sharedUrl) {
        combined = sharedText + '\n' + sharedUrl;
      }
    } else if (sharedText) {
      combined = sharedText;
    } else if (sharedTitle) {
      combined = sharedTitle;
    }

    if (combined.trim()) {
      const type = detectContentType(combined);
      const device = getDeviceLabel();

      syncService.addClip({
        content: combined.trim(),
        type,
        device
      }).then(() => {
        sound.playSyncTone();
        showToast('Shared item added to dashboard! 📥', 'success');
      });
    }

    // Clean URL query parameters
    const cleanUrl = window.location.origin + window.location.pathname + 
      (params.has('room') ? `?room=${params.get('room')}` : '');
    window.history.replaceState({}, document.title, cleanUrl);
  }
}

/* ==========================================================================
   Content Type Detection
   ========================================================================== */
function detectContentType(text) {
  if (!text) return 'text';
  const trimmed = text.trim();

  // URL detection
  const urlRegex = /^(https?:\/\/[^\s]+)$/i;
  if (urlRegex.test(trimmed)) {
    return 'link';
  }

  // Code snippet detection
  const codeIndicators = [
    'const ', 'let ', 'var ', 'function', 'class ', 'import ', 'export ',
    'def ', 'return ', 'console.log', '<div>', '<script', 'SELECT ', 'FROM ',
    '{', '}', '=>', 'public static void', '#include'
  ];
  const hasCodeKeywords = codeIndicators.some((kw) => trimmed.includes(kw));
  const hasMultipleLines = (trimmed.match(/\n/g) || []).length >= 2;

  if (hasCodeKeywords && (hasMultipleLines || trimmed.includes('{') || trimmed.includes(';'))) {
    return 'code';
  }

  return 'text';
}

function updateComposeBadge(val) {
  const type = detectContentType(val);
  if (type === 'link') {
    detectedIcon.textContent = '🔗';
    detectedText.textContent = 'Link';
  } else if (type === 'code') {
    detectedIcon.textContent = '💻';
    detectedText.textContent = 'Code';
  } else {
    detectedIcon.textContent = '📝';
    detectedText.textContent = 'Text';
  }

  charCount.textContent = `${val.length} characters`;
}

/* ==========================================================================
   Clips Dashboard Rendering
   ========================================================================== */
function renderClips() {
  let filtered = [...allClips];

  // Apply search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((clip) => {
      const matchContent = (clip.content || '').toLowerCase().includes(q);
      const matchDevice = (clip.device || '').toLowerCase().includes(q);
      const matchType = (clip.type || '').toLowerCase().includes(q);
      return matchContent || matchDevice || matchType;
    });
  }

  // Apply filter tabs
  if (currentFilter === 'link') {
    filtered = filtered.filter((c) => c.type === 'link');
  } else if (currentFilter === 'code') {
    filtered = filtered.filter((c) => c.type === 'code');
  } else if (currentFilter === 'text') {
    filtered = filtered.filter((c) => c.type === 'text');
  } else if (currentFilter === 'pinned') {
    filtered = filtered.filter((c) => c.pinned);
  }

  // Handle Empty State
  if (filtered.length === 0) {
    clipsList.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  } else {
    emptyState.classList.add('hidden');
  }

  // Build Minimal Dashboard Rows
  const frag = document.createDocumentFragment();

  filtered.forEach((clip) => {
    const row = document.createElement('div');
    row.className = `clip-row ${clip.pinned ? 'pinned' : ''}`;
    row.dataset.id = clip.id;
    row.setAttribute('role', 'listitem');

    // Type icon representation
    const typeClass = clip.type === 'link' ? 'type-link' : (clip.type === 'code' ? 'type-code' : 'type-text');
    const typeEmoji = clip.type === 'link' ? '🔗' : (clip.type === 'code' ? '💻' : '📝');
    const deviceIcon = getDeviceIcon(clip.device);
    const timeAgo = formatTimeAgo(clip.timestamp);

    // Content Display
    let contentHtml = '';
    if (clip.type === 'link') {
      const url = clip.content.trim();
      let domain = '';
      try {
        domain = new URL(url).hostname;
      } catch (e) {
        domain = url;
      }

      contentHtml = `
        <div class="clip-title-row">
          <span class="clip-domain">${escapeHtml(domain)}</span>
        </div>
        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="clip-url-text">${escapeHtml(url)}</a>
      `;
    } else if (clip.type === 'code') {
      contentHtml = `
        <div class="clip-code-block">
          <pre class="clip-code-text"><code>${escapeHtml(clip.content)}</code></pre>
        </div>
      `;
    } else {
      contentHtml = `
        <div class="clip-plain-text">${linkifyText(escapeHtml(clip.content))}</div>
      `;
    }

    row.innerHTML = `
      <div class="clip-main">
        <div class="clip-type-icon ${typeClass}" title="${clip.type}">
          ${typeEmoji}
        </div>
        <div class="clip-details">
          ${contentHtml}
          <div class="clip-meta-bar">
            <span class="device-chip">${deviceIcon} ${clip.device || 'Device'}</span>
            <span>•</span>
            <span class="timestamp">${timeAgo}</span>
            <span>•</span>
            <span>${(clip.content || '').length} chars</span>
          </div>
        </div>
      </div>

      <div class="clip-actions-group">
        ${clip.type === 'link' ? `
          <a href="${escapeHtml(clip.content.trim())}" target="_blank" rel="noopener noreferrer" class="btn-action-mini" title="Open URL in new tab">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        ` : ''}

        <button class="btn-action-mini btn-pin ${clip.pinned ? 'active-pin' : ''}" title="${clip.pinned ? 'Unpin' : 'Pin to top'}">
          <svg viewBox="0 0 24 24" fill="${clip.pinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>

        <button class="btn-action-mini danger btn-delete" title="Delete">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>

        <button class="btn-action-copy">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        </button>
      </div>
    `;

    // Action button listeners
    const btnPin = row.querySelector('.btn-pin');
    btnPin.addEventListener('click', () => {
      sound.playPop();
      syncService.togglePin(clip.id, clip.pinned);
    });

    const btnDelete = row.querySelector('.btn-delete');
    btnDelete.addEventListener('click', () => {
      sound.playDelete();
      row.style.opacity = '0';
      row.style.transform = 'scale(0.97)';
      setTimeout(() => {
        syncService.deleteClip(clip.id);
      }, 140);
    });

    const btnCopy = row.querySelector('.btn-action-copy');
    btnCopy.addEventListener('click', () => {
      copyToClipboard(clip.content, btnCopy);
    });

    frag.appendChild(row);
  });

  clipsList.innerHTML = '';
  clipsList.appendChild(frag);
}

function updateCounts() {
  countAll.textContent = allClips.length;
  countLink.textContent = allClips.filter((c) => c.type === 'link').length;
  countCode.textContent = allClips.filter((c) => c.type === 'code').length;
  countText.textContent = allClips.filter((c) => c.type === 'text').length;
  countPinned.textContent = allClips.filter((c) => c.pinned).length;
}

/* ==========================================================================
   Copy & Haptics
   ========================================================================== */
async function copyToClipboard(text, btnElement) {
  try {
    await navigator.clipboard.writeText(text);

    // Haptics
    if ('vibrate' in navigator) {
      navigator.vibrate([18]);
    }

    // Sound chime
    sound.playCopyChime();

    // Visual button state
    if (btnElement) {
      const originalHTML = btnElement.innerHTML;
      btnElement.classList.add('copied');
      btnElement.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Copied!</span>
      `;
      setTimeout(() => {
        btnElement.classList.remove('copied');
        btnElement.innerHTML = originalHTML;
      }, 1600);
    }

    showToast('Copied to clipboard! 📋', 'success');
  } catch (err) {
    console.error('Failed to copy:', err);
    showToast('Failed to copy', 'error');
  }
}

/* ==========================================================================
   Event Listeners
   ========================================================================== */
function bindEventListeners() {
  // Open New Clip Modal
  btnOpenNewClip.addEventListener('click', openNewClipModal);
  if (btnMobileFab) btnMobileFab.addEventListener('click', openNewClipModal);
  if (btnEmptyAdd) btnEmptyAdd.addEventListener('click', openNewClipModal);

  btnCloseNewClip.addEventListener('click', closeNewClipModal);
  btnCancelCompose.addEventListener('click', closeNewClipModal);

  // New Clip Input typing
  clipInput.addEventListener('input', () => {
    updateComposeBadge(clipInput.value);
  });

  // Modal Paste from system
  btnModalPaste.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim()) {
        clipInput.value = text;
        updateComposeBadge(text);
        clipInput.focus();
        showToast('Pasted from system clipboard!', 'info');
      } else {
        showToast('System clipboard is empty', 'info');
      }
    } catch (e) {
      showToast('Paste manually (permissions)', 'info');
      clipInput.focus();
    }
  });

  // Quick Paste button in top toolbar (Instant sync without opening modal!)
  if (btnQuickPaste) {
    btnQuickPaste.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          const type = detectContentType(text);
          const device = getDeviceLabel();
          await syncService.addClip({
            content: text.trim(),
            type,
            device
          });
          sound.playSyncTone();
          showToast('Clipboard item synced to dashboard! ⚡', 'success');
        } else {
          showToast('System clipboard is empty', 'info');
        }
      } catch (e) {
        // Fallback: open modal
        openNewClipModal();
        showToast('Paste into input box', 'info');
      }
    });
  }

  // Submit new clip
  btnSyncClip.addEventListener('click', submitNewClip);

  // Search input
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

  // Filter tabs
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      sound.playPop();
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentFilter = tab.dataset.filter;
      renderClips();
    });
  });

  // Add Sample Clips
  if (btnAddSample) {
    btnAddSample.addEventListener('click', () => {
      sound.playPop();
      const samples = [
        {
          content: 'https://news.ycombinator.com',
          type: 'link',
          device: 'MacBook'
        },
        {
          content: 'https://github.com/trending',
          type: 'link',
          device: 'iPhone'
        },
        {
          content: 'const syncStatus = {\n  online: true,\n  devices: ["MacBook", "iPhone", "Android"],\n  latency: "< 100ms"\n};',
          type: 'code',
          device: 'MacBook'
        },
        {
          content: 'Virtual clipboard manager is ready. Share any link or text from your phone and it syncs here automatically.',
          type: 'text',
          device: 'Android'
        }
      ];

      samples.forEach((sample, idx) => {
        setTimeout(() => {
          syncService.addClip(sample);
        }, idx * 80);
      });

      showToast('Sample clips loaded into dashboard!', 'success');
    });
  }

  // Clear All Modal
  btnClearAll.addEventListener('click', () => {
    sound.playPop();
    modalConfirmClear.classList.remove('hidden');
  });

  btnCloseConfirm.addEventListener('click', () => modalConfirmClear.classList.add('hidden'));
  btnCancelClear.addEventListener('click', () => modalConfirmClear.classList.add('hidden'));
  btnExecuteClear.addEventListener('click', () => {
    sound.playDelete();
    syncService.clearAll();
    modalConfirmClear.classList.add('hidden');
    showToast('Unpinned history cleared', 'info');
  });

  // Export clips
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

  // Sound toggle
  btnSoundToggle.addEventListener('click', () => {
    const isEnabled = sound.toggle();
    if (isEnabled) {
      soundIconOn.classList.remove('hidden');
      soundIconOff.classList.add('hidden');
      showToast('Sound feedback enabled 🔔', 'info');
    } else {
      soundIconOn.classList.add('hidden');
      soundIconOff.classList.remove('hidden');
      showToast('Sound feedback muted 🔕', 'info');
    }
  });

  // Pair Modal Triggers
  btnRoomBadge.addEventListener('click', openPairModal);
  btnPairDevice.addEventListener('click', openPairModal);
  btnClosePair.addEventListener('click', closePairModal);

  // Copy Room Link
  btnCopyRoomLink.addEventListener('click', () => {
    const pairUrl = `${window.location.origin}${window.location.pathname}?room=${syncService.roomId}`;
    copyToClipboard(pairUrl, btnCopyRoomLink);
  });

  // Switch Room
  btnSwitchRoom.addEventListener('click', () => {
    const val = inputCustomRoom.value.trim().toUpperCase();
    if (val) {
      syncService.setRoomId(val);
      updateRoomUI();
      renderQRCode();
      inputCustomRoom.value = '';
      showToast(`Joined Room: ${val} 🔄`, 'success');
    }
  });

  btnRandomRoom.addEventListener('click', () => {
    const newRoom = 'CLIP-' + Math.floor(1000 + Math.random() * 9000);
    syncService.setRoomId(newRoom);
    updateRoomUI();
    renderQRCode();
    showToast(`New Room created: ${newRoom} 🎲`, 'success');
  });

  // Firebase Settings Modal
  btnOpenSettings.addEventListener('click', openSettingsModal);
  btnCloseSettings.addEventListener('click', closeSettingsModal);

  btnToggleGuide.addEventListener('click', () => {
    guideContent.classList.toggle('hidden');
  });

  btnSaveFirebase.addEventListener('click', () => {
    const raw = firebaseJsonInput.value.trim();
    if (!raw) {
      showToast('Please paste a valid Firebase configuration', 'error');
      return;
    }
    try {
      let parsed;
      if (raw.startsWith('{')) {
        parsed = JSON.parse(raw);
      } else {
        parsed = Function(`"use strict"; return (${raw});`)();
      }

      if (parsed && (parsed.apiKey || parsed.databaseURL)) {
        syncService.saveFirebaseConfig(parsed);
        updateRoomUI();
        updateSettingsStatusUI();
        showToast('Firebase connected successfully! ☁️', 'success');
        setTimeout(closeSettingsModal, 1000);
      } else {
        showToast('Config must contain apiKey and databaseURL', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Invalid JSON format', 'error');
    }
  });

  btnResetFirebase.addEventListener('click', () => {
    syncService.resetToLocal();
    firebaseJsonInput.value = '';
    updateRoomUI();
    updateSettingsStatusUI();
    showToast('Reset to Local In-Browser Relay mode', 'info');
  });

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + N: Open New Clip Modal
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
      e.preventDefault();
      openNewClipModal();
    }

    // Cmd/Ctrl + Enter in composer: Submit
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      if (document.activeElement === clipInput) {
        e.preventDefault();
        submitNewClip();
      }
    }

    // Cmd/Ctrl + K or /: Focus Search
    if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement !== clipInput && document.activeElement !== searchInput)) {
      e.preventDefault();
      searchInput.focus();
    }

    // Escape: Close modals
    if (e.key === 'Escape') {
      closeNewClipModal();
      closePairModal();
      closeSettingsModal();
      modalConfirmClear.classList.add('hidden');
    }
  });

  // Close modals on backdrop click
  [modalNewClip, modalPair, modalSettings, modalConfirmClear].forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
}

function openNewClipModal() {
  sound.playPop();
  modalNewClip.classList.remove('hidden');
  clipInput.value = '';
  updateComposeBadge('');
  setTimeout(() => clipInput.focus(), 80);
}

function closeNewClipModal() {
  modalNewClip.classList.add('hidden');
}

function submitNewClip() {
  const content = clipInput.value.trim();
  if (!content) {
    clipInput.focus();
    return;
  }

  const type = detectContentType(content);
  const device = getDeviceLabel();

  syncService.addClip({
    content,
    type,
    device
  }).then(() => {
    sound.playSyncTone();
    closeNewClipModal();
    showToast('Synced to dashboard! ⚡', 'success');
  });
}

/* ==========================================================================
   Sound UI Sync
   ========================================================================== */
function initSoundUI() {
  if (sound.enabled) {
    soundIconOn.classList.remove('hidden');
    soundIconOff.classList.add('hidden');
  } else {
    soundIconOn.classList.add('hidden');
    soundIconOff.classList.remove('hidden');
  }
}

/* ==========================================================================
   Room & Pairing UI
   ========================================================================== */
function updateRoomUI() {
  displayRoomId.textContent = syncService.roomId;
  pairRoomInput.value = syncService.roomId;

  if (syncService.isFirebaseConnected) {
    statusDot.className = 'status-indicator online';
    statusDot.title = 'Connected to Firebase Realtime Database';
  } else {
    statusDot.className = 'status-indicator';
    statusDot.title = 'Connected via Local Relay';
  }
}

function openPairModal() {
  sound.playPop();
  modalPair.classList.remove('hidden');
  renderQRCode();
}

function closePairModal() {
  modalPair.classList.add('hidden');
}

function renderQRCode() {
  const pairUrl = `${window.location.origin}${window.location.pathname}?room=${syncService.roomId}`;
  QRCode.toCanvas(pairUrl, {
    width: 160,
    margin: 1,
    color: {
      dark: '#0B0F17',
      light: '#FFFFFF'
    }
  }, (err, canvas) => {
    if (!err && canvas) {
      qrCanvasHolder.innerHTML = '';
      qrCanvasHolder.appendChild(canvas);
    }
  });
}

/* ==========================================================================
   Firebase Settings Modal
   ========================================================================== */
function openSettingsModal() {
  sound.playPop();
  modalSettings.classList.remove('hidden');
  updateSettingsStatusUI();

  const saved = syncService.getFirebaseConfig();
  if (saved) {
    firebaseJsonInput.value = JSON.stringify(saved, null, 2);
  }
}

function closeSettingsModal() {
  modalSettings.classList.add('hidden');
}

function updateSettingsStatusUI() {
  if (syncService.isFirebaseConnected) {
    settingsStatusBadge.textContent = '☁️ Firebase Connected';
    settingsStatusBadge.style.color = '#34D399';
    settingsStatusDetail.textContent = 'Active connection to Firebase Realtime Database. All devices with this room code sync globally in real-time!';
  } else {
    settingsStatusBadge.textContent = '⚡ Local Mode Active';
    settingsStatusBadge.style.color = '#38BDF8';
    settingsStatusDetail.textContent = 'Running in high-speed local relay mode. To sync across cellular networks globally, add your Firebase config.';
  }
}

/* ==========================================================================
   Toast Notifications
   ========================================================================== */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'ℹ️';
  if (type === 'success') icon = '✓';
  if (type === 'error') icon = '✕';

  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 200);
  }, 2400);
}

/* ==========================================================================
   Utilities
   ========================================================================== */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function linkifyText(escapedText) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return escapedText.replace(urlPattern, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan); text-decoration: underline;">${url}</a>`;
  });
}

function formatTimeAgo(timestamp) {
  if (!timestamp) return 'Just now';
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 10) return 'Just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
