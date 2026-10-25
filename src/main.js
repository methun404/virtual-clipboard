import QRCode from 'qrcode';
import { syncService } from './firebase.js';
import { sound } from './sound.js';

// State
let allClips = [];
let currentFilter = 'all';
let searchQuery = '';
let deferredPrompt = null;
let currentViewMode = localStorage.getItem('clipsync_view_mode') || 'grid';

// Category Titles
const categoryTitles = {
  all: 'All Clips',
  link: 'Links & URLs',
  text: 'Notes & Text',
  code: 'Code Snippets',
  pinned: 'Pinned Clips'
};

// Sidebar Elements
const appLayout = document.querySelector('.app-layout');
const appSidebar = document.getElementById('app-sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
const btnCollapseSidebar = document.getElementById('btn-collapse-sidebar');
const navItems = document.querySelectorAll('.nav-item');
const activeCategoryTitle = document.getElementById('active-category-title');
const btnExportClips = document.getElementById('btn-export-clips');
const btnClearHistory = document.getElementById('btn-clear-history');

// Room & Status in Sidebar
const displayRoomId = document.getElementById('display-room-id');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const btnRoom = document.getElementById('btn-room');
const btnPair = document.getElementById('btn-pair');
const btnSettings = document.getElementById('btn-settings');
const btnSound = document.getElementById('btn-sound');
const soundIconOn = document.getElementById('sound-icon-on');
const soundIconOff = document.getElementById('sound-icon-off');
const soundLabel = document.getElementById('sound-label');
const btnInstallPwa = document.getElementById('btn-install-pwa');

// Counts
const countAll = document.getElementById('count-all');
const countLink = document.getElementById('count-link');
const countText = document.getElementById('count-text');
const countCode = document.getElementById('count-code');
const countPinned = document.getElementById('count-pinned');

// Compose Modal Elements
const modalCompose = document.getElementById('modal-compose');
const btnCloseCompose = document.getElementById('btn-close-compose');
const modalClipInput = document.getElementById('modal-clip-input');
const modalTypeTag = document.getElementById('modal-type-tag');
const btnModalPaste = document.getElementById('btn-modal-paste');
const btnModalSubmit = document.getElementById('btn-modal-submit');

// Trigger Buttons for Compose Modal
const btnTopbarAdd = document.getElementById('btn-topbar-add');
const btnSidebarAdd = document.getElementById('btn-sidebar-add');
const btnEmptyAdd = document.getElementById('btn-empty-add');
const btnMobileFab = document.getElementById('btn-mobile-fab');

// Toolbar & Search
const searchInput = document.getElementById('search-input');
const btnClearSearch = document.getElementById('btn-clear-search');
const btnViewGrid = document.getElementById('btn-view-grid');
const btnViewList = document.getElementById('btn-view-list');

// Feed & Feedback
const clipsList = document.getElementById('clips-list');
const emptyState = document.getElementById('empty-state');
const loadingState = document.getElementById('loading-state');
const btnSample = document.getElementById('btn-sample');
const toastContainer = document.getElementById('toast-container');

// Modals: Pair
const modalPair = document.getElementById('modal-pair');
const btnClosePair = document.getElementById('btn-close-pair');
const qrCanvasHolder = document.getElementById('qr-canvas-holder');
const pairRoomInput = document.getElementById('pair-room-input');
const btnCopyLink = document.getElementById('btn-copy-link');
const inputCustomRoom = document.getElementById('input-custom-room');
const btnSwitchRoom = document.getElementById('btn-switch-room');
const btnNewRoom = document.getElementById('btn-new-room');

// Modals: Settings
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
  initViewMode();
  initSidebarState();
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
   Web Share Target (Interception from OS Share Menu)
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
        showToast('Shared item added to clipboard! 📥', 'success');
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
  if (
    trimmed.includes('function') ||
    trimmed.includes('const ') ||
    trimmed.includes('class ') ||
    trimmed.includes('import ') ||
    trimmed.includes('export ') ||
    (trimmed.includes('{') && trimmed.includes('}')) ||
    (trimmed.includes('<') && trimmed.includes('>'))
  ) {
    return 'code';
  }
  return 'text';
}

function updateComposeBadge(val) {
  if (!modalTypeTag) return;
  const type = detectContentType(val);
  const label = type === 'link' ? '🔗 Link' : (type === 'code' ? '💻 Code' : '📝 Text');
  modalTypeTag.textContent = label;
}

/* ==========================================================================
   View Mode (Grid vs List)
   ========================================================================== */
function initViewMode() {
  applyViewMode(currentViewMode);

  if (btnViewGrid) {
    btnViewGrid.addEventListener('click', () => applyViewMode('grid'));
  }
  if (btnViewList) {
    btnViewList.addEventListener('click', () => applyViewMode('list'));
  }
}

function applyViewMode(mode) {
  currentViewMode = mode;
  localStorage.setItem('clipsync_view_mode', mode);

  if (clipsList) {
    if (mode === 'grid') {
      clipsList.classList.add('view-grid');
      clipsList.classList.remove('view-list');
    } else {
      clipsList.classList.add('view-list');
      clipsList.classList.remove('view-grid');
    }
  }

  if (btnViewGrid) btnViewGrid.classList.toggle('active', mode === 'grid');
  if (btnViewList) btnViewList.classList.toggle('active', mode === 'list');
}

/* ==========================================================================
   Rendering Clips
   ========================================================================== */
function renderClips() {
  if (!clipsList) return;

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

  // Category filter
  if (currentFilter === 'link') list = list.filter((c) => c.type === 'link');
  if (currentFilter === 'text') list = list.filter((c) => c.type === 'text');
  if (currentFilter === 'code') list = list.filter((c) => c.type === 'code');
  if (currentFilter === 'pinned') list = list.filter((c) => c.pinned);

  if (list.length === 0) {
    clipsList.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
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
            <a href="${escapeHtml(clip.content.trim())}" target="_blank" rel="noopener noreferrer" class="btn-card-action" title="Open Link" aria-label="Open Link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          ` : ''}

          <button class="btn-card-action btn-pin ${clip.pinned ? 'active-pin' : ''}" title="${clip.pinned ? 'Unpin' : 'Pin'}" aria-label="Pin item">
            <svg viewBox="0 0 24 24" fill="${clip.pinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>

          <button class="btn-card-action danger btn-delete" title="Delete" aria-label="Delete item">
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

        <button class="btn-copy-card" aria-label="Copy item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        </button>
      </div>
    `;

    // Pin
    const btnPin = card.querySelector('.btn-pin');
    if (btnPin) {
      btnPin.addEventListener('click', () => {
        sound.playPop();
        syncService.togglePin(clip.id, clip.pinned);
      });
    }

    // Delete
    const btnDelete = card.querySelector('.btn-delete');
    if (btnDelete) {
      btnDelete.addEventListener('click', () => {
        sound.playDelete();
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => syncService.deleteClip(clip.id), 120);
      });
    }

    // Copy
    const btnCopy = card.querySelector('.btn-copy-card');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        copyText(clip.content, btnCopy);
      });
    }

    frag.appendChild(card);
  });

  clipsList.innerHTML = '';
  clipsList.appendChild(frag);
}

function updateCounts() {
  const all = allClips.length;
  const link = allClips.filter((c) => c.type === 'link').length;
  const text = allClips.filter((c) => c.type === 'text').length;
  const code = allClips.filter((c) => c.type === 'code').length;
  const pinned = allClips.filter((c) => c.pinned).length;

  if (countAll) countAll.textContent = all;
  if (countLink) countLink.textContent = link;
  if (countText) countText.textContent = text;
  if (countCode) countCode.textContent = code;
  if (countPinned) countPinned.textContent = pinned;
}

/* ==========================================================================
   Copy & Toast
   ========================================================================== */
async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    if ('vibrate' in navigator) navigator.vibrate([18]);
    sound.playCopyChime();

    if (btn) {
      const old = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = `<span>✓ Copied</span>`;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = old;
      }, 1400);
    }
    showToast('Copied to clipboard! 📋', 'success');
  } catch (e) {
    showToast('Failed to copy', 'error');
  }
}

/* ==========================================================================
   Filter Switcher
   ========================================================================== */
function setActiveFilter(filterKey) {
  currentFilter = filterKey;
  sound.playPop();

  navItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.filter === filterKey);
  });

  if (activeCategoryTitle && categoryTitles[filterKey]) {
    activeCategoryTitle.textContent = categoryTitles[filterKey];
  }

  closeSidebar();
  renderClips();
}

/* ==========================================================================
   Sidebar Expand & Collapse Controls (Desktop & Mobile)
   ========================================================================== */
function isMobileView() {
  return window.innerWidth <= 860;
}

function initSidebarState() {
  const isCollapsed = localStorage.getItem('clipsync_sidebar_collapsed') === 'true';
  if (!isMobileView() && isCollapsed && appLayout) {
    appLayout.classList.add('sidebar-collapsed');
    if (btnToggleSidebar) {
      btnToggleSidebar.classList.add('collapsed');
      btnToggleSidebar.title = 'Expand Sidebar (⌘B)';
    }
  }
}

function toggleSidebar() {
  sound.playPop();
  if (isMobileView()) {
    // Mobile Drawer mode
    if (appSidebar && appSidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  } else {
    // Desktop Expand / Collapse mode
    if (appLayout) {
      const willCollapse = !appLayout.classList.contains('sidebar-collapsed');
      appLayout.classList.toggle('sidebar-collapsed', willCollapse);
      if (btnToggleSidebar) {
        btnToggleSidebar.classList.toggle('collapsed', willCollapse);
        btnToggleSidebar.title = willCollapse ? 'Expand Sidebar (⌘B)' : 'Hide Sidebar (⌘B)';
      }
      localStorage.setItem('clipsync_sidebar_collapsed', willCollapse ? 'true' : 'false');
      showToast(willCollapse ? 'Sidebar hidden (⌘B)' : 'Sidebar expanded (⌘B)', 'info');
    }
  }
}

function openSidebar() {
  if (appSidebar) appSidebar.classList.add('open');
  if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
}

function closeSidebar() {
  if (appSidebar) appSidebar.classList.remove('open');
  if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
}

/* ==========================================================================
   Event Bindings
   ========================================================================== */
function bindEvents() {
  // Sidebar Expand / Hide Toggles
  if (btnToggleSidebar) btnToggleSidebar.addEventListener('click', toggleSidebar);
  if (btnCollapseSidebar) btnCollapseSidebar.addEventListener('click', toggleSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  // Keyboard shortcut: ⌘+B or Ctrl+B to toggle sidebar
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      toggleSidebar();
    }
  });

  // Handle window resize between mobile and desktop
  window.addEventListener('resize', () => {
    if (isMobileView()) {
      if (appLayout) appLayout.classList.remove('sidebar-collapsed');
    } else {
      initSidebarState();
      closeSidebar();
    }
  });

  // Category navigation
  navItems.forEach((item) => {
    item.addEventListener('click', () => setActiveFilter(item.dataset.filter));
  });

  // Compose Modal open triggers
  if (btnTopbarAdd) btnTopbarAdd.addEventListener('click', openComposeModal);
  if (btnSidebarAdd) btnSidebarAdd.addEventListener('click', openComposeModal);
  if (btnEmptyAdd) btnEmptyAdd.addEventListener('click', openComposeModal);
  if (btnMobileFab) btnMobileFab.addEventListener('click', openComposeModal);

  // Compose Modal internal actions
  if (btnCloseCompose) btnCloseCompose.addEventListener('click', closeComposeModal);
  if (btnModalSubmit) btnModalSubmit.addEventListener('click', submitCompose);
  if (btnModalPaste) {
    btnModalPaste.addEventListener('click', async () => {
      await pasteIntoInput(modalClipInput);
    });
  }

  if (modalClipInput) {
    modalClipInput.addEventListener('input', () => updateComposeBadge(modalClipInput.value));
    modalClipInput.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        submitCompose();
      }
    });
  }

  // Global keyboard shortcuts (N / C to add, Esc to close modals)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeComposeModal();
      if (modalPair) modalPair.classList.add('hidden');
      if (modalSettings) modalSettings.classList.add('hidden');
      return;
    }

    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag !== 'input' && activeTag !== 'textarea') {
      if (e.key.toLowerCase() === 'n' || e.key.toLowerCase() === 'c') {
        e.preventDefault();
        openComposeModal();
      }
    }
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim();
      if (btnClearSearch) btnClearSearch.classList.toggle('hidden', searchQuery.length === 0);
      renderClips();
    });
  }

  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        btnClearSearch.classList.add('hidden');
        renderClips();
        searchInput.focus();
      }
    });
  }

  // Export JSON
  if (btnExportClips) {
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
  }

  // Clear unpinned clips
  if (btnClearHistory) {
    btnClearHistory.addEventListener('click', () => {
      sound.playDelete();
      syncService.clearAll();
      showToast('Cleared unpinned clips', 'info');
    });
  }

  // Sample data button
  if (btnSample) {
    btnSample.addEventListener('click', () => {
      sound.playPop();
      const samples = [
        { content: 'https://news.ycombinator.com', type: 'link', device: 'Mac' },
        { content: 'https://github.com/features/actions', type: 'link', device: 'iPhone' },
        { content: 'function syncVirtualClipboard() {\n  return "Responsive across MacBook, iPhone & Android!";\n}', type: 'code', device: 'Mac' },
        { content: 'Meeting notes: Mobile PWA with Web Share Target and instant offline-first sync.', type: 'text', device: 'Android' }
      ];
      samples.forEach((s) => syncService.addClip(s));
      showToast('Loaded sample clips!', 'success');
    });
  }


  // Modals: Room & Pair
  if (btnRoom) btnRoom.addEventListener('click', openPairModal);
  if (btnPair) btnPair.addEventListener('click', openPairModal);
  if (btnClosePair) btnClosePair.addEventListener('click', () => modalPair && modalPair.classList.add('hidden'));

  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', () => {
      const url = `${window.location.origin}/?room=${syncService.roomId}`;
      navigator.clipboard.writeText(url).then(() => {
        showToast('Pair link copied! 🔗', 'success');
      });
    });
  }

  if (btnSwitchRoom && inputCustomRoom) {
    btnSwitchRoom.addEventListener('click', () => {
      const r = inputCustomRoom.value.trim().toUpperCase();
      if (r) {
        syncService.switchRoom(r);
        updateRoomUI();
        if (modalPair) modalPair.classList.add('hidden');
        inputCustomRoom.value = '';
        showToast(`Switched to room ${r}`, 'success');
      }
    });
  }

  if (btnNewRoom) {
    btnNewRoom.addEventListener('click', () => {
      const r = 'CLIP-' + Math.floor(1000 + Math.random() * 9000);
      syncService.switchRoom(r);
      updateRoomUI();
      openPairModal();
      showToast(`Created new room ${r}`, 'success');
    });
  }

  // Modals: Settings
  if (btnSettings) {
    btnSettings.addEventListener('click', () => {
      if (modalSettings) {
        if (firebaseJsonInput) {
          const cfg = localStorage.getItem('clipsync_firebase_custom_config');
          firebaseJsonInput.value = cfg || '';
        }
        modalSettings.classList.remove('hidden');
      }
    });
  }

  if (btnCloseSettings && modalSettings) {
    btnCloseSettings.addEventListener('click', () => modalSettings.classList.add('hidden'));
  }

  if (btnSaveFirebase) {
    btnSaveFirebase.addEventListener('click', () => {
      const val = firebaseJsonInput.value.trim();
      if (val) {
        try {
          const parsed = JSON.parse(val);
          syncService.updateFirebaseConfig(parsed);
          updateRoomUI();
          if (modalSettings) modalSettings.classList.add('hidden');
          showToast('Firebase cloud connected! ☁️', 'success');
        } catch (e) {
          showToast('Invalid JSON config', 'error');
        }
      }
    });
  }

  if (btnResetFirebase) {
    btnResetFirebase.addEventListener('click', () => {
      syncService.resetToLocal();
      updateRoomUI();
      if (firebaseJsonInput) firebaseJsonInput.value = '';
      if (modalSettings) modalSettings.classList.add('hidden');
      showToast('Switched to local offline mode', 'info');
    });
  }

  // Backdrop modal dismiss
  window.addEventListener('click', (e) => {
    if (modalCompose && e.target === modalCompose) closeComposeModal();
    if (modalPair && e.target === modalPair) modalPair.classList.add('hidden');
    if (modalSettings && e.target === modalSettings) modalSettings.classList.add('hidden');
  });

  // Sound toggle
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      const enabled = sound.toggle();
      updateSoundIcons(enabled);
      showToast(enabled ? 'Sound enabled 🔔' : 'Sound muted 🔕', 'info');
    });
  }
}

/* ==========================================================================
   Compose Modal & Submission
   ========================================================================== */
function openComposeModal() {
  sound.playPop();
  if (modalCompose) {
    modalCompose.classList.remove('hidden');
    if (modalClipInput) {
      setTimeout(() => modalClipInput.focus(), 60);
    }
  }
}

function closeComposeModal() {
  if (modalCompose) modalCompose.classList.add('hidden');
}

async function submitCompose() {
  if (!modalClipInput) return;
  const content = modalClipInput.value.trim();
  if (!content) {
    modalClipInput.focus();
    return;
  }

  const type = detectContentType(content);
  await syncService.addClip({
    content,
    type,
    device: getDeviceLabel()
  });

  sound.playSyncTone();
  modalClipInput.value = '';
  updateComposeBadge('');
  closeComposeModal();
  showToast('Synced to all devices! ⚡', 'success');
}

async function pasteIntoInput(textarea) {
  try {
    const text = await navigator.clipboard.readText();
    if (text && textarea) {
      textarea.value = text;
      updateComposeBadge(text);
      textarea.focus();
      showToast('Pasted from clipboard', 'info');
    }
  } catch (err) {
    if (textarea) textarea.focus();
    showToast('Please press ⌘+V / Ctrl+V to paste', 'info');
  }
}

/* ==========================================================================
   Modals & Room UI
   ========================================================================== */
function openPairModal() {
  if (!modalPair) return;
  modalPair.classList.remove('hidden');
  if (pairRoomInput) pairRoomInput.value = syncService.roomId;

  if (qrCanvasHolder) {
    qrCanvasHolder.innerHTML = '';
    const pairUrl = `${window.location.origin}/?room=${syncService.roomId}`;
    QRCode.toCanvas(pairUrl, {
      width: 176,
      margin: 1,
      color: { dark: '#0E1117', light: '#FFFFFF' }
    }, (err, canvas) => {
      if (!err && canvas) {
        qrCanvasHolder.appendChild(canvas);
      }
    });
  }
}

function updateRoomUI() {
  if (displayRoomId) displayRoomId.textContent = syncService.roomId;
  if (statusDot) {
    statusDot.className = `status-dot ${syncService.isCloudActive ? 'online' : 'local'}`;
  }
  if (statusText) {
    statusText.textContent = syncService.isCloudActive ? 'Firebase Realtime Cloud' : 'Local / Offline Sync';
  }
}

function initSoundUI() {
  updateSoundIcons(sound.enabled);
}

function updateSoundIcons(enabled) {
  if (soundIconOn && soundIconOff) {
    soundIconOn.classList.toggle('hidden', !enabled);
    soundIconOff.classList.toggle('hidden', enabled);
  }
  if (soundLabel) {
    soundLabel.textContent = enabled ? 'Audio: On' : 'Audio: Muted';
  }
}

/* ==========================================================================
   Toasts & Helpers
   ========================================================================== */
function showToast(msg, type = 'info') {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 250);
  }, 2200);
}

function formatTimeAgo(timestamp) {
  if (!timestamp) return 'Just now';
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function linkifyText(str) {
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  return str.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
}
