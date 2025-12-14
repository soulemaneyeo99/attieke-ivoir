#!/bin/bash

# Configuration
# Explicitly targeting the 'dev' user's home directory to avoid /root/ trap
DEST_BASE="/home/dev/projects/attieke-ivoir"

# Detect Source Environment
if [ -d "/mnt/c" ]; then
    SOURCE_BASE="/mnt/c/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda"
elif [ -d "/c/Users" ]; then
    SOURCE_BASE="/c/Users/YEO/.gemini/antigravity/playground/ecliptic-andromeda"
else
    SOURCE_BASE="."
fi

echo "🚀 Starting Project Sync (Target: /home/dev/)..."
echo "📂 Source: $SOURCE_BASE"
echo "🎯 Dest:   $DEST_BASE"

# Ensure destination exists
mkdir -p "$DEST_BASE"

# 1. Sync Root Files
echo "📄 Syncing Root Files..."
cp -f "$SOURCE_BASE/README.md" "$DEST_BASE/"

# 2. Sync Frontend
echo "🎨 Syncing Frontend..."
mkdir -p "$DEST_BASE/frontend"
cp -rf "$SOURCE_BASE/attieke_ivoir_frontend/"* "$DEST_BASE/frontend/"

# 3. Sync Backend
echo "⚙️ Syncing Backend..."
mkdir -p "$DEST_BASE/backend"
cp -rf "$SOURCE_BASE/attieke_ivoir_backend/"* "$DEST_BASE/backend/"

# 4. Sync Documentation
echo "🧠 Syncing Documentation..."
mkdir -p "$DEST_BASE/docs"
cp -v "$SOURCE_BASE/project_docs/"* "$DEST_BASE/docs/"

echo "---------------------------------------------------"
echo "✅ Sync Complete!"
echo "📂 Real Location: $DEST_BASE"
echo "👉 Please verify by running: ls -la $DEST_BASE/docs"
echo "---------------------------------------------------"
