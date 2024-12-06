export type AICreditFeeKey = 'generate' | 'upscale' | 'removebg';

export const aiCreditFees: {
	[key in AICreditFeeKey]: number;
} = {
	generate: 3,
	upscale: 1,
	removebg: 2
};

export const getConfirmText = (action: AICreditFeeKey) =>
	`This action will cost ${aiCreditFees[action]} credits. Do you want to proceed?`;
