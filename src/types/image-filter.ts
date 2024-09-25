export type ImageFilterType =
	| 'Sepia'
	| 'Grayscale'
	| 'Invert'
	| 'BlackWhite'
	| 'Brownie'
	| 'Vintage'
	| 'Kodachrome'
	| 'Technicolor'
	| 'Polaroid'
	| 'RemoveColor'
	| 'Brightness'
	| 'Gamma'
	| 'Contrast'
	| 'Saturation'
	| 'Vibrance'
	| 'HueRotation'
	| 'Noise'
	| 'Pixelate'
	| 'Blur'
	| 'Sharpen'
	| 'Emboss'
	| 'BlendColor'
	| 'Duotone';

export type ImageFilter = {
	type: ImageFilterType;
};
