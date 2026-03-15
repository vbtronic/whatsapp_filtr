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
- 📧 **Notifikace** — upozornění v UI panelu nebo e-mailem (mailto:)

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
2. `./serve.sh` (nech běžet)
3. **Safari:** Nastavení → Pokročilé → Zobrazit nabídku Vývoj. Přidej záložku, do Adresy vlož obsah `bookmarklet.js`.
4. Otevři web.whatsapp.com → klikni záložku → zelené 🛡️ vpravo dole

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
