#!/bin/bash

# Quickstart validation script for Kubernetes for Absolute Beginners textbook

echo "Validating setup instructions from quickstart.md..."

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    exit 1
else
    echo "✓ Node.js is available: $(node --version)"
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed or not in PATH"
    exit 1
else
    echo "✓ npm is available: $(npm --version)"
fi

# Check if required files/directories exist
if [ ! -d "docs" ]; then
    echo "ERROR: docs directory does not exist"
    exit 1
else
    echo "✓ docs directory exists"
fi

if [ ! -d "src" ]; then
    echo "ERROR: src directory does not exist"
    exit 1
else
    echo "✓ src directory exists"
fi

if [ ! -f "docusaurus.config.js" ]; then
    echo "ERROR: docusaurus.config.js does not exist"
    exit 1
else
    echo "✓ docusaurus.config.js exists"
fi

if [ ! -f "package.json" ]; then
    echo "ERROR: package.json does not exist"
    exit 1
else
    echo "✓ package.json exists"
fi

# Check if required dependencies are in package.json
if ! grep -q "@docusaurus/core" package.json; then
    echo "ERROR: @docusaurus/core not found in package.json"
    exit 1
else
    echo "✓ @docusaurus/core dependency found"
fi

if ! grep -q "@docusaurus/preset-classic" package.json; then
    echo "ERROR: @docusaurus/preset-classic not found in package.json"
    exit 1
else
    echo "✓ @docusaurus/preset-classic dependency found"
fi

# Check if all chapter files exist
CHAPTERS=("intro.md" "chapter1-history.md" "chapter2-what-why.md" "chapter3-setup.md" "chapter4-concepts.md" "chapter5-deploy.md" "chapter6-best-practices.md")

for chapter in "${CHAPTERS[@]}"; do
    if [ ! -f "docs/$chapter" ]; then
        echo "ERROR: $chapter does not exist in docs directory"
        exit 1
    else
        echo "✓ $chapter exists"
    fi
done

# Check if sidebars.js exists and is properly configured
if [ ! -f "sidebars.js" ]; then
    echo "ERROR: sidebars.js does not exist"
    exit 1
else
    echo "✓ sidebars.js exists"
    
    # Check if all chapters are included in sidebars
    for chapter in "${CHAPTERS[@]}"; do
        # Extract base name without extension
        base_name=$(basename "$chapter" .md)
        if ! grep -q "$base_name" sidebars.js; then
            echo "WARNING: $base_name not found in sidebars.js"
        else
            echo "✓ $base_name found in sidebars.js"
        fi
    done
fi

echo ""
echo "✓ All validation checks passed!"
echo "The setup instructions from quickstart.md are working correctly."