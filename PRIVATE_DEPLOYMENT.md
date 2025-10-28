# Deploying FreeWebStore n8n Node to Private Repository

## Overview

You have several options for deploying your custom n8n node privately:

1. **Private Git Repository** (GitHub, GitLab, Bitbucket) - Easiest
2. **Private npm Registry** (npm private packages, GitHub Packages, Verdaccio)
3. **Direct Docker Deployment** (No repository needed)

---

## Option 1: Private Git Repository (Recommended for Private Use)

This is the simplest option for private deployment.

### A. Push to Private GitHub Repository

```bash
cd freewebstore-n8n-node

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: FreeWebStore n8n node"

# Add your private GitHub repository as remote
git remote add origin git@github.com:yourusername/n8n-nodes-freewebstore.git

# Push to GitHub
git push -u origin main
```

### B. Install from Private Git Repository

**In n8n Docker setup:**

```yaml
# docker-compose.yml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=changeme
    volumes:
      - n8n_data:/home/node/.n8n
    command: >
      /bin/sh -c "
      apk add --no-cache git &&
      npm install git+https://YOUR_GITHUB_TOKEN@github.com/yourusername/n8n-nodes-freewebstore.git &&
      n8n start
      "

volumes:
  n8n_data:
```

**For local n8n installation:**

```bash
# Install directly from private Git repo
npm install git+https://YOUR_GITHUB_TOKEN@github.com/yourusername/n8n-nodes-freewebstore.git

# Or with SSH
npm install git+ssh://git@github.com:yourusername/n8n-nodes-freewebstore.git
```

---

## Option 2: Private npm Registry

### A. Using GitHub Packages (npm)

**1. Update package.json:**

```json
{
  "name": "@yourusername/n8n-nodes-freewebstore",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/n8n-nodes-freewebstore.git"
  }
}
```

**2. Create .npmrc in project root:**

```bash
# .npmrc
@yourusername:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**3. Build and publish:**

```bash
# Build the project
npm run build

# Login to GitHub Packages (one time)
npm login --registry=https://npm.pkg.github.com

# Publish
npm publish
```

**4. Install in n8n:**

```bash
# Set up authentication
echo "@yourusername:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> ~/.npmrc

# Install the package
npm install @yourusername/n8n-nodes-freewebstore
```

### B. Using GitLab Package Registry

**1. Update package.json:**

```json
{
  "name": "@yourgroup/n8n-nodes-freewebstore",
  "publishConfig": {
    "registry": "https://gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/"
  }
}
```

**2. Create .npmrc:**

```bash
# .npmrc
@yourgroup:registry=https://gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/
//gitlab.com/api/v4/projects/YOUR_PROJECT_ID/packages/npm/:_authToken=${GITLAB_TOKEN}
```

**3. Publish:**

```bash
npm run build
npm publish
```

### C. Self-Hosted Verdaccio (npm proxy)

Perfect for private servers!

**1. Install Verdaccio:**

```bash
# Install globally
npm install -g verdaccio

# Or run with Docker
docker run -d --name verdaccio \
  -p 4873:4873 \
  -v verdaccio_storage:/verdaccio/storage \
  verdaccio/verdaccio
```

**2. Configure .npmrc:**

```bash
# Point to your Verdaccio server
npm set registry http://your-server:4873/
```

**3. Publish to Verdaccio:**

```bash
cd freewebstore-n8n-node
npm run build
npm publish --registry http://your-server:4873/
```

**4. Install from Verdaccio in n8n:**

```bash
npm install n8n-nodes-freewebstore --registry http://your-server:4873/
```

---

## Option 3: Direct Docker Deployment (No Repository)

Mount the built node directly into n8n container.

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=changeme
    volumes:
      - n8n_data:/home/node/.n8n
      # Mount the built node directly
      - ./freewebstore-n8n-node/dist:/usr/local/lib/node_modules/n8n-nodes-freewebstore/dist:ro
      - ./freewebstore-n8n-node/package.json:/usr/local/lib/node_modules/n8n-nodes-freewebstore/package.json:ro

volumes:
  n8n_data:
```

---

## Option 4: Custom Docker Image

Build a custom n8n image with your node included.

**Dockerfile:**

```dockerfile
FROM n8nio/n8n:latest

# Switch to root to install packages
USER root

# Copy the node source
COPY freewebstore-n8n-node /tmp/n8n-nodes-freewebstore

# Build and install the node
WORKDIR /tmp/n8n-nodes-freewebstore
RUN npm install && npm run build

# Install globally so n8n can find it
RUN npm install -g .

# Clean up
RUN rm -rf /tmp/n8n-nodes-freewebstore

# Switch back to node user
USER node

WORKDIR /home/node

CMD ["n8n"]
```

**Build and run:**

```bash
# Build the custom image
docker build -t n8n-with-freewebstore:latest .

# Run it
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=changeme \
  n8n-with-freewebstore:latest
```

**Or with docker-compose:**

```yaml
version: '3.8'

services:
  n8n:
    build:
      context: .
      dockerfile: Dockerfile
    image: n8n-with-freewebstore:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=changeme
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

---

## Recommended Approach for Your Setup

Based on your preferences (Linux, Docker, private deployment):

### **Option A: Private Git + Docker Image** (Most Maintainable)

1. Push to private GitHub/GitLab
2. Create Dockerfile that clones and builds from your repo
3. Use docker-compose for deployment

```dockerfile
FROM n8nio/n8n:latest

USER root

# Install git
RUN apk add --no-cache git

# Clone and install your private node
RUN cd /usr/local/lib/node_modules && \
    git clone https://${GITHUB_TOKEN}@github.com/yourusername/n8n-nodes-freewebstore.git && \
    cd n8n-nodes-freewebstore && \
    npm install && \
    npm run build

USER node

CMD ["n8n"]
```

**Build with secret:**

```bash
docker build --build-arg GITHUB_TOKEN=your_token -t n8n-freewebstore .
```

### **Option B: Direct Mount** (Simplest for Testing)

Just use the current docker-compose.yml that's included in the project - it mounts and builds automatically!

```bash
docker-compose up -d
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/publish.yml
name: Publish to GitHub Packages

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Publish to GitHub Packages
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## Security Best Practices

1. **Never commit credentials** - Use .gitignore
2. **Use environment variables** for tokens
3. **Use SSH keys** for Git authentication when possible
4. **Use .npmrc with tokens** for npm registry auth
5. **Scan for vulnerabilities** regularly with `npm audit`

---

## Quick Commands Cheat Sheet

```bash
# Push to private Git
git remote add origin git@github.com:user/repo.git
git push -u origin main

# Install from private Git (HTTPS with token)
npm install git+https://TOKEN@github.com/user/repo.git

# Install from private Git (SSH)
npm install git+ssh://git@github.com:user/repo.git

# Publish to GitHub Packages
npm publish --registry=https://npm.pkg.github.com

# Install from GitHub Packages
npm install @username/package --registry=https://npm.pkg.github.com

# Build custom Docker image
docker build -t n8n-custom .
docker run -d -p 5678:5678 n8n-custom
```

---

## Need Help?

Choose the method that fits your infrastructure:
- **No npm registry?** → Use Option 1 (Private Git) or Option 3 (Direct Mount)
- **Have private npm registry?** → Use Option 2
- **Want most control?** → Use Option 4 (Custom Docker Image)
- **Simplest setup?** → Use the included docker-compose.yml
