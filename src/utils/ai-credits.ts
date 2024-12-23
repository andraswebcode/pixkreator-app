export type AICreditFeeKey =
	| 'generate-dall-e-3--standard--1024x1024'
	| 'generate-dall-e-3--standard--1792x1024'
	| 'generate-dall-e-3--standard--1024x1792'
	| 'generate-dall-e-3--hd--1024x1024'
	| 'generate-dall-e-3--hd--1792x1024'
	| 'generate-dall-e-3--hd--1024x1792'
	| 'generate-stable-image-core'
	| 'upscale'
	| 'removebg'
	| 'erase'
	| 'inpaint';

export const aiCreditFees: {
	[key in AICreditFeeKey]: number;
} = {
	'generate-dall-e-3--standard--1024x1024': 4,
	'generate-dall-e-3--standard--1792x1024': 8,
	'generate-dall-e-3--standard--1024x1792': 8,
	'generate-dall-e-3--hd--1024x1024': 8,
	'generate-dall-e-3--hd--1792x1024': 12,
	'generate-dall-e-3--hd--1024x1792': 12,
	'generate-stable-image-core': 3,
	upscale: 1,
	removebg: 2,
	erase: 3,
	inpaint: 3
};

export const getConfirmText = (action: AICreditFeeKey) =>
	`This action will cost ${aiCreditFees[action]} credits. Do you want to proceed?`;
