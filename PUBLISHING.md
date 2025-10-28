# Publishing to npmjs.com - Complete Guide

## Prerequisites

Before publishing, you need:

1. **npm account** - Create at https://www.npmjs.com/signup
2. **Unique package name** - Check if name is available at https://www.npmjs.com/package/n8n-nodes-freewebstore
3. **Email verified** - Verify your npm email address

## Step-by-Step Publishing Process

### 1. Update Package Information

Before publishing, customize these fields in `package.json`:

```json
{
  "name": "n8n-nodes-freewebstore",
  "version": "1.0.0",
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/n8n-nodes-freewebstore.git"
  },
  "homepage": "https://github.com/yourusername/n8n-nodes-freewebstore"
}
```

### 2. Login to npm

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email (public)
- One-time password (if 2FA enabled)

Verify you're logged in:
```bash
npm whoami
```

### 3. Check Package Name Availability

```bash
npm view n8n-nodes-freewebstore
```

If you get an error "404 Not Found", the name is available! If not, you'll need to choose a different name.

**Alternative names if taken:**
- `n8n-nodes-freewebstore-api`
- `@yourusername/n8n-nodes-freewebstore` (scoped package - recommended)
- `n8n-nodes-fws`

### 4. Test Build Locally

```bash
# Clean previous builds
rm -rf dist node_modules package-lock.json

# Fresh install
npm install

# Run build
npm run build

# Verify dist folder exists
ls -la dist/
```

You should see:
```
dist/
├── nodes/
│   └── FreeWebStore/
│       ├── FreeWebStore.node.js
│       └── freewebstore.svg
└── credentials/
    └── FreeWebStoreApi.credentials.js
```

### 5. Test the Package Locally (Optional but Recommended)

```bash
# Create a test package
npm pack

# This creates: n8n-nodes-freewebstore-1.0.0.tgz
# Test install it
npm install -g ./n8n-nodes-freewebstore-1.0.0.tgz

# Verify it works, then uninstall
npm uninstall -g n8n-nodes-freewebstore
```

### 6. Fix Any Linting Issues

```bash
# Check for linting errors
npm run lint

# Auto-fix what can be fixed
npm run lintfix
```

### 7. Publish to npm

```bash
# Dry run first (see what will be published)
npm publish --dry-run

# If everything looks good, publish for real
npm publish
```

**For first-time publish with scoped package:**
```bash
npm publish --access public
```

### 8. Verify Publication

Check your package is live:
```bash
npm view n8n-nodes-freewebstore

# Or visit
# https://www.npmjs.com/package/n8n-nodes-freewebstore
```

---

## Troubleshooting Common Errors

### Error: "You must verify your email before publishing"

```bash
# Resend verification email
npm profile get
# Check your email and click the verification link
```

### Error: "Package name too similar to existing package"

Choose a more unique name or use a scoped package:

```json
{
  "name": "@yourusername/n8n-nodes-freewebstore"
}
```

Then publish with:
```bash
npm publish --access public
```

### Error: "You do not have permission to publish"

This means the package name is already taken. Options:
1. Choose a different name
2. Contact the current owner
3. Use a scoped package with your username

### Error: "prepublishOnly script failed"

This was the error you encountered. I've fixed it by:
1. Creating `.eslintrc.js` and `.eslintrc.prepublish.js`
2. Simplifying the prepublishOnly script
3. Installing all required devDependencies

If you still get this error:
```bash
# Skip prepublish scripts (not recommended)
npm publish --ignore-scripts

# Or fix the issue first
npm run prepublishOnly
```

### Error: "EPERM: operation not permitted"

On Windows, close any programs that might be accessing the files (VS Code, terminal windows, etc.)

### Build Errors

```bash
# Clean everything and start fresh
rm -rf node_modules dist package-lock.json
npm install
npm run build
npm publish
```

---

## Publishing Updates (Versions)

### Semantic Versioning

Follow semver (https://semver.org/):
- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features, backwards compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

### Update Version and Publish

```bash
# Patch release (bug fixes)
npm version patch
npm publish

# Minor release (new features)
npm version minor
npm publish

# Major release (breaking changes)
npm version major
npm publish
```

This automatically:
1. Updates version in package.json
2. Creates a git commit
3. Creates a git tag

Then push to git:
```bash
git push && git push --tags
```

---

## Using Scoped Packages (Recommended)

Scoped packages are namespaced under your username/organization:

### 1. Update package.json

```json
{
  "name": "@yourusername/n8n-nodes-freewebstore"
}
```

### 2. Publish

```bash
npm publish --access public
```

### 3. Users Install With

```bash
npm install @yourusername/n8n-nodes-freewebstore
```

**Benefits:**
- Less likely to have naming conflicts
- Shows clear ownership
- Can have private packages (paid feature)

---

## Publishing Checklist

Before each publish:

- [ ] Version number updated (`npm version [patch|minor|major]`)
- [ ] CHANGELOG.md updated
- [ ] All tests passing (if you have tests)
- [ ] `npm run build` succeeds
- [ ] `npm run lint` succeeds
- [ ] README.md is up to date
- [ ] Git commits pushed
- [ ] `npm publish --dry-run` looks correct
- [ ] Ready to publish! 🚀

---

## Post-Publication

### 1. Test Installation

```bash
# In a different directory
npm install n8n-nodes-freewebstore
```

### 2. Update Documentation

Add to your README:
```markdown
## Installation

npm install n8n-nodes-freewebstore
```

### 3. Share Your Package

- Share on n8n community forum
- Tweet about it
- Add to n8n community nodes list
- Create a blog post

### 4. Monitor Stats

Check download stats:
```bash
npm view n8n-nodes-freewebstore

# Or visit
# https://npm-stat.com/charts.html?package=n8n-nodes-freewebstore
```

---

## Quick Commands Reference

```bash
# Login to npm
npm login

# Check who you're logged in as
npm whoami

# Check if package name is available
npm view PACKAGE_NAME

# Build the package
npm run build

# Test locally
npm pack

# Dry run publish
npm publish --dry-run

# Publish for real
npm publish

# Publish scoped package
npm publish --access public

# Update version
npm version patch  # or minor, or major

# Unpublish (within 72 hours only)
npm unpublish n8n-nodes-freewebstore@1.0.0
```

---

## Alternative: Private npm Packages

If you want to keep it private (requires paid npm account):

```bash
# Publish as private
npm publish --access restricted

# Users need to be authenticated to install
npm login
npm install n8n-nodes-freewebstore
```

---

## Need Help?

- **npm documentation**: https://docs.npmjs.com/
- **n8n community nodes**: https://docs.n8n.io/integrations/community-nodes/
- **npm support**: https://www.npmjs.com/support

---

## Success! 🎉

Once published, your node will be available to the entire n8n community!

Users can install it with:
```bash
npm install n8n-nodes-freewebstore
```

Or in n8n Cloud/Desktop:
1. Settings → Community Nodes
2. Install → Enter: n8n-nodes-freewebstore
3. Click Install

Your node is now part of the n8n ecosystem! 🚀
