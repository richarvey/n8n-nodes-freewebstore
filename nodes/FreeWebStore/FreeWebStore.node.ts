import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

export class FreeWebStore implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FreeWebStore',
		name: 'freeWebStore',
		icon: 'file:freewebstore.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with FreeWebStore API',
		defaults: {
			name: 'FreeWebStore',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'freeWebStoreApi',
				required: true,
			},
		],
		properties: [
			// Resource Selection
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Category',
						value: 'category',
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Product',
						value: 'product',
					},
				],
				default: 'product',
			},

			// CATEGORY OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['category'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get all categories',
						action: 'Get many categories',
					},
				],
				default: 'getMany',
			},

			// PRODUCT OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['product'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new product',
						action: 'Create a product',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a product',
						action: 'Delete a product',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a product',
						action: 'Get a product',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get all products',
						action: 'Get many products',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a product',
						action: 'Update a product',
					},
				],
				default: 'getMany',
			},

			// Product ID (for get, update, delete)
			{
				displayName: 'Product ID',
				name: 'productId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the product',
			},

			// Product List Options
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['getMany'],
					},
				},
				options: [
					{
						displayName: 'Per Page',
						name: 'per_page',
						type: 'number',
						default: 50,
						description: 'Number of results per page',
					},
					{
						displayName: 'Sort',
						name: 'sort',
						type: 'string',
						default: '',
						description: 'Attribute name to sort by',
					},
					{
						displayName: 'Sort Order',
						name: 'sort_order',
						type: 'options',
						options: [
							{
								name: 'Ascending',
								value: 'asc',
							},
							{
								name: 'Descending',
								value: 'desc',
							},
						],
						default: 'asc',
						description: 'Sort order',
					},
					{
						displayName: 'Start',
						name: 'start',
						type: 'number',
						default: 0,
						description: 'Start position',
					},
					{
						displayName: 'Category ID',
						name: 'categoryId',
						type: 'string',
						default: '',
						description: 'Filter by category ID',
					},
				],
			},

			// Product Data (for create/update)
			{
				displayName: 'Product Data',
				name: 'productData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['create', 'update'],
					},
				},
				default: '{\n  "core": {\n    "name": "Product Name",\n    "sku": "PROD-001",\n    "stock": 100,\n    "pricing": {\n      "baseprice": 19.99\n    }\n  }\n}',
				description: 'Product data as JSON object. See API documentation for full schema.',
			},

			// CUSTOMER OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['customer'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new customer',
						action: 'Create a customer',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a customer',
						action: 'Delete a customer',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a customer',
						action: 'Get a customer',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get all customers',
						action: 'Get many customers',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a customer',
						action: 'Update a customer',
					},
				],
				default: 'getMany',
			},

			// Customer ID
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the customer',
			},

			// Customer List Options
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['getMany'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 100,
						description: 'Number of results to return',
					},
					{
						displayName: 'Include Deleted',
						name: 'includedeleted',
						type: 'boolean',
						default: true,
						description: 'Whether to include deleted customers',
					},
					{
						displayName: 'Sort',
						name: 'sort',
						type: 'options',
						options: [
							{ name: 'Created', value: 'created' },
							{ name: 'Created (Desc)', value: 'createddesc' },
							{ name: 'Company Name', value: 'companyname' },
							{ name: 'Company Name (Desc)', value: 'companynamedesc' },
							{ name: 'Email', value: 'email' },
							{ name: 'Email (Desc)', value: 'emaildesc' },
							{ name: 'Forename', value: 'forename' },
							{ name: 'Forename (Desc)', value: 'forenamedesc' },
							{ name: 'Surname', value: 'surname' },
							{ name: 'Surname (Desc)', value: 'surnamedesc' },
							{ name: 'Total Orders', value: 'total_orders' },
							{ name: 'Total Orders (Desc)', value: 'total_ordersdesc' },
							{ name: 'Total Sales', value: 'total_sales' },
							{ name: 'Total Sales (Desc)', value: 'total_salesdesc' },
						],
						default: 'createddesc',
						description: 'Sort order',
					},
				],
			},

			// Customer Data
			{
				displayName: 'Customer Data',
				name: 'customerData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['customer'],
						operation: ['create', 'update'],
					},
				},
				default: '{\n  "email": "customer@example.com",\n  "forename": "John",\n  "surname": "Doe",\n  "companyname": "Example Corp"\n}',
				description: 'Customer data as JSON object',
			},

			// ORDER OPERATIONS
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['order'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get an order',
						action: 'Get an order',
					},
					{
						name: 'Get Many',
						value: 'getMany',
						description: 'Get all orders',
						action: 'Get many orders',
					},
				],
				default: 'getMany',
			},

			// Order ID
			{
				displayName: 'Order ID',
				name: 'orderId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the order',
			},

			// Order List Options
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['getMany'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 100,
						description: 'Number of results to return',
					},
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'Number of results to skip',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'All', value: 'all' },
							{ name: 'Open', value: 'open' },
							{ name: 'Closed', value: 'closed' },
							{ name: 'Problem', value: 'problem' },
							{ name: 'Open Problem', value: 'openproblem' },
							{ name: 'New', value: 'new' },
							{ name: 'Starred', value: 'starred' },
							{ name: 'Cart', value: 'cart' },
							{ name: 'Canceled', value: 'canceled' },
							{ name: 'Cancelled', value: 'cancelled' },
						],
						default: 'all',
						description: 'Filter by order status',
					},
					{
						displayName: 'Sort',
						name: 'sort',
						type: 'options',
						options: [
							{ name: 'Created', value: 'created' },
							{ name: 'Created (Desc)', value: 'createddesc' },
							{ name: 'Order No', value: 'orderno' },
							{ name: 'Order No (Desc)', value: 'ordernodesc' },
						],
						default: 'createddesc',
						description: 'Sort order',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Comma separated list of tags',
					},
					{
						displayName: 'Start Date',
						name: 'startdate',
						type: 'dateTime',
						default: '',
						description: 'Filter orders from this date (ISO 8601 format)',
					},
					{
						displayName: 'End Date',
						name: 'enddate',
						type: 'dateTime',
						default: '',
						description: 'Filter orders until this date (ISO 8601 format)',
					},
					{
						displayName: 'Fields',
						name: 'fields',
						type: 'string',
						default: '',
						description: 'Comma separated list of optional fields (customer, tags)',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Get credentials
		const credentials = await this.getCredentials('freeWebStoreApi');
		const apiKey = credentials.apiKey as string;
		const baseUrl = 'https://api.freewebstore.com';

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				if (resource === 'category') {
					// CATEGORY OPERATIONS
					if (operation === 'getMany') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${baseUrl}/category/`,
							headers: {
								'x-api-key': apiKey,
							},
							json: true,
						});
					}
				} else if (resource === 'product') {
					// PRODUCT OPERATIONS
					if (operation === 'getMany') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {};

						if (additionalFields.per_page) qs.per_page = additionalFields.per_page;
						if (additionalFields.sort) qs.sort = additionalFields.sort;
						if (additionalFields.sort_order) qs.sort_order = additionalFields.sort_order;
						if (additionalFields.start) qs.start = additionalFields.start;
						if (additionalFields.categoryId) qs.categoryId = additionalFields.categoryId;

						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${baseUrl}/product/`,
							headers: {
								'x-api-key': apiKey,
							},
							qs,
							json: true,
						});
					} else if (operation === 'get') {
						const productId = this.getNodeParameter('productId', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${baseUrl}/product/${productId}`,
							headers: {
								'x-api-key': apiKey,
							},
							json: true,
						});
					} else if (operation === 'create') {
						const productDataString = this.getNodeParameter('productData', i) as string;
						const productData = JSON.parse(productDataString);

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${baseUrl}/product/`,
							headers: {
								'x-api-key': apiKey,
								'Content-Type': 'application/json',
							},
							body: productData,
							json: true,
						});
					} else if (operation === 'update') {
						const productId = this.getNodeParameter('productId', i) as string;
						const productDataString = this.getNodeParameter('productData', i) as string;
						const productData = JSON.parse(productDataString);

						responseData = await this.helpers.httpRequest({
							method: 'PUT',
							url: `${baseUrl}/product/${productId}`,
							headers: {
								'x-api-key': apiKey,
								'Content-Type': 'application/json',
							},
							body: productData,
							json: true,
						});
					} else if (operation === 'delete') {
						const productId = this.getNodeParameter('productId', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'DELETE',
							url: `${baseUrl}/product/${productId}`,
							headers: {
								'x-api-key': apiKey,
							},
							json: true,
						});
					}
				} else if (resource === 'customer') {
					// CUSTOMER OPERATIONS
					if (operation === 'getMany') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {};

						if (additionalFields.limit) qs.limit = additionalFields.limit;
						if (additionalFields.includedeleted !== undefined) qs.includedeleted = additionalFields.includedeleted;
						if (additionalFields.sort) qs.sort = additionalFields.sort;

						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${baseUrl}/customers/`,
							headers: {
								'x-api-key': apiKey,
							},
							qs,
							json: true,
						});
					} else if (operation === 'get') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${baseUrl}/customers/${customerId}`,
							headers: {
								'x-api-key': apiKey,
							},
							json: true,
						});
					} else if (operation === 'create') {
						const customerDataString = this.getNodeParameter('customerData', i) as string;
						const customerData = JSON.parse(customerDataString);

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${baseUrl}/customers/`,
							headers: {
								'x-api-key': apiKey,
								'Content-Type': 'application/json',
							},
							body: customerData,
							json: true,
						});
					} else if (operation === 'update') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const customerDataString = this.getNodeParameter('customerData', i) as string;
						const customerData = JSON.parse(customerDataString);

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${baseUrl}/customers/${customerId}`,
							headers: {
								'x-api-key': apiKey,
								'Content-Type': 'application/json',
							},
							body: customerData,
							json: true,
						});
					} else if (operation === 'delete') {
						const customerId = this.getNodeParameter('customerId', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'DELETE',
							url: `${baseUrl}/customers/${customerId}`,
							headers: {
								'x-api-key': apiKey,
							},
							json: true,
						});
					}
				} else if (resource === 'order') {
					// ORDER OPERATIONS
					if (operation === 'getMany') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {};

						if (additionalFields.limit) qs.limit = additionalFields.limit;
						if (additionalFields.offset) qs.offset = additionalFields.offset;
						if (additionalFields.status) qs.status = additionalFields.status;
						if (additionalFields.sort) qs.sort = additionalFields.sort;
						if (additionalFields.tags) qs.tags = additionalFields.tags;
						if (additionalFields.startdate) qs.startdate = additionalFields.startdate;
						if (additionalFields.enddate) qs.enddate = additionalFields.enddate;
						if (additionalFields.fields) qs.fields = additionalFields.fields;

						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${baseUrl}/orders/`,
							headers: {
								'x-api-key': apiKey,
							},
							qs,
							json: true,
						});
					} else if (operation === 'get') {
						const orderId = this.getNodeParameter('orderId', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${baseUrl}/orders/${orderId}`,
							headers: {
								'x-api-key': apiKey,
							},
							json: true,
						});
					}
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData);
				} else {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
					returnData.push({ error: errorMessage });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
