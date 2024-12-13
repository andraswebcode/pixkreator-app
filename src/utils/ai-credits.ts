export type AICreditFeeKey = 'generate' | 'upscale' | 'removebg' | 'erase' | 'inpaint';

export const aiCreditFees: {
	[key in AICreditFeeKey]: number;
} = {
	generate: 3,
	upscale: 1,
	removebg: 2,
	erase: 3,
	inpaint: 3
};

export const getConfirmText = (action: AICreditFeeKey) =>
	`This action will cost ${aiCreditFees[action]} credits. Do you want to proceed?`;
