# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### Added
- Initial release of FreeWebStore n8n node
- Support for Category operations
  - Get Many: Retrieve all categories
- Support for Product operations
  - Create: Create new products
  - Get: Retrieve specific product
  - Get Many: List all products with filtering
  - Update: Update existing products
  - Delete: Remove products
- Support for Customer operations
  - Create: Create new customers
  - Get: Retrieve specific customer
  - Get Many: List all customers with filtering and sorting
  - Update: Update existing customers
  - Delete: Remove customers
- Support for Order operations
  - Get: Retrieve specific order
  - Get Many: List all orders with filtering
- API key authentication
- Comprehensive error handling
- Docker support with docker-compose configuration
- Full documentation with examples
- Workflow templates and best practices

### Technical Details
- Built with n8n-workflow API version 1
- TypeScript implementation
- Automatic credential testing
- Support for pagination and filtering on list operations
- JSON-based data input for complex operations

## [Unreleased]

### Planned Features
- Webhook support for real-time order notifications
- Support for additional API endpoints as they become available
- Bulk operations for improved performance
- Enhanced error messages with retry logic
- Support for product image uploads
- Category management operations (create, update, delete)

---

## Upgrade Guide

### From Pre-release to 1.0.0
- No breaking changes
- First stable release

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## Support

For bug reports and feature requests, please use the [GitHub issue tracker](https://github.com/yourusername/n8n-nodes-freewebstore/issues).
