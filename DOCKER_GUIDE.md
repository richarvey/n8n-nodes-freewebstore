# FreeWebStore n8n Node - Docker Installation Guide

This guide will help you set up n8n with the FreeWebStore custom node using Docker and Docker Compose.

## Prerequisites

- Docker installed on your system
- Docker Compose installed
- A FreeWebStore account with API access

## Quick Start

### 1. Clone or Download This Repository

```bash
git clone https://github.com/yourusername/n8n-nodes-freewebstore.git
cd n8n-nodes-freewebstore
```

Or download and extract the ZIP file.

### 2. Create Environment File

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file with your preferred settings:

```bash
# Basic authentication for n8n
N8N_BASIC_AUTH_USER=your_admin_username
N8N_BASIC_AUTH_PASSWORD=your_secure_password

# For production deployment (optional)
N8N_HOST=your-domain.com
WEBHOOK_URL=https://your-domain.com/

# Timezone
GENERIC_TIMEZONE=America/New_York
```

### 3. Start n8n with Docker Compose

```bash
docker-compose up -d
```

This command will:
- Pull the latest n8n Docker image
- Install the FreeWebStore node dependencies
- Build the node
- Start n8n

### 4. Access n8n

Open your browser and navigate to:
```
http://localhost:5678
```

Log in with the credentials you set in the `.env` file.

### 5. Configure FreeWebStore Credentials

1. In n8n, click on "Credentials" in the left menu
2. Click "New Credentials"
3. Search for "FreeWebStore API"
4. Enter your FreeWebStore API key
5. Click "Save"

The credentials will be automatically tested by fetching your store's categories.

## Alternative Docker Methods

### Method 1: Using Docker Run (Without Compose)

```bash
docker run -d \
  --name n8n-freewebstore \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=changeme \
  -v n8n_data:/home/node/.n8n \
  -v $(pwd):/data/custom \
  n8nio/n8n:latest \
  /bin/sh -c "cd /data/custom && npm install && npm run build && n8n start"
```

### Method 2: Custom Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
FROM n8nio/n8n:latest

# Switch to root to install packages
USER root

# Copy the custom node files
COPY . /usr/local/lib/node_modules/n8n-nodes-freewebstore

# Install the node dependencies
WORKDIR /usr/local/lib/node_modules/n8n-nodes-freewebstore
RUN npm install && npm run build

# Link the node to n8n
WORKDIR /home/node/.n8n
RUN npm link n8n-nodes-freewebstore

# Switch back to node user
USER node

# Start n8n
WORKDIR /home/node
CMD ["n8n"]
```

Build and run:

```bash
docker build -t n8n-with-freewebstore .
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  n8n-with-freewebstore
```

## Managing Your n8n Instance

### View Logs

```bash
docker-compose logs -f n8n
```

### Stop n8n

```bash
docker-compose down
```

### Restart n8n

```bash
docker-compose restart
```

### Update n8n and the Node

```bash
# Pull the latest n8n image
docker-compose pull

# Rebuild with latest code
docker-compose up -d --build
```

### Backup Your Data

Your n8n workflows and credentials are stored in a Docker volume. To backup:

```bash
# Find the volume name
docker volume ls | grep n8n_data

# Create a backup
docker run --rm \
  -v freewebstore-n8n-node_n8n_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/n8n-backup-$(date +%Y%m%d-%H%M%S).tar.gz -C /data .
```

### Restore from Backup

```bash
# Stop n8n
docker-compose down

# Restore the backup
docker run --rm \
  -v freewebstore-n8n-node_n8n_data:/data \
  -v $(pwd):/backup \
  alpine sh -c "cd /data && tar xzf /backup/your-backup-file.tar.gz"

# Start n8n
docker-compose up -d
```

## Production Deployment Tips

### Using with Nginx Reverse Proxy

Create an nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### Using with Traefik

Update your `docker-compose.yml`:

```yaml
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    restart: always
    environment:
      - N8N_HOST=your-domain.com
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://your-domain.com/
    volumes:
      - n8n_data:/home/node/.n8n
      - ./:/data/custom
    command: /bin/sh -c "cd /data/custom && npm install && npm run build && n8n start"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.n8n.rule=Host(`your-domain.com`)"
      - "traefik.http.routers.n8n.entrypoints=websecure"
      - "traefik.http.routers.n8n.tls.certresolver=letsencrypt"
    networks:
      - traefik

networks:
  traefik:
    external: true

volumes:
  n8n_data:
```

### Using with SSL/HTTPS (Let's Encrypt)

See the [n8n documentation](https://docs.n8n.io/hosting/installation/docker/#using-docker-compose) for detailed SSL setup instructions.

## Troubleshooting

### Node Not Appearing in n8n

1. Check if the build was successful:
```bash
docker-compose logs n8n | grep -i error
```

2. Restart the container:
```bash
docker-compose restart n8n
```

3. Verify the node is installed:
```bash
docker-compose exec n8n ls -la /data/custom/dist
```

### Permission Issues

If you encounter permission issues, ensure the volumes have correct permissions:

```bash
sudo chown -R 1000:1000 ./
```

### API Connection Issues

Test the FreeWebStore API directly:

```bash
curl -H "x-api-key: YOUR_API_KEY" https://api.freewebstore.com/category/
```

## Getting Help

- [n8n Community Forum](https://community.n8n.io/)
- [n8n Documentation](https://docs.n8n.io/)
- [Docker Documentation](https://docs.docker.com/)
- [FreeWebStore API Docs](https://api.freewebstore.com/)

## Next Steps

After successful installation:
1. [Create your first workflow](../examples/workflow-examples.md)
2. [Configure webhooks](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
3. [Set up automated backups](#backup-your-data)
4. [Secure your instance](https://docs.n8n.io/hosting/security/)
