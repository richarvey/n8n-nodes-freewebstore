# Example Workflows for FreeWebStore n8n Node

This document contains practical workflow examples that demonstrate how to use the FreeWebStore node in n8n.

## Table of Contents
- [1. Sync Product Inventory from CSV](#1-sync-product-inventory-from-csv)
- [2. New Order Notification System](#2-new-order-notification-system)
- [3. Bulk Product Price Updater](#3-bulk-product-price-updater)
- [4. Customer Data Sync to CRM](#4-customer-data-sync-to-crm)
- [5. Low Stock Alert System](#5-low-stock-alert-system)
- [6. Automated Order Reporting](#6-automated-order-reporting)

---

## 1. Sync Product Inventory from CSV

**Use Case**: Automatically update product stock levels from a CSV file uploaded to Google Drive.

**Nodes Required**:
- Google Drive Trigger
- Spreadsheet File (Read)
- FreeWebStore (Update Product)

**Workflow**:
```
Google Drive Trigger (Watch for new CSV)
  → Spreadsheet File (Parse CSV)
  → Split Out (Loop through products)
  → FreeWebStore (Update Product Stock)
```

**FreeWebStore Node Configuration**:
```json
{
  "resource": "product",
  "operation": "update",
  "productId": "={{ $json.product_id }}",
  "productData": {
    "core": {
      "stock": "={{ $json.quantity }}"
    }
  }
}
```

---

## 2. New Order Notification System

**Use Case**: Send notifications to Slack when new orders are placed.

**Nodes Required**:
- Cron
- FreeWebStore (Get Many Orders)
- If (Check for new orders)
- Slack (Send Message)

**Workflow**:
```
Cron (Every 5 minutes)
  → FreeWebStore (Get Orders with status=new)
  → If (orders exist)
    → Slack (Send notification with order details)
```

**FreeWebStore Node Configuration**:
```json
{
  "resource": "order",
  "operation": "getMany",
  "additionalFields": {
    "status": "new",
    "limit": 10,
    "sort": "createddesc",
    "fields": "customer"
  }
}
```

**Slack Message Template**:
```
🛒 New Order Received!

Order #{{ $json.orderNo }}
Customer: {{ $json.customer.forename }} {{ $json.customer.surname }}
Total: ${{ $json.total }}
Items: {{ $json.order_details.length }}

View order: https://yourstore.com/admin/orders/{{ $json.id }}
```

---

## 3. Bulk Product Price Updater

**Use Case**: Update multiple product prices based on a price list from an external API.

**Nodes Required**:
- Schedule Trigger
- HTTP Request (Get price data)
- Split In Batches
- FreeWebStore (Update Product)

**Workflow**:
```
Schedule Trigger (Daily at 2 AM)
  → HTTP Request (Fetch price list)
  → Split In Batches (10 items per batch)
  → FreeWebStore (Update Product Pricing)
  → Wait (2 seconds between batches)
```

**FreeWebStore Node Configuration**:
```json
{
  "resource": "product",
  "operation": "update",
  "productId": "={{ $json.product_id }}",
  "productData": {
    "core": {
      "pricing": {
        "baseprice": "={{ $json.new_price }}"
      }
    }
  }
}
```

---

## 4. Customer Data Sync to CRM

**Use Case**: Sync new customers to HubSpot or another CRM system.

**Nodes Required**:
- Cron
- FreeWebStore (Get Many Customers)
- Set (Transform data)
- HubSpot (Create Contact)

**Workflow**:
```
Cron (Every hour)
  → FreeWebStore (Get Customers created in last hour)
  → Filter (Exclude already synced)
  → Set (Format for CRM)
  → HubSpot (Create/Update Contact)
```

**FreeWebStore Node Configuration**:
```json
{
  "resource": "customer",
  "operation": "getMany",
  "additionalFields": {
    "sort": "createddesc",
    "limit": 100
  }
}
```

**Set Node (Transform Data)**:
```json
{
  "email": "={{ $json.email }}",
  "firstname": "={{ $json.forename }}",
  "lastname": "={{ $json.surname }}",
  "company": "={{ $json.companyname }}",
  "lifecyclestage": "customer",
  "total_orders": "={{ $json.total_order_count }}",
  "total_value": "={{ $json.total_order_value }}"
}
```

---

## 5. Low Stock Alert System

**Use Case**: Monitor product stock levels and send alerts when items are running low.

**Nodes Required**:
- Schedule Trigger
- FreeWebStore (Get Many Products)
- If (Check stock level)
- Email (Send Alert)

**Workflow**:
```
Schedule Trigger (Daily at 9 AM)
  → FreeWebStore (Get All Products)
  → Filter (stock < 10 AND published = true)
  → Set (Format alert message)
  → Email (Send to inventory manager)
```

**FreeWebStore Node Configuration**:
```json
{
  "resource": "product",
  "operation": "getMany",
  "additionalFields": {
    "per_page": 100
  }
}
```

**Filter Expression**:
```javascript
{{ $json.core.stock < 10 && $json.core.published === true }}
```

**Email Template**:
```html
<h2>Low Stock Alert</h2>
<p>The following products are running low on stock:</p>

<table>
  <tr>
    <th>Product Name</th>
    <th>SKU</th>
    <th>Current Stock</th>
  </tr>
  {{ $('FreeWebStore').all().map(item => `
  <tr>
    <td>${item.json.core.name}</td>
    <td>${item.json.core.sku}</td>
    <td>${item.json.core.stock}</td>
  </tr>
  `).join('') }}
</table>
```

---

## 6. Automated Order Reporting

**Use Case**: Generate and email daily sales reports.

**Nodes Required**:
- Schedule Trigger
- FreeWebStore (Get Orders)
- Aggregate (Calculate totals)
- Google Sheets (Append)
- Email (Send Report)

**Workflow**:
```
Schedule Trigger (Daily at 6 PM)
  → FreeWebStore (Get Orders from last 24 hours)
  → Aggregate (Calculate daily totals)
  → Google Sheets (Append to report)
  → Email (Send summary to management)
```

**FreeWebStore Node Configuration**:
```json
{
  "resource": "order",
  "operation": "getMany",
  "additionalFields": {
    "status": "all",
    "startdate": "={{ $now.minus({days: 1}).toISO() }}",
    "enddate": "={{ $now.toISO() }}",
    "sort": "createddesc",
    "fields": "customer"
  }
}
```

**Aggregate Node**:
```javascript
// Calculate daily totals
{
  "total_orders": {{ $input.all().length }},
  "total_revenue": {{ $input.all().reduce((sum, item) => sum + parseFloat(item.json.total), 0) }},
  "average_order_value": {{ $input.all().reduce((sum, item) => sum + parseFloat(item.json.total), 0) / $input.all().length }},
  "date": "={{ $now.toFormat('yyyy-MM-dd') }}"
}
```

---

## Advanced Workflow: Complete Order Fulfillment Pipeline

**Use Case**: Automated order processing from creation to shipping notification.

**Nodes Required**:
- Webhook (Receive order notification)
- FreeWebStore (Get Order Details)
- Switch (Route by order type)
- HTTP Request (Create shipping label)
- FreeWebStore (Update Order with tracking)
- Email (Send customer notification)

**Workflow**:
```
Webhook (Order Created)
  → FreeWebStore (Get Full Order Details)
  → Switch (By payment method)
    → Case: PayPal
      → Verify Payment API
    → Case: Credit Card
      → Process Payment Gateway
  → FreeWebStore (Get Product Details for each item)
  → Check Inventory
  → If (All items in stock)
    → ShipStation API (Create Shipment)
    → FreeWebStore (Update Order Status)
    → Email (Shipping Confirmation to Customer)
  → Else
    → Email (Backorder Notification)
```

**FreeWebStore Get Order**:
```json
{
  "resource": "order",
  "operation": "get",
  "orderId": "={{ $json.order_id }}"
}
```

---

## Workflow Best Practices

### 1. Error Handling
Always add error handling to your workflows:
```
→ Try/Catch
  → Main workflow
  → On Error: Send error notification
```

### 2. Rate Limiting
Add delays between batch operations:
```javascript
// In a Wait node
{{ 1000 }} // Wait 1 second between requests
```

### 3. Logging
Keep track of all operations:
```
→ Google Sheets (Log all updates)
  - Timestamp
  - Operation Type
  - Product ID
  - Status
  - Error (if any)
```

### 4. Testing
Create a test version of each workflow:
- Use test products/customers
- Add "Test Mode" switch
- Validate data before live operations

### 5. Monitoring
Set up monitoring workflows:
```
Schedule Trigger (Every hour)
  → FreeWebStore (Health Check)
  → If (Failed)
    → Alert via Slack/Email
```

---

## Tips for Production Use

1. **Use Environment Variables**: Store API keys and sensitive data in n8n credentials
2. **Enable Workflow Versioning**: Keep backups of working workflows
3. **Set Up Proper Scheduling**: Avoid running heavy workflows during peak hours
4. **Monitor API Limits**: Be aware of FreeWebStore API rate limits
5. **Use Batching**: Process large datasets in smaller batches
6. **Test Thoroughly**: Always test with dummy data first
7. **Document Workflows**: Add notes to nodes explaining their purpose

---

## Need Help?

- [n8n Community Forum](https://community.n8n.io/)
- [FreeWebStore Support](https://www.freewebstore.com/contact/)
- [Node Documentation](../README.md)
