#!/bin/bash
# Spustí lokální server pro bookmarklet
# Použití: ./serve.sh
echo "🛡️ WhatsApp Spam Filtr — lokální server"
echo "   http://localhost:8000"
echo "   Ctrl+C pro zastavení"
echo ""
cd "$(dirname "$0")"
python3 -m http.server 8000
