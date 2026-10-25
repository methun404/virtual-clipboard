import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, remove, update, set } from 'firebase/database';

class SyncService {
  constructor() {
    this.app = null;
    this.db = null;
    this.roomId = this.getStoredRoomId();
    this.isFirebaseConnected = false;
    this.activeListener = null;
    this.clipsRef = null;
    this.onClipsUpdateCallback = null;
    this.broadcastChannel = null;

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.broadcastChannel = new BroadcastChannel('clipsync_room_bus');
      this.broadcastChannel.onmessage = (event) => {
        if (event.data && event.data.roomId === this.roomId) {
          if (this.onClipsUpdateCallback && !this.isFirebaseConnected) {
            this.onClipsUpdateCallback(this.getLocalClips());
          }
        }
      };
    }

    // Initialize either Firebase or Local Mode
    this.init();
  }

  getStoredRoomId() {
    // Check URL param first ?room=CLIP-XXXX
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room');
      if (roomParam && roomParam.trim()) {
        const cleanRoom = roomParam.trim().toUpperCase();
        localStorage.setItem('clipsync_room_id', cleanRoom);
        return cleanRoom;
      }
    }

    const saved = localStorage.getItem('clipsync_room_id');
    if (saved && saved.trim()) return saved.trim();

    // Generate random 6-character clean room code
    const newRoom = 'CLIP-' + Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('clipsync_room_id', newRoom);
    return newRoom;
  }

  setRoomId(newRoomId) {
    if (!newRoomId) return;
    const clean = newRoomId.trim().toUpperCase();
    this.roomId = clean;
    localStorage.setItem('clipsync_room_id', clean);

    // Rebind database listener for new room
    this.bindRoomListener();
  }

  getFirebaseConfig() {
    try {
      const saved = localStorage.getItem('clipsync_firebase_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse Firebase config', e);
    }
    return null;
  }

  saveFirebaseConfig(configObj) {
    localStorage.setItem('clipsync_firebase_config', JSON.stringify(configObj));
    return this.init();
  }

  resetToLocal() {
    localStorage.removeItem('clipsync_firebase_config');
    this.isFirebaseConnected = false;
    this.db = null;
    this.bindRoomListener();
  }

  init() {
    const config = this.getFirebaseConfig();
    if (config && config.apiKey && (config.databaseURL || config.projectId)) {
      try {
        let app;
        if (getApps().length === 0) {
          app = initializeApp(config);
        } else {
          app = getApp();
        }
        this.app = app;
        this.db = getDatabase(app);
        this.isFirebaseConnected = true;
        console.log('[SyncService] Firebase initialized successfully');
      } catch (err) {
        console.error('[SyncService] Firebase initialization error:', err);
        this.isFirebaseConnected = false;
      }
    } else {
      this.isFirebaseConnected = false;
      console.log('[SyncService] Running in Local / In-browser relay mode');
    }

    this.bindRoomListener();
    return this.isFirebaseConnected;
  }

  onClipsUpdate(callback) {
    this.onClipsUpdateCallback = callback;
    // Dispatch immediately with current local or empty state
    if (!this.isFirebaseConnected) {
      callback(this.getLocalClips());
    }
  }

  bindRoomListener() {
    if (this.activeListener && typeof this.activeListener === 'function') {
      this.activeListener(); // Unsubscribe previous
      this.activeListener = null;
    }

    if (this.isFirebaseConnected && this.db) {
      try {
        this.clipsRef = ref(this.db, `rooms/${this.roomId}/clips`);
        const unsubscribe = onValue(this.clipsRef, (snapshot) => {
          const val = snapshot.val();
          const clips = [];
          if (val) {
            Object.keys(val).forEach((key) => {
              clips.push({ id: key, ...val[key] });
            });
          }
          // Sort newest first, with pinned at top
          clips.sort((a, b) => {
            if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
            return (b.timestamp || 0) - (a.timestamp || 0);
          });

          // Sync into local backup
          this.saveLocalClips(clips);

          if (this.onClipsUpdateCallback) {
            this.onClipsUpdateCallback(clips);
          }
        }, (error) => {
          console.error('[SyncService] Firebase onValue error:', error);
          // Fallback to local
          if (this.onClipsUpdateCallback) {
            this.onClipsUpdateCallback(this.getLocalClips());
          }
        });

        this.activeListener = unsubscribe;
        return;
      } catch (err) {
        console.error('[SyncService] Failed to bind Firebase listener:', err);
      }
    }

    // Local / Offline mode fallback
    if (this.onClipsUpdateCallback) {
      this.onClipsUpdateCallback(this.getLocalClips());
    }
  }

  getLocalClips() {
    try {
      const data = localStorage.getItem(`clipsync_local_${this.roomId}`);
      if (data) {
        const parsed = JSON.parse(data);
        return parsed.sort((a, b) => {
          if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
          return (b.timestamp || 0) - (a.timestamp || 0);
        });
      }
    } catch (e) {}
    return [];
  }

  saveLocalClips(clips) {
    try {
      localStorage.setItem(`clipsync_local_${this.roomId}`, JSON.stringify(clips));
    } catch (e) {}
  }

  async addClip(clipData) {
    const item = {
      content: clipData.content || '',
      type: clipData.type || 'text', // 'link', 'code', 'text'
      device: clipData.device || 'Web',
      pinned: false,
      timestamp: Date.now()
    };

    if (this.isFirebaseConnected && this.db && this.clipsRef) {
      try {
        const newRef = push(this.clipsRef);
        await set(newRef, item);
        return { id: newRef.key, ...item };
      } catch (err) {
        console.error('[SyncService] Failed to push to Firebase:', err);
      }
    }

    // Local fallback
    const localId = 'loc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const newClip = { id: localId, ...item };
    const list = this.getLocalClips();
    list.unshift(newClip);
    this.saveLocalClips(list);

    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type: 'ADD', roomId: this.roomId });
    }

    if (this.onClipsUpdateCallback) {
      this.onClipsUpdateCallback(list);
    }

    return newClip;
  }

  async togglePin(clipId, currentPinnedState) {
    const newPinned = !currentPinnedState;

    if (this.isFirebaseConnected && this.db) {
      try {
        const itemRef = ref(this.db, `rooms/${this.roomId}/clips/${clipId}`);
        await update(itemRef, { pinned: newPinned });
        return;
      } catch (err) {
        console.error('[SyncService] Pin update failed in Firebase:', err);
      }
    }

    // Local update
    const list = this.getLocalClips();
    const target = list.find((c) => c.id === clipId);
    if (target) {
      target.pinned = newPinned;
      this.saveLocalClips(list);
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage({ type: 'UPDATE', roomId: this.roomId });
      }
      if (this.onClipsUpdateCallback) {
        this.onClipsUpdateCallback(list);
      }
    }
  }

  async deleteClip(clipId) {
    if (this.isFirebaseConnected && this.db) {
      try {
        const itemRef = ref(this.db, `rooms/${this.roomId}/clips/${clipId}`);
        await remove(itemRef);
        return;
      } catch (err) {
        console.error('[SyncService] Delete failed in Firebase:', err);
      }
    }

    // Local delete
    let list = this.getLocalClips();
    list = list.filter((c) => c.id !== clipId);
    this.saveLocalClips(list);

    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type: 'DELETE', roomId: this.roomId });
    }

    if (this.onClipsUpdateCallback) {
      this.onClipsUpdateCallback(list);
    }
  }

  async clearAll() {
    if (this.isFirebaseConnected && this.db) {
      try {
        // Fetch snapshot and remove unpinned items
        const list = this.getLocalClips();
        for (const item of list) {
          if (!item.pinned) {
            await remove(ref(this.db, `rooms/${this.roomId}/clips/${item.id}`));
          }
        }
        return;
      } catch (err) {
        console.error('[SyncService] Clear failed in Firebase:', err);
      }
    }

    // Local clear (preserve pinned)
    let list = this.getLocalClips();
    list = list.filter((c) => c.pinned);
    this.saveLocalClips(list);

    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({ type: 'CLEAR', roomId: this.roomId });
    }

    if (this.onClipsUpdateCallback) {
      this.onClipsUpdateCallback(list);
    }
  }
}

export const syncService = new SyncService();
