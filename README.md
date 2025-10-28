# n8n-nodes-freewebstore

This is an n8n community node that lets you use [FreeWebStore](https://www.freewebstore.com/) in your n8n workflows.

FreeWebStore is an ecommerce platform that allows you to create and manage your online store. This node provides full integration with the FreeWebStore API, allowing you to automate product management, customer management, and order processing.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Node Installation (Recommended for n8n Cloud/Desktop)

1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-freewebstore` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

### Manual Installation (For Self-Hosted n8n)

#### Option 1: Using npm (Recommended)

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the node
npm install n8n-nodes-freewebstore
```

#### Option 2: From Source

```bash
# Clone the repository
git clone https://github.com/yourusername/n8n-nodes-freewebstore.git

# Navigate to the directory
cd n8n-nodes-freewebstore

# Install dependencies
npm install

# Build the node
npm run build

# Link to your n8n installation
npm link
cd ~/.n8n
npm link n8n-nodes-freewebstore
```

#### Option 3: Docker Installation

If you're using Docker, you can install the node by modifying your docker-compose.yml or Dockerfile:

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_CUSTOM_EXTENSIONS=/data/custom
    volumes:
      - n8n_data:/home/node/.n8n
      - ./custom:/data/custom
    command: /bin/sh -c "cd /data/custom && npm install n8n-nodes-freewebstore && n8n start"

volumes:
  n8n_data:
```

**Or using a custom Dockerfile:**
```dockerfile
FROM n8nio/n8n

# Install the FreeWebStore node
RUN cd /home/node/.n8n && npm install n8n-nodes-freewebstore

# Start n8n
CMD ["n8n"]
```

After installation, restart your n8n instance.

## Operations

### Categories
- **Get Many**: Retrieve all categories from your store

### Products
- **Create**: Create a new product
- **Get**: Retrieve a specific product by ID
- **Get Many**: Retrieve all products (with filtering options)
- **Update**: Update an existing product
- **Delete**: Delete a product

### Customers
- **Create**: Create a new customer
- **Get**: Retrieve a specific customer by ID
- **Get Many**: Retrieve all customers (with filtering and sorting)
- **Update**: Update an existing customer
- **Delete**: Delete a customer

### Orders
- **Get**: Retrieve a specific order by ID
- **Get Many**: Retrieve all orders (with filtering by status, date range, etc.)

## Credentials

To use this node, you need to obtain an API key from your FreeWebStore account:

1. Log in to your [FreeWebStore account](https://www.freewebstore.com/)
2. Navigate to your account settings or developer settings
3. Generate or locate your API key
4. In n8n, create new "FreeWebStore API" credentials
5. Enter your API key

The credentials will be automatically tested when saved by making a request to the categories endpoint.

## Compatibility

- Requires n8n version 0.198.0 or higher
- Tested with n8n version 1.0.0+

## Usage

### Example 1: Create a Product

```json
{
  "resource": "product",
  "operation": "create",
  "productData": {
    "core": {
      "name": "Awesome T-Shirt",
      "sku": "TSH-001",
      "stock": 100,
      "condition": "new",
      "price": 19.99,
      "categoryId": "12345",
      "pricing": {
        "baseprice": 19.99
      },
      "published": true
    }
  }
}
```

### Example 2: List All Orders with Status Filter

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
  "productId": "8329129",
  "productData": {
    "core": {
      "stock": 75
    }
  }
}
```

### Example 4: Create a Customer

```json
{
  "resource": "customer",
  "operation": "create",
  "customerData": {
    "email": "customer@example.com",
    "forename": "John",
    "surname": "Doe",
    "companyname": "Acme Corp"
  }
}
```

### Example Workflow Ideas

1. **Inventory Sync**: Automatically sync product stock levels from your warehouse management system
2. **Order Processing**: Create automated workflows when new orders are received
3. **Customer Management**: Sync customer data with your CRM
4. **Price Updates**: Bulk update product prices based on external data sources
5. **Order Notifications**: Send custom notifications via Slack, email, or SMS when orders meet certain criteria

## Product Data Structure

When creating or updating products, you can use the full product schema as defined in the [FreeWebStore API documentation](https://api.freewebstore.com/). Here's a comprehensive example:

```json
{
  "description": "Full HTML description here",
  "category": "TopLevel>SubCategory>NestedCategory",
  "core": {
    "productType": "physical",
    "sku": "PROD-001",
    "name": "Product Name",
    "abstract": "Short description (100-1500 characters)",
    "condition": "new",
    "image": {
      "filename": "product_image.jpg"
    },
    "price": 29.99,
    "categoryId": "12345",
    "pricing": {
      "baseprice": 29.99,
      "discount": {
        "type": "price",
        "value": 24.99
      }
    },
    "url": "custom-product-url",
    "seo": {
      "title": "SEO Title",
      "desc": "SEO Description",
      "keywords": ["keyword1", "keyword2"]
    },
    "brand": "Brand Name",
    "published": true,
    "featured": false,
    "weight": {
      "value": 100,
      "weightType": "g"
    },
    "stock": 50,
    "minQty": 1,
    "maxQty": 10,
    "countryOfOrigin": "USA"
  },
  "variants": [
    {
      "key": "Color:Blue;#Size:Large;",
      "sku": "PROD-001-BL-L",
      "stock": 10,
      "condition": "New"
    }
  ],
  "extraimages": [
    {
      "filename": "image2.jpg",
      "alt": "Alternative view"
    }
  ]
}
```

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [FreeWebStore API Documentation](https://api.freewebstore.com/)
* [FreeWebStore Website](https://www.freewebstore.com/)

## Development

### Building the Node

```bash
npm install
npm run build
```

### Testing Locally

```bash
# Link the node locally
npm link

# In your n8n directory
cd ~/.n8n
npm link n8n-nodes-freewebstore

# Restart n8n
```

## License

[MIT](LICENSE.md)

## Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/yourusername/n8n-nodes-freewebstore/issues).

For general n8n support, visit the [n8n community forum](https://community.n8n.io/).

For FreeWebStore API support, contact [FreeWebStore support](https://www.freewebstore.com/contact/).
