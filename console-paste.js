// ===== WhatsApp Spam Filtr — console-paste.js =====
// Paste this entire script into Safari/Chrome JavaScript Console on web.whatsapp.com

// Inject CSS
(function(){var css=`/* ===== Toggle Button ===== */
#wsf-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99999;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #25d366;
  color: #fff;
  font-size: 24px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}
#wsf-toggle-btn:hover {
  transform: scale(1.1);
}

/* ===== Pulse Animation ===== */
@keyframes wsf-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
  50% { box-shadow: 0 0 0 16px rgba(37, 211, 102, 0); }
}
.wsf-pulse {
  animation: wsf-pulse 2s infinite;
}

/* ===== Panel ===== */
#wsf-panel {
  position: fixed;
  top: 60px;
  right: 20px;
  z-index: 99998;
  width: 380px;
  max-height: calc(100vh - 100px);
  background: #1f2937;
  color: #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  display: none;
  flex-direction: column;
  overflow: hidden;
}
#wsf-panel.wsf-visible {
  display: flex;
}

/* ===== Header ===== */
#wsf-panel-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: #111827;
  border-bottom: 1px solid #374151;
}
#wsf-panel-header h2 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #25d366;
  white-space: nowrap;
}
#wsf-group-name {
  flex: 1;
  font-size: 12px;
  color: #9ca3af;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== Notification ===== */
.wsf-notification {
  padding: 10px 14px;
  background: rgba(37, 211, 102, 0.08);
  border-bottom: 1px solid #374151;
  display: flex;
  align-items: center;
  gap: 8px;
}
.wsf-notification.wsf-hidden {
  display: none;
}
#wsf-notif-text {
  flex: 1;
  font-size: 12px;
}
.wsf-notification .wsf-btn {
  font-size: 12px;
  padding: 5px 10px;
}

/* ===== Tabs ===== */
.wsf-tabs {
  display: flex;
  background: #111827;
  border-bottom: 1px solid #374151;
}
.wsf-tab {
  flex: 1;
  padding: 10px 8px;
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 12px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: 0.2s;
}
.wsf-tab:hover {
  color: #e5e7eb;
}
.wsf-tab.wsf-tab-active {
  color: #25d366;
  border-bottom-color: #25d366;
}

/* ===== Tab Content ===== */
.wsf-tab-content {
  display: none;
  padding: 14px 16px;
  overflow-y: auto;
  flex: 1;
}
.wsf-tab-content.wsf-tab-active {
  display: block;
}

/* ===== Sections ===== */
.wsf-section {
  margin-bottom: 16px;
}
.wsf-section-title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #9ca3af;
  margin-bottom: 8px;
}

/* ===== Switch ===== */
.wsf-switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.wsf-switch {
  position: relative;
  width: 40px;
  height: 22px;
}
.wsf-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.wsf-switch-slider {
  position: absolute;
  inset: 0;
  background: #4b5563;
  border-radius: 22px;
  cursor: pointer;
  transition: 0.2s;
}
.wsf-switch-slider::before {
  content: '';
  position: absolute;
  left: 3px;
  top: 3px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
}
.wsf-switch input:checked + .wsf-switch-slider {
  background: #25d366;
}
.wsf-switch input:checked + .wsf-switch-slider::before {
  transform: translateX(18px);
}

/* ===== Inputs ===== */
.wsf-input-row {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}
.wsf-input {
  flex: 1;
  padding: 7px 10px;
  background: #374151;
  border: 1px solid #4b5563;
  border-radius: 6px;
  color: #e5e7eb;
  font-size: 13px;
  outline: none;
}
.wsf-input:focus {
  border-color: #25d366;
}
textarea.wsf-input {
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
}

/* ===== Buttons ===== */
.wsf-btn {
  padding: 7px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: opacity 0.2s;
}
.wsf-btn:hover {
  opacity: 0.85;
}
.wsf-btn-green {
  background: #25d366;
  color: #fff;
}
.wsf-btn-red {
  background: #ef4444;
  color: #fff;
}
.wsf-btn-orange {
  background: #f59e0b;
  color: #fff;
}
.wsf-btn-gray {
  background: #4b5563;
  color: #e5e7eb;
}

/* ===== Tags ===== */
.wsf-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
.wsf-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #374151;
  border-radius: 4px;
  font-size: 12px;
}
.wsf-tag-remove {
  cursor: pointer;
  color: #ef4444;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
}

/* ===== Stats ===== */
.wsf-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
}
.wsf-stat-box {
  background: #111827;
  border-radius: 6px;
  padding: 10px;
  text-align: center;
}
.wsf-stat-num {
  font-size: 22px;
  font-weight: 700;
  color: #25d366;
}
.wsf-stat-label {
  font-size: 10px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* ===== Log ===== */
#wsf-log {
  max-height: 250px;
  overflow-y: auto;
  background: #111827;
  border-radius: 6px;
  padding: 8px;
  font-family: monospace;
  font-size: 11px;
  line-height: 1.5;
}
#wsf-log:empty::before {
  content: 'Zatím žádná aktivita...';
  color: #6b7280;
  font-style: italic;
}
.wsf-log-entry {
  padding: 2px 0;
  border-bottom: 1px solid #1f2937;
}
.wsf-log-time {
  color: #6b7280;
  margin-right: 6px;
}
.wsf-log-spam {
  color: #ef4444;
}
.wsf-log-profanity {
  color: #f59e0b;
}
.wsf-log-ok {
  color: #25d366;
}
.wsf-log-info {
  color: #60a5fa;
}
.wsf-log-warn {
  color: #eab308;
}

/* ===== AI Response ===== */
#wsf-ai-response {
  background: #111827;
  border-radius: 6px;
  padding: 10px;
  margin: 8px 0;
  border-left: 3px solid #25d366;
  white-space: pre-wrap;
  font-size: 12px;
  max-height: 200px;
  overflow-y: auto;
}
#wsf-ai-response:empty {
  display: none;
}

/* ===== Message Flagging ===== */
.wsf-flagged-spam {
  outline: 2px solid #ef4444 !important;
  outline-offset: -2px;
  opacity: 0.5;
  transition: 0.3s;
}
.wsf-flagged-profanity {
  outline: 2px solid #f59e0b !important;
  outline-offset: -2px;
  opacity: 0.6;
  transition: 0.3s;
}
.wsf-flagged-timed {
  outline: 2px solid #eab308 !important;
  outline-offset: -2px;
  opacity: 0.7;
  transition: 0.3s;
}

/* ===== Scrollbar ===== */
#wsf-panel *::-webkit-scrollbar {
  width: 6px;
}
#wsf-panel *::-webkit-scrollbar-track {
  background: transparent;
}
#wsf-panel *::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}
#wsf-panel *::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* ===== Utility ===== */
.wsf-hidden {
  display: none !important;
}
.wsf-full-width {
  width: 100%;
}
.wsf-section small {
  color: #6b7280;
  font-size: 11px;
}
select.wsf-input {
  appearance: none;
  -webkit-appearance: none;
  background: #374151 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%239ca3af'/%3E%3C/svg%3E") no-repeat right 10px center;
  padding-right: 28px;
  cursor: pointer;
}
#wsf-clear-chat {
  margin-top: 8px;
  font-weight: 600;
}
`;var style=document.createElement("style");style.textContent=css;document.head.appendChild(style);})();

// Load main script
// ===== WhatsApp Spam Filtr — content.js =====
// Vanilla JS, žádné závislosti. Běží na web.whatsapp.com.
// Každá destruktivní akce vyžaduje potvrzení uživatele.

(function () {
  'use strict';

  // ── Konfigurace ────────────────────────────────────────────
  const DEFAULT_CONFIG = {
    groups: {},
    global: {
      enabled: false,
      deleteForEveryone: true,
      notifyOnActivation: true,
      spamKeywords: [],
      blockLinks: false,
      blockForwarded: false,
      maxRepeat: 0,
      profanityEnabled: true,
      profanityWords: [
        'kurva','píča','kokot','debil','hovno','prdel','čurák','zmrd',
        'sráč','hajzl','mrdka','zasraný','zkurvený','piča','doprdele',
        'posrat','pojeb','kráva'
      ],
      customProfanity: [],
      timedDeleteEnabled: false,
      timedDeleteMinutes: 60,
      scanIntervalMinutes: 60,
      aiEnabled: false,
      aiEndpoint: 'http://localhost:11434',
      aiModel: 'llama3.2',
      deleteBatchDelay: 3500,
      notifyVia: 'ui',       // 'ui' | 'email' | 'both'
      notifyEmail: '',
    }
  };

  var config;
  var stats = { spam: 0, profanity: 0, timed: 0, deleted: 0 };
  var flaggedMessages = [];
  var repeatMap = {};
  var observer = null;
  var scanInterval = null;
  var notifCallback = null;

  // ── LocalStorage ───────────────────────────────────────────
  function loadConfig() {
    try {
      var raw = JSON.parse(localStorage.getItem('wsf_config'));
      config = {
        groups: (raw && raw.groups) || {},
        global: Object.assign({}, DEFAULT_CONFIG.global, raw && raw.global)
      };
    } catch (e) {
      config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    }
  }

  function saveConfig() {
    localStorage.setItem('wsf_config', JSON.stringify(config));
  }

  function loadStats() {
    try {
      var raw = JSON.parse(localStorage.getItem('wsf_stats'));
      if (raw) stats = Object.assign(stats, raw);
    } catch (e) { /* default */ }
  }

  function saveStats() {
    localStorage.setItem('wsf_stats', JSON.stringify(stats));
  }

  // ── Pomocné funkce ─────────────────────────────────────────
  function sleep(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  function escapeHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function simpleHash(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) {
      h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    }
    return h;
  }

  function getCurrentGroupName() {
    var el = document.querySelector('#main header span[title]');
    if (el) return el.title;
    var el2 = document.querySelector('#main header [data-testid="conversation-info-header"] span');
    return el2 ? el2.textContent : '';
  }

  function getMessages() {
    var main = document.querySelector('#main');
    if (!main) return [];
    return main.querySelectorAll('[data-id]');
  }

  function getMessageText(el) {
    var s = el.querySelector('span.selectable-text');
    return s ? s.innerText : '';
  }

  function isOutgoing(el) {
    return !!(el.closest('.message-out') || el.classList.contains('message-out'));
  }

  function isForwarded(el) {
    var spans = el.querySelectorAll('span');
    for (var i = 0; i < spans.length; i++) {
      var t = (spans[i].innerText || '').toLowerCase();
      if (t === 'forwarded' || t === 'přeposláno') return true;
    }
    return false;
  }

  // ── Detekce spamu ──────────────────────────────────────────
  function checkSpam(text, el) {
    if (!text) return false;
    var lower = text.toLowerCase();

    var kws = config.global.spamKeywords;
    for (var i = 0; i < kws.length; i++) {
      if (lower.indexOf(kws[i].toLowerCase()) !== -1) {
        return 'klíčové slovo: ' + kws[i];
      }
    }

    if (config.global.blockLinks && /https?:\/\/\S+|www\.\S+/i.test(text)) {
      return 'odkaz';
    }

    if (config.global.blockForwarded && isForwarded(el)) {
      return 'přeposlaná zpráva';
    }

    if (config.global.maxRepeat > 0) {
      var h = simpleHash(lower.trim());
      repeatMap[h] = (repeatMap[h] || 0) + 1;
      if (repeatMap[h] > config.global.maxRepeat) {
        return 'opakování (' + repeatMap[h] + '×)';
      }
    }

    return false;
  }

  // ── Detekce sprostých slov ─────────────────────────────────
  function checkProfanity(text) {
    if (!config.global.profanityEnabled || !text) return false;
    var allWords = config.global.profanityWords.concat(config.global.customProfanity);
    var lower = text.toLowerCase();
    var tokens = lower.split(/[\s,.!?;:()[\]{}„""]+/);

    for (var w = 0; w < allWords.length; w++) {
      var word = allWords[w].toLowerCase();
      for (var t = 0; t < tokens.length; t++) {
        if (tokens[t] === word || (tokens[t].length > 3 && tokens[t].indexOf(word) !== -1)) {
          return allWords[w];
        }
      }
    }
    return false;
  }

  // ── Detekce starých zpráv ──────────────────────────────────
  function checkTimed(el) {
    if (!config.global.timedDeleteEnabled) return false;
    var spans = el.querySelectorAll('span');
    for (var i = 0; i < spans.length; i++) {
      var m = (spans[i].textContent || '').match(/(\d{1,2}):(\d{2})/);
      if (m) {
        var now = new Date();
        var msgTime = new Date();
        msgTime.setHours(parseInt(m[1], 10), parseInt(m[2], 10), 0, 0);
        if (msgTime > now) msgTime.setDate(msgTime.getDate() - 1);
        var diffMin = (now - msgTime) / 60000;
        if (diffMin > config.global.timedDeleteMinutes) return true;
      }
    }
    return false;
  }

  // ── Flagování zpráv ────────────────────────────────────────
  function flagMessage(el, reason, type) {
    for (var i = 0; i < flaggedMessages.length; i++) {
      if (flaggedMessages[i].el === el) return;
    }
    flaggedMessages.push({ el: el, reason: reason, type: type });
    el.classList.add('wsf-flagged-' + type);
    stats[type] = (stats[type] || 0) + 1;
    saveStats();
    updateStatsUI();
  }

  function clearFlags() {
    for (var i = 0; i < flaggedMessages.length; i++) {
      var el = flaggedMessages[i].el;
      el.classList.remove('wsf-flagged-spam', 'wsf-flagged-profanity', 'wsf-flagged-timed');
    }
    flaggedMessages = [];
  }

  function updateNotification() {
    var n = flaggedMessages.length;
    if (n > 0) {
      var via = config.global.notifyVia;
      // UI notifikace
      if (via === 'ui' || via === 'both') {
        showNotification(
          '🛡️ Nalezeno ' + n + ' zpráv ke smazání',
          'Smazat (' + n + ')',
          function () { deleteBatch(); }
        );
      }
      // E-mail notifikace
      if (via === 'email' || via === 'both') {
        var group = getCurrentGroupName() || 'neznámá';
        var reasons = flaggedMessages.map(function (f) { return '• ' + f.reason; }).join('\n');
        sendEmailNotification(
          n + ' zpráv ke smazání ve skupině ' + group,
          'Skupina: ' + group + '\nPočet: ' + n + '\n\nDůvody:\n' + reasons
        );
      }
      var btn = document.getElementById('wsf-toggle-btn');
      if (btn) btn.classList.add('wsf-pulse');
    } else {
      hideNotification();
      var btn2 = document.getElementById('wsf-toggle-btn');
      if (btn2) btn2.classList.remove('wsf-pulse');
    }
  }

  // ── Mazání zpráv (po potvrzení uživatelem) ─────────────────
  function deleteOneMessage(el) {
    return new Promise(function (resolve) {
      (async function () {
        try {
          el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
          await sleep(300);

          var menuBtn = el.querySelector('[data-icon="down-context"]') ||
            el.querySelector('[data-testid="icon-down-context"]');
          if (!menuBtn) { log('⚠️ Menu nenalezeno', 'warn'); resolve(false); return; }
          menuBtn.click();
          await sleep(400);

          var deleteOpt = null;
          var items = document.querySelectorAll('li, div[role="button"], span[role="button"]');
          for (var i = 0; i < items.length; i++) {
            var txt = (items[i].textContent || '').toLowerCase();
            if (txt.indexOf('smazat') !== -1 || txt.indexOf('delete') !== -1 || txt.indexOf('odstranit') !== -1) {
              deleteOpt = items[i];
              break;
            }
          }
          if (!deleteOpt) {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            log('⚠️ Volba "Smazat" nenalezena', 'warn');
            resolve(false);
            return;
          }
          deleteOpt.click();
          await sleep(500);

          var confirmBtn = null;
          var target = config.global.deleteForEveryone ? /pro všechny|for everyone/i : /pro mě|for me/i;
          var btns = document.querySelectorAll('button, div[role="button"]');
          for (var j = 0; j < btns.length; j++) {
            if (target.test(btns[j].textContent || '')) {
              confirmBtn = btns[j];
              break;
            }
          }
          if (!confirmBtn) {
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            log('⚠️ Potvrzení nenalezeno', 'warn');
            resolve(false);
            return;
          }
          confirmBtn.click();
          await sleep(300);
          resolve(true);
        } catch (e) {
          log('❌ Chyba mazání: ' + e.message, 'warn');
          resolve(false);
        }
      })();
    });
  }

  async function deleteBatch() {
    var items = flaggedMessages.slice();
    showNotification('⏳ Mažu ' + items.length + ' zpráv...', null, null);
    var deleted = 0;

    for (var i = 0; i < items.length; i++) {
      if (!document.contains(items[i].el)) continue;
      var ok = await deleteOneMessage(items[i].el);
      if (ok) {
        deleted++;
        stats.deleted++;
        log('🗑️ Smazáno: ' + items[i].reason, 'ok');
      }
      await sleep(config.global.deleteBatchDelay + Math.random() * 1500);
    }

    clearFlags();
    saveStats();
    updateStatsUI();
    showNotification('✅ Smazáno ' + deleted + ' zpráv', null, null);
    log('✅ Dávka hotová: ' + deleted + '/' + items.length, 'ok');
    setTimeout(hideNotification, 3000);
  }

  // ── Skenování ──────────────────────────────────────────────
  function scanChat() {
    clearFlags();
    repeatMap = {};
    var msgs = getMessages();
    var count = 0;

    for (var i = 0; i < msgs.length; i++) {
      var el = msgs[i];
      if (isOutgoing(el)) continue;

      var text = getMessageText(el);

      var spamReason = checkSpam(text, el);
      if (spamReason) { flagMessage(el, spamReason, 'spam'); count++; continue; }

      var profWord = checkProfanity(text);
      if (profWord) { flagMessage(el, 'sprosté slovo: ' + profWord, 'profanity'); count++; continue; }

      if (checkTimed(el)) { flagMessage(el, 'starší než ' + config.global.timedDeleteMinutes + ' min', 'timed'); count++; }
    }

    updateNotification();
    log('🔍 Sken: ' + count + ' nalezeno z ' + msgs.length + ' zpráv', count > 0 ? 'warn' : 'info');
  }

  function startObserver() {
    if (observer) observer.disconnect();

    var container = document.querySelector('#main [role="application"]') ||
      document.querySelector('#main .copyable-area') ||
      document.querySelector('#main');
    if (!container) { setTimeout(startObserver, 2000); return; }

    observer = new MutationObserver(function (mutations) {
      if (!config.global.enabled) return;
      for (var m = 0; m < mutations.length; m++) {
        var added = mutations[m].addedNodes;
        for (var n = 0; n < added.length; n++) {
          if (added[n].nodeType !== 1) continue;
          var node = added[n];
          var msgs = [];
          if (node.matches && node.matches('[data-id]')) msgs.push(node);
          if (node.querySelectorAll) {
            var found = node.querySelectorAll('[data-id]');
            for (var f = 0; f < found.length; f++) msgs.push(found[f]);
          }
          for (var k = 0; k < msgs.length; k++) {
            var el = msgs[k];
            if (isOutgoing(el)) continue;
            var text = getMessageText(el);
            var spam = checkSpam(text, el);
            if (spam) { flagMessage(el, spam, 'spam'); updateNotification(); continue; }
            var prof = checkProfanity(text);
            if (prof) { flagMessage(el, 'sprosté: ' + prof, 'profanity'); updateNotification(); continue; }
            if (checkTimed(el)) { flagMessage(el, 'staré', 'timed'); updateNotification(); }
          }
        }
      }
    });

    observer.observe(container, { childList: true, subtree: true });
    log('👁️ Sledování chatu aktivní', 'ok');
  }

  function startPeriodicScan() {
    if (scanInterval) clearInterval(scanInterval);
    var mins = config.global.scanIntervalMinutes || 60;
    scanInterval = setInterval(function () {
      if (config.global.enabled) scanChat();
    }, mins * 60 * 1000);
    log('⏱️ Periodický sken: každých ' + mins + ' min', 'info');
  }

  function watchChatSwitch() {
    var main = document.querySelector('#main');
    if (!main) { setTimeout(watchChatSwitch, 2000); return; }

    new MutationObserver(function () {
      clearFlags();
      repeatMap = {};
      updateGroupNameUI();
      if (config.global.enabled) setTimeout(startObserver, 500);
    }).observe(main, { childList: true });
  }

  // ── AI (Ollama) ────────────────────────────────────────────
  async function askAI(question) {
    var name = getCurrentGroupName();
    var prompt = 'Jsi pomocník WhatsApp skupiny "' + name + '". Odpověz česky a stručně na: ' + question;
    try {
      var res = await fetch(config.global.aiEndpoint + '/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: config.global.aiModel, prompt: prompt, stream: false })
      });
      var data = await res.json();
      return data.response || 'Žádná odpověď';
    } catch (e) {
      return '❌ Chyba: ' + e.message + '. Je Ollama spuštěný?';
    }
  }

  // ── Příprava textu do schránky (žádné auto-odesílání) ────────
  // WhatsApp ToS zakazuje auto-messaging. Proto text pouze zkopírujeme
  // do schránky a uživatel ho vloží a odešle sám.
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      log('📋 Text zkopírován do schránky — vlož ho do chatu ručně (Ctrl+V)', 'ok');
      return true;
    } catch (e) {
      // Fallback
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      log('📋 Text zkopírován — vlož ho do chatu ručně (⌘V)', 'ok');
      return true;
    }
  }

  // ── Smazání celého chatu (po potvrzení) ─────────────────────
  async function clearEntireChat() {
    var msgs = getMessages();
    var toDelete = [];
    for (var i = 0; i < msgs.length; i++) {
      toDelete.push(msgs[i]);
    }
    if (toDelete.length === 0) {
      log('ℹ️ Chat je prázdný', 'info');
      return;
    }
    showNotification('⏳ Mažu ' + toDelete.length + ' zpráv z chatu...', null, null);
    var deleted = 0;
    for (var j = 0; j < toDelete.length; j++) {
      if (!document.contains(toDelete[j])) continue;
      var ok = await deleteOneMessage(toDelete[j]);
      if (ok) {
        deleted++;
        stats.deleted++;
      }
      await sleep(config.global.deleteBatchDelay + Math.random() * 1500);
    }
    saveStats();
    updateStatsUI();
    showNotification('✅ Chat vymazán: ' + deleted + ' zpráv', null, null);
    log('🧹 Chat vymazán: ' + deleted + ' zpráv', 'ok');
    setTimeout(hideNotification, 3000);
  }

  // ── E-mailové notifikace ───────────────────────────────────
  function sendEmailNotification(subject, body) {
    var email = config.global.notifyEmail;
    if (!email) { log('⚠️ E-mail není nastaven', 'warn'); return; }
    var mailto = 'mailto:' + encodeURIComponent(email) +
      '?subject=' + encodeURIComponent('[WSF] ' + subject) +
      '&body=' + encodeURIComponent(body);
    window.open(mailto, '_blank');
    log('📧 E-mail notifikace připravena', 'info');
  }

  // ── Nastavení skupiny (pouze kopírování do schránky) ─────────
  // WhatsApp ToS zakazuje automatickou modifikaci služby.
  // Název/popis zkopírujeme do schránky — uživatel změní ručně.
  async function changeGroupName(newName) {
    await copyToClipboard(newName);
    showNotification('📋 Název "' + newName + '" zkopírován — klikni na hlavičku skupiny a vlož ručně', null, null);
    setTimeout(hideNotification, 5000);
  }

  async function changeGroupDescription(desc) {
    await copyToClipboard(desc);
    showNotification('📋 Popis zkopírován — otevři info skupiny a vlož ručně', null, null);
    setTimeout(hideNotification, 5000);
  }

  // ── Notifikace v panelu ────────────────────────────────────
  function showNotification(text, actionLabel, callback) {
    var bar = document.getElementById('wsf-notification');
    var txt = document.getElementById('wsf-notif-text');
    var btn = document.getElementById('wsf-notif-action');
    if (!bar) return;
    txt.textContent = text;
    if (actionLabel && callback) {
      btn.textContent = actionLabel;
      btn.style.display = '';
      notifCallback = callback;
    } else {
      btn.style.display = 'none';
      notifCallback = null;
    }
    bar.classList.remove('wsf-hidden');
  }

  function hideNotification() {
    var bar = document.getElementById('wsf-notification');
    if (bar) bar.classList.add('wsf-hidden');
    notifCallback = null;
  }

  // ── Logování ───────────────────────────────────────────────
  function log(msg, type) {
    type = type || 'info';
    var el = document.getElementById('wsf-log');
    if (!el) { console.log('[WSF]', msg); return; }
    var t = new Date().toLocaleTimeString('cs-CZ');
    var entry = document.createElement('div');
    entry.className = 'wsf-log-entry';
    entry.innerHTML = '<span class="wsf-log-time">' + t + '</span>' +
      '<span class="wsf-log-' + type + '">' + escapeHtml(msg) + '</span>';
    el.prepend(entry);
    while (el.children.length > 200) el.lastChild.remove();
    console.log('[WSF]', msg);
  }

  // ── UI: pomocné funkce ─────────────────────────────────────
  function updateGroupNameUI() {
    var name = getCurrentGroupName() || '–';
    var el = document.getElementById('wsf-group-name');
    var gn = document.getElementById('wsf-current-group');
    if (el) el.textContent = name;
    if (gn) gn.textContent = name;
  }

  function updateStatsUI() {
    var map = { spam: 'wsf-stat-spam', profanity: 'wsf-stat-prof', timed: 'wsf-stat-timed', deleted: 'wsf-stat-deleted' };
    for (var key in map) {
      var el = document.getElementById(map[key]);
      if (el) el.textContent = stats[key] || 0;
    }
  }

  function renderTags(containerId, items, arrayRef, arrayKey) {
    var c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = items.map(function (w, i) {
      return '<span class="wsf-tag">' + escapeHtml(w) +
        '<span class="wsf-tag-remove" data-i="' + i + '">×</span></span>';
    }).join('');
    c.querySelectorAll('.wsf-tag-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.dataset.i, 10);
        arrayRef[arrayKey].splice(idx, 1);
        saveConfig();
        renderTags(containerId, arrayRef[arrayKey], arrayRef, arrayKey);
      });
    });
  }

  // ── UI: vytvoření panelu ───────────────────────────────────
  function createPanel() {
    var toggle = document.createElement('button');
    toggle.id = 'wsf-toggle-btn';
    toggle.textContent = '🛡️';
    toggle.title = 'WhatsApp Spam Filtr';
    document.body.appendChild(toggle);

    var panel = document.createElement('div');
    panel.id = 'wsf-panel';
    panel.innerHTML =
      '<div id="wsf-panel-header">' +
        '<h2>🛡️ Spam Filtr</h2>' +
        '<span id="wsf-group-name">–</span>' +
        '<button class="wsf-btn wsf-btn-gray" id="wsf-close-btn">✕</button>' +
      '</div>' +

      '<div id="wsf-notification" class="wsf-notification wsf-hidden">' +
        '<span id="wsf-notif-text"></span>' +
        '<button class="wsf-btn wsf-btn-green" id="wsf-notif-action" style="display:none"></button>' +
        '<button class="wsf-btn wsf-btn-gray" id="wsf-notif-dismiss">✕</button>' +
      '</div>' +

      '<div class="wsf-tabs">' +
        '<button class="wsf-tab wsf-tab-active" data-tab="settings">Nastavení</button>' +
        '<button class="wsf-tab" data-tab="group">Skupina</button>' +
        '<button class="wsf-tab" data-tab="ai">AI</button>' +
        '<button class="wsf-tab" data-tab="log">Log</button>' +
      '</div>' +

      // Tab: Nastavení
      '<div class="wsf-tab-content wsf-tab-active" data-tab="settings">' +
        '<div class="wsf-section">' +
          '<div class="wsf-section-title">Hlavní</div>' +
          '<div class="wsf-switch-row"><span>Filtr aktivní</span><label class="wsf-switch"><input type="checkbox" id="wsf-enabled"><span class="wsf-switch-slider"></span></label></div>' +
          '<div class="wsf-switch-row"><span>Smazat pro všechny</span><label class="wsf-switch"><input type="checkbox" id="wsf-delete-everyone"><span class="wsf-switch-slider"></span></label></div>' +
          '<div class="wsf-switch-row"><span>Oznámení při aktivaci</span><label class="wsf-switch"><input type="checkbox" id="wsf-notify-activation"><span class="wsf-switch-slider"></span></label></div>' +
        '</div>' +

        '<div class="wsf-section">' +
          '<div class="wsf-section-title">Kam posílat upozornění</div>' +
          '<div class="wsf-switch-row"><span>Způsob</span><select class="wsf-input" id="wsf-notify-via" style="width:120px;flex:none"><option value="ui">Jen UI</option><option value="email">Jen e-mail</option><option value="both">UI + e-mail</option></select></div>' +
          '<div class="wsf-input-row"><input type="email" class="wsf-input" id="wsf-notify-email" placeholder="tvuj@email.cz"></div>' +
        '</div>' +

        '<div class="wsf-section">' +
          '<div class="wsf-section-title">Spam filtr</div>' +
          '<div class="wsf-input-row"><input type="text" class="wsf-input" id="wsf-kw-input" placeholder="Klíčové slovo…"><button class="wsf-btn wsf-btn-green" id="wsf-kw-add">+</button></div>' +
          '<div class="wsf-tags" id="wsf-kw-tags"></div>' +
          '<div class="wsf-switch-row" style="margin-top:8px"><span>Blokovat odkazy</span><label class="wsf-switch"><input type="checkbox" id="wsf-block-links"><span class="wsf-switch-slider"></span></label></div>' +
          '<div class="wsf-switch-row"><span>Blokovat přeposílané</span><label class="wsf-switch"><input type="checkbox" id="wsf-block-fwd"><span class="wsf-switch-slider"></span></label></div>' +
          '<div class="wsf-switch-row"><span>Max opakování (0=vyp)</span><input type="number" class="wsf-input" id="wsf-max-repeat" min="0" max="99" style="width:60px;text-align:center"></div>' +
        '</div>' +

        '<div class="wsf-section">' +
          '<div class="wsf-section-title">Sprostá slova</div>' +
          '<div class="wsf-switch-row"><span>Filtr aktivní</span><label class="wsf-switch"><input type="checkbox" id="wsf-prof-enabled"><span class="wsf-switch-slider"></span></label></div>' +
          '<div class="wsf-input-row"><input type="text" class="wsf-input" id="wsf-prof-input" placeholder="Vlastní slovo…"><button class="wsf-btn wsf-btn-green" id="wsf-prof-add">+</button></div>' +
          '<div class="wsf-tags" id="wsf-prof-tags"></div>' +
          '<small>+ ' + DEFAULT_CONFIG.global.profanityWords.length + ' vestavěných slov</small>' +
        '</div>' +

        '<div class="wsf-section">' +
          '<div class="wsf-section-title">Časované mazání</div>' +
          '<div class="wsf-switch-row"><span>Aktivní</span><label class="wsf-switch"><input type="checkbox" id="wsf-timed-enabled"><span class="wsf-switch-slider"></span></label></div>' +
          '<div class="wsf-switch-row"><span>Starší než (min)</span><input type="number" class="wsf-input" id="wsf-timed-minutes" min="1" style="width:80px;text-align:center"></div>' +
        '</div>' +

        '<div class="wsf-section">' +
          '<div class="wsf-section-title">Interval kontroly</div>' +
          '<div class="wsf-switch-row"><span>Každých (min)</span><input type="number" class="wsf-input" id="wsf-scan-interval" min="1" style="width:80px;text-align:center"></div>' +
          '<button class="wsf-btn wsf-btn-green wsf-full-width" id="wsf-scan-now">🔍 Skenovat teď</button>' +
        '</div>' +

        '<div class="wsf-section">' +
          '<div class="wsf-section-title">Statistiky</div>' +
          '<div class="wsf-stats">' +
            '<div class="wsf-stat-box"><div class="wsf-stat-num" id="wsf-stat-spam">0</div><div class="wsf-stat-label">Spam</div></div>' +
            '<div class="wsf-stat-box"><div class="wsf-stat-num" id="wsf-stat-prof">0</div><div class="wsf-stat-label">Sprostá</div></div>' +
            '<div class="wsf-stat-box"><div class="wsf-stat-num" id="wsf-stat-timed">0</div><div class="wsf-stat-label">Časované</div></div>' +
            '<div class="wsf-stat-box"><div class="wsf-stat-num" id="wsf-stat-deleted">0</div><div class="wsf-stat-label">Smazáno</div></div>' +
          '</div>' +
          '<button class="wsf-btn wsf-btn-gray wsf-full-width" id="wsf-reset-stats" style="margin-top:8px">Reset statistik</button>' +
        '</div>' +
      '</div>' +

      // Tab: Skupina
      '<div class="wsf-tab-content" data-tab="group">' +
        '<div class="wsf-section">' +
          '<div class="wsf-section-title">Aktuální skupina</div>' +
          '<p style="margin:0 0 12px">Skupina: <strong id="wsf-current-group">–</strong></p>' +
          '<div class="wsf-section-title">Změnit název</div>' +
          '<div class="wsf-input-row"><input type="text" class="wsf-input" id="wsf-grp-name" placeholder="Nový název…"><button class="wsf-btn wsf-btn-green" id="wsf-grp-name-btn">📋 Kopírovat</button></div>' +
          '<div class="wsf-section-title" style="margin-top:12px">Popis skupiny</div>' +
          '<textarea class="wsf-input" id="wsf-grp-desc" rows="3" placeholder="Nový popis…"></textarea>' +
          '<button class="wsf-btn wsf-btn-green wsf-full-width" id="wsf-grp-desc-btn" style="margin-top:6px">📋 Kopírovat popis</button>' +
          '<div class="wsf-section-title" style="margin-top:16px">Nebezpečná zóna</div>' +
          '<button class="wsf-btn wsf-btn-red wsf-full-width" id="wsf-clear-chat">🧹 Smazat celý obsah chatu</button>' +
        '</div>' +
      '</div>' +

      // Tab: AI
      '<div class="wsf-tab-content" data-tab="ai">' +
        '<div class="wsf-section">' +
          '<div class="wsf-section-title">AI Asistent (Ollama)</div>' +
          '<div class="wsf-switch-row"><span>AI aktivní</span><label class="wsf-switch"><input type="checkbox" id="wsf-ai-enabled"><span class="wsf-switch-slider"></span></label></div>' +
          '<div class="wsf-input-row"><input type="text" class="wsf-input wsf-full-width" id="wsf-ai-endpoint" placeholder="http://localhost:11434"></div>' +
          '<div class="wsf-input-row"><input type="text" class="wsf-input wsf-full-width" id="wsf-ai-model" placeholder="llama3.2"></div>' +
          '<div class="wsf-section-title" style="margin-top:8px">Otázka</div>' +
          '<textarea class="wsf-input" id="wsf-ai-question" rows="3" placeholder="Na co se chceš zeptat?"></textarea>' +
          '<button class="wsf-btn wsf-btn-green wsf-full-width" id="wsf-ai-ask" style="margin-top:6px">🤖 Zeptat se</button>' +
          '<div id="wsf-ai-response"></div>' +
          '<button class="wsf-btn wsf-btn-green wsf-full-width" id="wsf-ai-send" style="margin-top:6px;display:none">📋 Kopírovat do schránky</button>' +
        '</div>' +
      '</div>' +

      // Tab: Log
      '<div class="wsf-tab-content" data-tab="log">' +
        '<div id="wsf-log"></div>' +
        '<button class="wsf-btn wsf-btn-gray wsf-full-width" id="wsf-clear-log" style="margin-top:8px">Vyčistit log</button>' +
      '</div>';

    document.body.appendChild(panel);
  }

  // ── Event listenery ────────────────────────────────────────
  function setupListeners() {
    // Panel toggle
    document.getElementById('wsf-toggle-btn').addEventListener('click', function () {
      document.getElementById('wsf-panel').classList.toggle('wsf-visible');
    });
    document.getElementById('wsf-close-btn').addEventListener('click', function () {
      document.getElementById('wsf-panel').classList.remove('wsf-visible');
    });

    // Taby
    document.querySelectorAll('.wsf-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('.wsf-tab, .wsf-tab-content').forEach(function (el) {
          el.classList.remove('wsf-tab-active');
        });
        tab.classList.add('wsf-tab-active');
        var content = document.querySelector('.wsf-tab-content[data-tab="' + tab.dataset.tab + '"]');
        if (content) content.classList.add('wsf-tab-active');
      });
    });

    // Notifikace
    document.getElementById('wsf-notif-action').addEventListener('click', function () {
      if (notifCallback) notifCallback();
    });
    document.getElementById('wsf-notif-dismiss').addEventListener('click', hideNotification);

    // Přepínače — jednoduché bindování
    function bindSwitch(id, key) {
      var el = document.getElementById(id);
      el.checked = config.global[key];
      el.addEventListener('change', function () {
        config.global[key] = el.checked;
        saveConfig();
      });
    }
    bindSwitch('wsf-delete-everyone', 'deleteForEveryone');
    bindSwitch('wsf-notify-activation', 'notifyOnActivation');
    bindSwitch('wsf-block-links', 'blockLinks');
    bindSwitch('wsf-block-fwd', 'blockForwarded');
    bindSwitch('wsf-prof-enabled', 'profanityEnabled');
    bindSwitch('wsf-timed-enabled', 'timedDeleteEnabled');
    bindSwitch('wsf-ai-enabled', 'aiEnabled');

    // Hlavní přepínač — speciální logika
    var enabledEl = document.getElementById('wsf-enabled');
    enabledEl.checked = config.global.enabled;
    enabledEl.addEventListener('change', function () {
      config.global.enabled = enabledEl.checked;
      saveConfig();
      if (config.global.enabled) {
        startObserver();
        startPeriodicScan();
        log('✅ Filtr zapnut', 'ok');
        if (config.global.notifyOnActivation) {
          showNotification('Zkopírovat oznámení do schránky?', '📋 Kopírovat', function () {
            copyToClipboard('🛡️ V této skupině je aktivní Spam Filtr pro moderaci obsahu.');
            hideNotification();
          });
        }
      } else {
        if (observer) observer.disconnect();
        if (scanInterval) clearInterval(scanInterval);
        log('⏸️ Filtr vypnut', 'warn');
      }
    });

    // Číselné inputy
    function bindNumber(id, key) {
      var el = document.getElementById(id);
      el.value = config.global[key];
      el.addEventListener('change', function () {
        config.global[key] = parseInt(el.value, 10) || 0;
        saveConfig();
      });
    }
    bindNumber('wsf-max-repeat', 'maxRepeat');
    bindNumber('wsf-timed-minutes', 'timedDeleteMinutes');
    bindNumber('wsf-scan-interval', 'scanIntervalMinutes');

    // Textové inputy (AI)
    function bindText(id, key) {
      var el = document.getElementById(id);
      el.value = config.global[key] || '';
      el.addEventListener('change', function () {
        config.global[key] = el.value;
        saveConfig();
      });
    }
    bindText('wsf-ai-endpoint', 'aiEndpoint');
    bindText('wsf-ai-model', 'aiModel');

    // Klíčová slova
    function addKeyword() {
      var input = document.getElementById('wsf-kw-input');
      var v = input.value.trim();
      if (!v || config.global.spamKeywords.indexOf(v) !== -1) return;
      config.global.spamKeywords.push(v);
      saveConfig();
      input.value = '';
      renderTags('wsf-kw-tags', config.global.spamKeywords, config.global, 'spamKeywords');
    }
    document.getElementById('wsf-kw-add').addEventListener('click', addKeyword);
    document.getElementById('wsf-kw-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') addKeyword();
    });

    // Vlastní sprostá slova
    function addProfanity() {
      var input = document.getElementById('wsf-prof-input');
      var v = input.value.trim();
      if (!v || config.global.customProfanity.indexOf(v) !== -1) return;
      config.global.customProfanity.push(v);
      saveConfig();
      input.value = '';
      renderTags('wsf-prof-tags', config.global.customProfanity, config.global, 'customProfanity');
    }
    document.getElementById('wsf-prof-add').addEventListener('click', addProfanity);
    document.getElementById('wsf-prof-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') addProfanity();
    });

    // Skenovat teď
    document.getElementById('wsf-scan-now').addEventListener('click', scanChat);

    // Reset statistik
    document.getElementById('wsf-reset-stats').addEventListener('click', function () {
      stats = { spam: 0, profanity: 0, timed: 0, deleted: 0 };
      saveStats();
      updateStatsUI();
    });

    // Vyčistit log
    document.getElementById('wsf-clear-log').addEventListener('click', function () {
      document.getElementById('wsf-log').innerHTML = '';
    });

    // Notifikace — způsob + e-mail
    var notifyViaEl = document.getElementById('wsf-notify-via');
    notifyViaEl.value = config.global.notifyVia;
    notifyViaEl.addEventListener('change', function () {
      config.global.notifyVia = notifyViaEl.value;
      saveConfig();
    });
    var notifyEmailEl = document.getElementById('wsf-notify-email');
    notifyEmailEl.value = config.global.notifyEmail || '';
    notifyEmailEl.addEventListener('change', function () {
      config.global.notifyEmail = notifyEmailEl.value.trim();
      saveConfig();
    });

    // Smazat celý chat
    document.getElementById('wsf-clear-chat').addEventListener('click', function () {
      var group = getCurrentGroupName() || 'tento chat';
      showNotification('⚠️ Opravdu smazat CELÝ obsah "' + group + '"?', '🧹 Smazat vše', function () {
        clearEntireChat();
      });
    });

    // Nastavení skupiny — kopírování do schránky
    document.getElementById('wsf-grp-name-btn').addEventListener('click', function () {
      var name = document.getElementById('wsf-grp-name').value.trim();
      if (!name) return;
      changeGroupName(name);
    });
    document.getElementById('wsf-grp-desc-btn').addEventListener('click', function () {
      var desc = document.getElementById('wsf-grp-desc').value.trim();
      if (!desc) return;
      changeGroupDescription(desc);
    });

    // AI
    document.getElementById('wsf-ai-ask').addEventListener('click', async function () {
      var q = document.getElementById('wsf-ai-question').value.trim();
      if (!q) return;
      var resp = document.getElementById('wsf-ai-response');
      var sendBtn = document.getElementById('wsf-ai-send');
      resp.textContent = '⏳ Ptám se AI...';
      resp.style.display = 'block';
      var answer = await askAI(q);
      resp.textContent = answer;
      sendBtn.style.display = 'block';
      log('🤖 AI odpověděla', 'info');
    });

    document.getElementById('wsf-ai-send').addEventListener('click', function () {
      var answer = document.getElementById('wsf-ai-response').textContent;
      if (!answer) return;
      showNotification('Zkopírovat AI odpověď do schránky?', '📋 Kopírovat', function () {
        copyToClipboard(answer);
        document.getElementById('wsf-ai-send').style.display = 'none';
        hideNotification();
      });
    });

    // Prvotní renderování
    renderTags('wsf-kw-tags', config.global.spamKeywords, config.global, 'spamKeywords');
    renderTags('wsf-prof-tags', config.global.customProfanity, config.global, 'customProfanity');
    updateStatsUI();
    updateGroupNameUI();
  }

  // ── Inicializace ───────────────────────────────────────────
  function init() {
    loadConfig();
    loadStats();
    createPanel();
    setupListeners();
    watchChatSwitch();
    if (config.global.enabled) {
      startObserver();
      startPeriodicScan();
    }
    log('🚀 WhatsApp Spam Filtr v1.0 načten', 'info');
  }

  function waitForApp() {
    var app = document.querySelector('#app');
    if (!app || app.querySelector('.landing-wrapper')) {
      setTimeout(waitForApp, 2000);
      return;
    }
    setTimeout(init, 2000);
  }

  if (document.readyState === 'complete') {
    waitForApp();
  } else {
    window.addEventListener('load', waitForApp);
  }

})();
