# 🛡️ WhatsApp Spam Filtr

Vlastní nástroj pro moderaci WhatsApp Web skupin. Bookmarklet pro Safari/Chrome. Žádné API, žádné závislosti — čistý vanilla JavaScript.

> ⚠️ **Upozornění:** Tento nástroj využívá DOM manipulaci na web.whatsapp.com, což WhatsApp ToS výslovně nepovoluje. Nástroj **nikdy neodesílá zprávy automaticky** — texty kopíruje do schránky. **Mazání zpráv vyžaduje vaše potvrzení kliknutím.** Žádná data se neodesílají externě. Používání na vlastní riziko.

## ✨ Funkce

- 🚫 **Spam filtr** — detekce podle klíčových slov, odkazů, přeposílaných, opakování → **označí, vy potvrdíte smazání**
- 🤬 **Filtr vulgarismů** — vestavěný seznam + vlastní slova → **označí, vy potvrdíte smazání**
- ⏰ **Časované mazání** — zprávy starší než X minut → **označí, vy potvrdíte smazání**
- 🤖 **AI asistent** — lokální Ollama AI, odpovědi se **zkopírují do schránky** (vy vložíte ručně)
- 🎛️ **Skupina** — název/popis se **zkopíruje do schránky** (vy změníte ručně)
- 📊 **Dashboard** — počítadla (jen čísla, žádná osobní data), log aktivit
- � **Výběr skupiny** — lze vybrat konkrétní skupinu pro moderaci z uloženého seznamu.
- �📧 **Notifikace** — upozornění v UI panelu nebo e-mailem (mailto:)

## ❌ Co nástroj NEDĚLÁ

- **Neodesílá zprávy** — texty kopíruje do schránky, vy je vložíte a odešlete
- **Neukládá obsah zpráv** — zprávy se čtou z DOM jen pro kontrolu, nikam se neukládají
- **Neodesílá data externě** — vše běží lokálně (localStorage + volitelně lokální Ollama)
- **Nemaže automaticky** — každé mazání vyžaduje vaše kliknutí na „Smazat"

## 📥 Instalace

### Předpoklady
- Safari nebo Chrome
- Python 3 (pro lokální server)
- [Ollama](https://ollama.ai) (volitelné, pro AI)

### Kroky
1. `git clone https://github.com/vbtronic/whatsapp_filtr.git && cd whatsapp_filtr`
2. `./serve.sh` (nech běžet v Terminálu)

### Varianta A: Safari (konzole) — doporučeno
WhatsApp Web blokuje externí skripty (CSP), proto se skript vkládá přes konzoli:
1. **Zapni vývojářské funkce:**
   - Safari → Settings (⌘,) → **Advanced**
   - Zaškrtni **„Show features for web developers"**
   - Pokud po aktualizaci macOS nefunguje: odškrtni, zavři Safari (⌘Q), otevři znovu, zaškrtni zpět
2. Otevři **web.whatsapp.com** a přihlas se
3. **Develop** → **Show JavaScript Console** (⌥⌘C)
4. Otevři soubor `console-paste.js`, zkopíruj celý obsah (⌘A, ⌘C)
5. Vlož do konzole (⌘V) a stiskni **Enter**
6. Vpravo dole se objeví zelené 🛡️ — klikni → panel se otevře

> **Pozn.:** Po reloadu stránky je nutné kód vložit znovu.

### Varianta B: Chrome (rozšíření)
1. Otevři `chrome://extensions/`
2. Zapni **Režim pro vývojáře** (přepínač vpravo nahoře)
3. Klikni **Načíst rozbalené rozšíření**
4. Vyber složku `whatsapp_filtr/`
5. Otevři web.whatsapp.com → rozšíření se načte automaticky

> **Chrome výhoda:** Nemusíš klikat bookmarklet po každém reloadu — rozšíření se injektuje automaticky.

## 💻 MacOS Quick Guide (English)
This section is in English for latest macOS users; the surrounding comments are written in Czech.

- Ensure you run `./serve.sh` in project root first (Python 3 local server).
- If you use the bookmarklet from HTTPS WhatsApp Web, the browser may block mixed-content HTTP loads.
- Either use Chrome extension mode (recommended), or set up local HTTPS access for localhost if you choose bookmarklet.
- To run on newest macOS:
  1. `cd whatsapp_filtr && ./serve.sh`
  2. in Safari: enable Develop menu, add a bookmark, set its URL to `bookmarklet.js` code.
  3. in Chrome: use `chrome://extensions/` + load unpacked folder `whatsapp_filtr/`.
  4. open `https://web.whatsapp.com`, activate extension/bookmarklet, and use panel controls.

> NOTE: If WhatsApp blocks script load as "insecure", switch to the extension version or run on `http://localhost:8000` via a non-HTTPS context.

### AI Setup (volitelné)
```bash
brew install ollama
ollama pull llama3.2
# Běží na http://localhost:11434
```

## 🔧 Jak to funguje

1. **MutationObserver** sleduje nové zprávy v otevřeném chatu
2. Kontrola proti filtrům (spam, vulgarismy, čas)
3. Podezřelé zprávy se **označí barevně** (🔴 spam, 🟠 vulgarismy, 🟡 časované)
4. Panel zobrazí „Nalezeno X zpráv" + tlačítko **„Smazat (X)"**
5. **Vy kliknete** → zprávy se smažou s lidskými prodlevami (3–5 s)
6. Periodické skeny v nastavených intervalech (jen detekce, ne mazání)

## 📁 Struktura
```
content.js      — hlavní logika (vanilla JS, IIFE)
panel.css       — styly UI panelu
bookmarklet.js  — bookmarklet pro Safari/Chrome
serve.sh        — lokální dev server (Python 3)
manifest.json   — Chrome extension manifest (alternativa)
docs/index.html — landing page (GitHub Pages)
LICENSE.md      — licence (nekomerční)
AGENTS.md       — instrukce pro AI agenty
```

## 👥 Výběr skupiny k moderaci
- Otevři panel **Skupina** v UI.
- Klikni **+ Přidat aktuální skupinu** aby se uložila do seznamu.
- Zvol skupinu v dropdownu pro režim *pouze vybrané skupiny*.
- Pokud je vybrána konkrétní skupina, skript ignoruje ostatní chody.

## ⚠️ Právní kontext

### WhatsApp ToS
- DOM manipulace a simulace kliků **porušuje ToS** WhatsApp
- Riziko: **dočasný nebo trvalý ban účtu**
- Zmírnění: žádné auto-messaging, uživatel potvrzuje každou akci

### GDPR
- Zpracování probíhá **výhradně lokálně** (žádný server, žádné API)
- Obsah zpráv se **neukládá** — jen se čte z DOM pro kontrolu
- Pro osobní použití platí **výjimka pro domácnost** (čl. 2(2)(c) GDPR)
- Statistiky obsahují jen agregovaná čísla, žádná osobní data

## ⚠️ Omezení
- DOM selektory se mohou rozbít při aktualizaci WA Web
- „Smazat pro všechny" max ~2 dny od odeslání
- Skript běží jen s otevřeným tabem
- Po reloadu nutné znovu kliknout bookmarklet
- AI vyžaduje lokálně běžící Ollama

## 📄 Licence
[LICENSE.md](LICENSE.md) — volné použití, zákaz prodeje a přivlastnění.

## 👤 Autor
**Viktor Brunclík** — [vbtronic](https://github.com/vbtronic)

> ✅ Tento projekt byl vytvořen ve spolupráci s GitHub Copilot (AI asistent) a s Amp (Sourcegraph).
