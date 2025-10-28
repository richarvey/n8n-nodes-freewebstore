# FreeWebStore n8n Node - Quick Start Guide

## 🎉 Your Custom n8n Node is Ready!

I've created a complete, production-ready n8n node for FreeWebStore that includes all API operations from the documentation at https://api.freewebstore.com/.

## 📦 What's Included

```
freewebstore-n8n-node/
├── nodes/
│   └── FreeWebStore/
│       ├── FreeWebStore.node.ts     # Main node (700+ lines)
│       └── freewebstore.svg         # Node icon
├── credentials/
│   └── FreeWebStoreApi.credentials.ts  # API authentication
├── examples/
│   └── workflow-examples.md         # 6 complete workflow examples
├── package.json                     # Node package configuration
├── tsconfig.json                    # TypeScript configuration
├── gulpfile.js                      # Build configuration
├── docker-compose.yml               # Ready-to-use Docker setup
├── .env.example                     # Environment variables template
├── setup.sh                         # Automated setup script
├── README.md                        # Comprehensive documentation
├── DOCKER_GUIDE.md                  # Docker-specific instructions
├── CONTRIBUTING.md                  # Contributing guidelines
├── CHANGELOG.md                     # Version history
└── LICENSE.md                       # MIT License
```

## ✨ Features

### Supported Resources & Operations

✅ **Categories**
- Get Many (list all categories)

✅ **Products** 
- Create new products with full schema support
- Get specific product by ID
- Get Many (list/filter products)
- Update products (full or partial)
- Delete products

✅ **Customers**
- Create new customers
- Get specific customer by ID
- Get Many (list/filter/sort customers)
- Update customers
- Delete customers

✅ **Orders**
- Get specific order by ID
- Get Many (list/filter orders by status, date, tags)

### Additional Features
- ✅ API Key authentication with auto-testing
- ✅ Full TypeScript implementation
- ✅ Comprehensive error handling
- ✅ Pagination & filtering support
- ✅ JSON-based data input for complex operations
- ✅ Docker & Docker Compose ready
- ✅ Complete documentation with examples

## 🚀 Installation Options

### Option 1: Docker Compose (Recommended for Your Setup)

Since you use Docker and Docker Compose, this is the easiest option:

```bash
cd freewebstore-n8n-node

# Create environment file
cp .env.example .env
# Edit .env with your preferred credentials

# Start n8n with the FreeWebStore node
docker-compose up -d

# Access n8n at http://localhost:5678
```

That's it! The node will be automatically built and available in n8n.

### Option 2: Quick Setup Script

```bash
cd freewebstore-n8n-node
chmod +x setup.sh
./setup.sh
```

The script will:
1. Install dependencies
2. Build the node
3. Link to your n8n installation (if local)
4. Provide next steps

### Option 3: Manual Installation

```bash
cd freewebstore-n8n-node

# Install dependencies
npm install

# Build the node
npm run build

# Link to n8n (if using local n8n)
npm link
cd ~/.n8n
npm link n8n-nodes-freewebstore

# Restart n8n
```

## 🔑 Setting Up Credentials

1. Open n8n (http://localhost:5678)
2. Go to **Settings** → **Credentials**
3. Click **New Credential**
4. Search for "FreeWebStore API"
5. Enter your API key from FreeWebStore
6. Click **Save** (it will auto-test the connection)

## 📖 Usage Examples

### Example 1: Create a Product

```json
{
  "resource": "product",
  "operation": "create",
  "productData": {
    "core": {
      "name": "Amazing T-Shirt",
      "sku": "TSH-001",
      "stock": 100,
      "pricing": {
        "baseprice": 19.99
      },
      "published": true
    }
  }
}
```

### Example 2: Get New Orders

```json
{
  "resource": "order",
  "operation": "getMany",
  "additionalFields": {
    "status": "new",
    "limit": 50,
    "sort": "createddesc"
  }
}
```

### Example 3: Update Product Stock

```json
{
  "resource": "product",
  "operation": "update",
  "productId": "12345",
  "productData": {
    "core": {
      "stock": 75
    }
  }
}
```

## 📚 Documentation

- **README.md** - Complete documentation
- **DOCKER_GUIDE.md** - Docker-specific setup & troubleshooting
- **examples/workflow-examples.md** - 6 ready-to-use workflow templates:
  1. Sync Product Inventory from CSV
  2. New Order Notification System
  3. Bulk Product Price Updater
  4. Customer Data Sync to CRM
  5. Low Stock Alert System
  6. Automated Order Reporting

## 🔧 Customization

The node is fully customizable. Key files to modify:

- `nodes/FreeWebStore/FreeWebStore.node.ts` - Add new operations
- `credentials/FreeWebStoreApi.credentials.ts` - Modify authentication
- `package.json` - Update metadata

## 🐛 Troubleshooting

### Node Not Appearing in n8n

```bash
# Restart n8n
docker-compose restart n8n

# Or if running locally
n8n start
```

### Build Errors

```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### API Connection Issues

Test your API key directly:
```bash
curl -H "x-api-key: YOUR_API_KEY" https://api.freewebstore.com/category/
```

## 📦 Project Structure

The node follows n8n's community node standards:
- Written in TypeScript
- Uses n8n-workflow API v1
- Includes proper credentials handling
- Has comprehensive error handling
- Supports all standard n8n features

## 🎯 Next Steps

1. **Install the node** using one of the methods above
2. **Set up credentials** with your FreeWebStore API key
3. **Try the examples** from workflow-examples.md
4. **Build your workflows** - automate your e-commerce operations!

## 📞 Getting Help

- **FreeWebStore API**: https://api.freewebstore.com/
- **n8n Documentation**: https://docs.n8n.io/
- **n8n Community**: https://community.n8n.io/

## 🎉 What You Can Automate

- Inventory synchronization
- Order processing & notifications
- Customer data management
- Price updates
- Stock alerts
- Sales reporting
- And much more!

## ⚙️ Technical Details

- **Language**: TypeScript
- **n8n API Version**: 1
- **Node.js**: v16+
- **Authentication**: API Key (x-api-key header)
- **Base URL**: https://api.freewebstore.com
- **License**: MIT

---

**Ready to automate your FreeWebStore operations?** Start with the Docker Compose setup and you'll be up and running in minutes! 🚀
