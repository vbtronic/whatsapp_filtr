# 🛡️ WhatsApp Spam Filtr

Vlastní nástroj pro moderaci WhatsApp Web skupin. Bookmarklet pro Safari/Chrome. Žádné API, žádné závislosti — čistý vanilla JavaScript.

> ⚠️ Pracuje v šedé zóně WhatsApp ToS. Každé mazání/odeslání vyžaduje vaše potvrzení. Použití na vlastní riziko.

## ✨ Funkce

- 🚫 **Spam filtr** — klíčová slova, odkazy, přeposílané, opakování
- 🤬 **Filtr vulgarismů** — vestavěný seznam + vlastní slova
- ⏰ **Časované mazání** — zprávy starší než X minut
- 🤖 **AI asistent** — lokální Ollama, odpovědi s potvrzením
- 🎛️ **Nastavení skupiny** — název, popis (s potvrzením)
- 📊 **Dashboard** — statistiky, log, periodické skeny

## 📥 Instalace

### Předpoklady

- Safari nebo Chrome
- Python 3
- Ollama (volitelné)

### Kroky

1. `git clone https://github.com/vbtronic/whatsapp_filtr.git && cd whatsapp_filtr`
2. `./serve.sh` (nech běžet)
3. Safari: Nastavení → Pokročilé → Zobrazit nabídku Vývoj. Přidej záložku, do Adresy vlož obsah `bookmarklet.js`.
4. Otevři web.whatsapp.com → klikni záložku → zelené 🛡️ vpravo dole

### AI Setup

```bash
brew install ollama
ollama pull llama3.2
# Běží na http://localhost:11434
```

## 🔧 Jak to funguje

1. MutationObserver sleduje nové zprávy
2. Kontrola proti filtrům (spam, vulgarismy, čas)
3. Podezřelé zprávy se označí barevně (🔴🟠🟡)
4. Panel zobrazí "Nalezeno X zpráv" + tlačítko Smazat
5. Vy potvrdíte → zprávy se smažou s lidskými prodlevami

## 📁 Struktura

```
content.js      — hlavní logika
panel.css       — styly
bookmarklet.js  — bookmarklet
serve.sh        — lokální server
manifest.json   — Chrome extension (alternativa)
docs/index.html — landing page
LICENSE.md      — licence
AGENTS.md       — instrukce pro AI
```

## ⚠️ Omezení

- DOM selektory se mohou rozbít při aktualizaci WA Web
- "Smazat pro všechny" max ~2 dny
- Skript běží jen s otevřeným tabem
- Po reloadu nutné znovu kliknout bookmarklet

## 📄 Licence

[LICENSE.md](LICENSE.md) — volné použití, zákaz prodeje a přivlastnění.

## 👤 Autor

**Viktor Brunclík** — [vbtronic](https://github.com/vbtronic)
