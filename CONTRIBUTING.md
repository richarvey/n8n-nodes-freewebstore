# Contributing to FreeWebStore n8n Node

First off, thank you for considering contributing to the FreeWebStore n8n Node! It's people like you that make this tool better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.

When creating a bug report, please include:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed and what behavior you expected**
* **Include screenshots if possible**
* **Include your n8n version, node version, and operating system**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List any similar features in other tools if applicable**

### Pull Requests

* Fill in the required template
* Follow the TypeScript/JavaScript style guide
* Include tests when adding new features
* Update documentation as needed
* End all files with a newline

## Development Setup

### Prerequisites

* Node.js (v16 or higher)
* npm (v7 or higher)
* n8n installed (locally or via Docker)
* A FreeWebStore account with API access for testing

### Setting Up Your Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/n8n-nodes-freewebstore.git
   cd n8n-nodes-freewebstore
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Link to your n8n installation:
   ```bash
   npm link
   cd ~/.n8n
   npm link n8n-nodes-freewebstore
   ```

6. Start n8n in development mode:
   ```bash
   n8n start
   ```

### Project Structure

```
n8n-nodes-freewebstore/
├── nodes/
│   └── FreeWebStore/
│       ├── FreeWebStore.node.ts    # Main node implementation
│       └── freewebstore.svg         # Node icon
├── credentials/
│   └── FreeWebStoreApi.credentials.ts  # Credentials definition
├── dist/                            # Compiled output (generated)
├── examples/
│   └── workflow-examples.md         # Example workflows
├── package.json
├── tsconfig.json
└── README.md
```

### Development Workflow

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Build and test:
   ```bash
   npm run build
   # Test in n8n
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "Add: descriptive commit message"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

## Coding Guidelines

### TypeScript/JavaScript Style

* Use TypeScript for all new code
* Use 2 spaces for indentation (not tabs)
* Use single quotes for strings
* Use camelCase for variable and function names
* Use PascalCase for class and interface names
* Add JSDoc comments for public functions
* Keep functions small and focused

### Node Development Guidelines

1. **Follow n8n conventions**: Study existing n8n nodes for patterns and best practices
2. **Error handling**: Always provide clear error messages
3. **Type safety**: Use TypeScript types for all parameters
4. **Testing**: Test all operations with real API calls
5. **Documentation**: Update README.md with any new features

### Example Code Style

```typescript
import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class ExampleNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Example Node',
		name: 'exampleNode',
		group: ['transform'],
		version: 1,
		description: 'Description of what this node does',
		defaults: {
			name: 'Example Node',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Node properties
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Implementation
	}
}
```

### Commit Message Guidelines

Use clear and meaningful commit messages:

* `Add: description` - New features
* `Fix: description` - Bug fixes
* `Update: description` - Updates to existing features
* `Refactor: description` - Code refactoring
* `Docs: description` - Documentation changes
* `Test: description` - Adding or updating tests

Examples:
```
Add: Support for product variant operations
Fix: Handle empty response from API gracefully
Update: Improve error messages for authentication failures
Docs: Add examples for customer management
```

## Testing

### Manual Testing Checklist

Before submitting a PR, test the following:

- [ ] All CRUD operations work for Products
- [ ] All CRUD operations work for Customers
- [ ] Order retrieval operations work
- [ ] Category listing works
- [ ] Credential validation works
- [ ] Error handling displays appropriate messages
- [ ] All optional parameters work as expected
- [ ] Node works in both manual and automated workflows

### Testing with Real API

Always test with a real FreeWebStore account:

1. Create a test store (use FreeWebStore's free tier)
2. Generate API credentials
3. Test all operations
4. Verify data integrity
5. Test error scenarios (invalid IDs, missing required fields, etc.)

## Documentation

### Updating Documentation

When adding new features, update:

1. **README.md** - Main documentation
2. **workflow-examples.md** - Add practical examples
3. **CHANGELOG.md** - Document the changes
4. **Code comments** - Add inline documentation

### Documentation Style

* Use clear, concise language
* Provide code examples
* Include expected input/output
* Explain why, not just what

## Release Process

Maintainers follow this process for releases:

1. Update version in package.json
2. Update CHANGELOG.md
3. Create a git tag
4. Push to npm registry
5. Create GitHub release

## Questions?

Feel free to open an issue with the "question" label if you have any questions about contributing.

## Recognition

Contributors will be recognized in:
* The project README
* Release notes
* GitHub contributors page

Thank you for contributing! 🎉
