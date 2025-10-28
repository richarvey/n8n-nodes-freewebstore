#!/bin/bash

# FreeWebStore n8n Node - Quick Start Setup Script
# This script helps you quickly set up the FreeWebStore node in your n8n installation

set -e

echo "==========================================="
echo "FreeWebStore n8n Node - Quick Setup"
echo "==========================================="
echo ""

# Check if running in Docker or local environment
if [ -f /.dockerenv ]; then
    ENVIRONMENT="docker"
    echo "✓ Detected Docker environment"
else
    ENVIRONMENT="local"
    echo "✓ Detected local environment"
fi

echo ""
echo "Step 1: Installing dependencies..."
npm install

echo ""
echo "Step 2: Building the node..."
npm run build

if [ $? -eq 0 ]; then
    echo "✓ Build successful!"
else
    echo "✗ Build failed. Please check the errors above."
    exit 1
fi

echo ""
echo "Step 3: Node built successfully!"

if [ "$ENVIRONMENT" = "local" ]; then
    echo ""
    echo "Step 4: Linking node to n8n..."
    
    # Check if n8n is installed globally
    if command -v n8n &> /dev/null; then
        npm link
        cd ~/.n8n 2>/dev/null || cd ~/Library/Application\ Support/n8n 2>/dev/null || {
            echo "✗ Could not find n8n directory"
            echo "  Please link manually by running:"
            echo "  npm link"
            echo "  cd ~/.n8n"
            echo "  npm link n8n-nodes-freewebstore"
            exit 1
        }
        npm link n8n-nodes-freewebstore
        echo "✓ Node linked successfully!"
    else
        echo "⚠ n8n not found in PATH"
        echo "  If you're using n8n desktop or a custom installation, you may need to:"
        echo "  1. Find your n8n directory (usually ~/.n8n)"
        echo "  2. Run: npm link in this directory"
        echo "  3. Run: npm link n8n-nodes-freewebstore in your n8n directory"
    fi
fi

echo ""
echo "==========================================="
echo "Setup Complete!"
echo "==========================================="
echo ""

if [ "$ENVIRONMENT" = "docker" ]; then
    echo "The FreeWebStore node has been built and is ready to use."
    echo "n8n will automatically detect it when the container starts."
else
    echo "Next steps:"
    echo "1. Restart n8n if it's currently running"
    echo "2. Log in to n8n at http://localhost:5678"
    echo "3. Go to Credentials and add your FreeWebStore API credentials"
    echo "4. Create a new workflow and search for 'FreeWebStore' in the node list"
fi

echo ""
echo "Documentation:"
echo "- README: See README.md for full documentation"
echo "- Docker Guide: See DOCKER_GUIDE.md for Docker-specific instructions"
echo "- Examples: See examples/workflow-examples.md for workflow templates"
echo ""

if [ "$ENVIRONMENT" = "local" ]; then
    echo "To start n8n (if not already running):"
    echo "  n8n start"
fi

echo ""
echo "Need help? Visit:"
echo "- https://docs.n8n.io/"
echo "- https://community.n8n.io/"
echo "- https://api.freewebstore.com/"
echo ""
echo "==========================================="
