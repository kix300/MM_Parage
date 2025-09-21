#!/bin/bash

# Script to restore the MM_Parage website deployment

echo "🔄 Restoring MM_Parage website deployment..."

# Check if backup exists
if [ ! -f "index.html.backup" ]; then
    echo "❌ Error: index.html.backup not found!"
    echo "Cannot restore deployment without backup file."
    exit 1
fi

# Restore original index.html
echo "📋 Restoring original index.html..."
cp index.html.backup index.html

# Remove maintenance page
if [ -f "maintenance.html" ]; then
    echo "🗑️  Removing maintenance.html..."
    rm maintenance.html
fi

# Remove stop deployment documentation
if [ -f "STOP_DEPLOYMENT.md" ]; then
    echo "🗑️  Removing STOP_DEPLOYMENT.md..."
    rm STOP_DEPLOYMENT.md
fi

echo "✅ Deployment restored successfully!"
echo "📝 Don't forget to commit and push these changes to activate the deployment."
echo ""
echo "Next steps:"
echo "  git add ."
echo "  git commit -m 'Restore website deployment'"
echo "  git push"