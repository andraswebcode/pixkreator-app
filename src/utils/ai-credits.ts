export type AICreditFeeKey =
	| 'assistant-design-meta'
	| 'assistant-mood-to-color'
	| 'generate-dall-e-3--standard--1024x1024'
	| 'generate-dall-e-3--standard--1792x1024'
	| 'generate-dall-e-3--standard--1024x1792'
	| 'generate-dall-e-3--hd--1024x1024'
	| 'generate-dall-e-3--hd--1792x1024'
	| 'generate-dall-e-3--hd--1024x1792'
	| 'generate-stable-image-core'
	| 'generate-stable-image-ultra'
	| 'upscale'
	| 'removebg'
	| 'erase'
	| 'inpaint';

export const aiCreditFees: {
	[key in AICreditFeeKey]: number;
} = {
	'assistant-design-meta': 1,
	'assistant-mood-to-color': 1,
	'generate-dall-e-3--standard--1024x1024': 4,
	'generate-dall-e-3--standard--1792x1024': 8,
	'generate-dall-e-3--standard--1024x1792': 8,
	'generate-dall-e-3--hd--1024x1024': 8,
	'generate-dall-e-3--hd--1792x1024': 12,
	'generate-dall-e-3--hd--1024x1792': 12,
	'generate-stable-image-core': 3,
	'generate-stable-image-ultra': 8,
	upscale: 1,
	removebg: 2,
	erase: 3,
	inpaint: 3
};

export const getConfirmText = (action: AICreditFeeKey, credits = 0) =>
	`This action will cost ${aiCreditFees[action]} credits. You have ${credits} credits available. Do you want to proceed?`;
