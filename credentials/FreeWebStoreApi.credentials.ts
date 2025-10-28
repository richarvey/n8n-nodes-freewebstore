import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FreeWebStoreApi implements ICredentialType {
	name = 'freeWebStoreApi';
	displayName = 'FreeWebStore API';
	documentationUrl = 'https://api.freewebstore.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your FreeWebStore API key. You can find this in your FreeWebStore account settings.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.freewebstore.com',
			url: '/category/',
			method: 'GET',
		},
	};
}
