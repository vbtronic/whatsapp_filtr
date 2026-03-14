# AGENTS.md — WhatsApp Spam Filtr

## Project
Safari/Chrome bookmarklet for WhatsApp Web group moderation. Vanilla JS, no deps.

## Architecture
- content.js injected via bookmarklet into web.whatsapp.com
- panel.css for UI
- Config in localStorage (wsf_config)
- Optional Ollama AI (localhost:11434)

## Rules
- NEVER auto-delete — always require user confirmation click
- NEVER auto-send messages — always require confirmation
- NEVER transmit data externally — all processing local
- Human-like delays between DOM interactions (3-5s)
- All CSS prefixed with wsf-

## DOM Notes
- WhatsApp Web uses obfuscated classes that change often
- Prefer: data-id, data-icon, data-testid, ARIA roles
- Messages: [data-id] in #main
- Text: span.selectable-text
- Menu: [data-icon="down-context"]

## Files
- content.js — all logic (IIFE)
- panel.css — all styles
- bookmarklet.js — loads content.js + panel.css from localhost:8000
- serve.sh — python3 http.server :8000

## License
Custom — free use, no commercial use, attribution required. See LICENSE.md.

## Testing
Manual only on web.whatsapp.com. Check console for [WSF] logs.

## Commands
./serve.sh — start dev server
