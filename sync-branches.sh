#!/bin/bash

# ============================================
# Branch Synchronization Script
# ============================================
# WHAT: Syncs dev → stag → main after merging PR to dev
# WHY: Keeps all environment branches in sync automatically
# HOW: Run this after merging a PR to dev branch
#
# Usage: ./sync-branches.sh
#
# Flow:
#   1. Checkout dev
#   2. Pull latest changes to dev
#   3. Merge dev → stag
#   4. Merge stag → main
#   5. Ensure all branches are synchronized

set -e  # Exit on any error

echo "🔄 Starting branch synchronization..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository!"
    exit 1
fi

# Store the current branch to return to it later
ORIGINAL_BRANCH=$(git branch --show-current)
print_step "Original branch: $ORIGINAL_BRANCH"
echo ""

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_warning "You have uncommitted changes!"
    echo "Please commit or stash your changes before running this script."
    exit 1
fi

# ============================================
# Step 0: Fetch latest changes from remote
# ============================================
print_step "Fetching latest changes from remote..."
git fetch origin
print_success "Fetch completed"
echo ""

# ============================================
# Step 1: Checkout dev and pull latest
# ============================================
print_step "Step 1: Checking out dev branch..."
git checkout dev
print_success "Switched to dev branch"
echo ""

print_step "Pulling latest changes from origin/dev..."
LOCAL_DEV=$(git rev-parse dev)
REMOTE_DEV=$(git rev-parse origin/dev)

if [ "$LOCAL_DEV" != "$REMOTE_DEV" ]; then
    echo "  Local dev is behind remote, pulling changes..."
    git pull origin dev
    print_success "Dev branch updated with latest changes"
else
    print_success "Dev branch is already up to date"
fi
echo ""

# ============================================
# Step 2: Merge dev → stag
# ============================================
print_step "Step 2: Merging dev → stag..."
git checkout stag
git pull origin stag

# Check if stag is behind dev
LOCAL_STAG=$(git rev-parse stag)
DEV_SHA=$(git rev-parse dev)

if [ "$LOCAL_STAG" != "$DEV_SHA" ]; then
    BEHIND=$(git rev-list --count stag..dev)
    echo "  Stag is $BEHIND commit(s) behind dev"
    git merge dev -m "Sync stag with dev" --no-ff
    git push origin stag
    print_success "Stag merged with dev and pushed"
else
    print_success "Stag is already up to date with dev"
fi
echo ""

# ============================================
# Step 3: Merge stag → main
# ============================================
print_step "Step 3: Merging stag → main..."
git checkout main
git pull origin main

# Check if main is behind stag
LOCAL_MAIN=$(git rev-parse main)
STAG_SHA=$(git rev-parse stag)

if [ "$LOCAL_MAIN" != "$STAG_SHA" ]; then
    BEHIND=$(git rev-list --count main..stag)
    echo "  Main is $BEHIND commit(s) behind stag"
    git merge stag -m "Sync main with stag" --no-ff
    git push origin main
    print_success "Main merged with stag and pushed"
else
    print_success "Main is already up to date with stag"
fi
echo ""

# ============================================
# Step 4: Ensure dev is in sync with main
# ============================================
print_step "Step 4: Ensuring dev is in sync with main..."
git checkout dev

# Check if dev is behind main
DEV_SHA=$(git rev-parse dev)
MAIN_SHA=$(git rev-parse main)

if [ "$DEV_SHA" != "$MAIN_SHA" ]; then
    BEHIND=$(git rev-list --count dev..main)
    if [ "$BEHIND" -gt 0 ]; then
        echo "  Dev is $BEHIND commit(s) behind main (syncing back)"
        git merge main --no-ff -m "Sync dev with main"
        git push origin dev
        print_success "Dev synced with main"
    fi
else
    print_success "Dev is in sync with main"
fi
echo ""

# ============================================
# Step 5: Final verification
# ============================================
print_step "Step 5: Final verification..."
git fetch origin

DEV_SHA=$(git rev-parse origin/dev)
STAG_SHA=$(git rev-parse origin/stag)
MAIN_SHA=$(git rev-parse origin/main)

echo ""
echo "📊 Final branch states:"
echo "  dev:  $DEV_SHA"
echo "  stag: $STAG_SHA"
echo "  main: $MAIN_SHA"
echo ""

if [ "$DEV_SHA" = "$STAG_SHA" ] && [ "$STAG_SHA" = "$MAIN_SHA" ]; then
    print_success "Perfect! All branches are synchronized to the same commit!"
else
    print_warning "Branches have different commits"

    # Show commit differences
    DEV_VS_MAIN=$(git rev-list --left-right --count origin/dev...origin/main)
    STAG_VS_MAIN=$(git rev-list --left-right --count origin/stag...origin/main)
    DEV_VS_STAG=$(git rev-list --left-right --count origin/dev...origin/stag)

    echo ""
    echo "Commit differences:"
    echo "  dev vs stag:  $DEV_VS_STAG"
    echo "  stag vs main: $STAG_VS_MAIN"
    echo "  dev vs main:  $DEV_VS_MAIN"
fi

echo ""

# Return to original branch
if [ "$ORIGINAL_BRANCH" != "" ] && [ "$ORIGINAL_BRANCH" != "dev" ]; then
    print_step "Returning to original branch: $ORIGINAL_BRANCH"
    git checkout "$ORIGINAL_BRANCH"
else
    print_success "Staying on dev branch"
fi

echo ""
echo "════════════════════════════════════════════"
print_success "Branch synchronization completed!"
echo "════════════════════════════════════════════"
echo ""
echo "Summary:"
echo "  ✓ Checked out dev and pulled latest changes"
echo "  ✓ Merged dev → stag"
echo "  ✓ Merged stag → main"
echo "  ✓ Synced dev with main (if needed)"
echo "  ✓ All changes pushed to remote"
echo ""
