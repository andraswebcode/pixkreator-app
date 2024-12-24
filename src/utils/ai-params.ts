import { ImageModel } from '../types/ai';

const imageModels: {
	label: string;
	value: ImageModel;
}[] = [
	{
		label: 'Stable Image Core',
		value: 'stable-image-core'
	},
	{
		label: 'Stable Image Ultra',
		value: 'stable-image-ultra'
	},
	{
		label: 'DALL-E',
		value: 'dall-e-3'
	}
];

const openaiQualities = [
	{
		label: 'Standard',
		value: 'standard'
	},
	{
		label: 'HD',
		value: 'hd'
	}
];

const openaiSizes = [
	{
		label: 'Square',
		value: '1024x1024'
	},
	{
		label: 'Landscape',
		value: '1792x1024'
	},
	{
		label: 'Portrait',
		value: '1024x1792'
	}
];

const openaiStyles = [
	{
		label: 'Vivid',
		value: 'vivid'
	},
	{
		label: 'Natural',
		value: 'natural'
	}
];

const staiOutputFormats = [
	{
		label: 'JPEG Image',
		value: 'jpeg'
	},
	{
		label: 'PNG Image',
		value: 'png'
	},
	{
		label: 'WebP Image',
		value: 'webp'
	}
];

const staiStylePresets = [
	{
		label: 'No Style',
		value: ''
	},
	{
		label: '3D Model',
		value: '3d-model'
	},
	{
		label: 'Analog Film',
		value: 'analog-film'
	},
	{
		label: 'Anime',
		value: 'anime'
	},
	{
		label: 'Cinematic',
		value: 'cinematic'
	},
	{
		label: 'Comic Book',
		value: 'comic-book'
	},
	{
		label: 'Digital Art',
		value: 'digital-art'
	},
	{
		label: 'Enhance',
		value: 'enhance'
	},
	{
		label: 'Fantasy Art',
		value: 'fantasy-art'
	},
	{
		label: 'Isometric',
		value: 'isometric'
	},
	{
		label: 'Line Art',
		value: 'line-art'
	},
	{
		label: 'Low Poly',
		value: 'low-poly'
	},
	{
		label: 'Modeling Compound',
		value: 'modeling-compound'
	},
	{
		label: 'Neon Punk',
		value: 'neon-punk'
	},
	{
		label: 'Origami',
		value: 'origami'
	},
	{
		label: 'Photographic',
		value: 'photographic'
	},
	{
		label: 'Pixel Art',
		value: 'pixel-art'
	},
	{
		label: 'Tile Texture',
		value: 'tile-texture'
	}
];

const staiAspectRatios = [
	{
		label: 'Square - 1:1',
		value: '1:1'
	},
	{
		label: 'Portrait - 2:3',
		value: '2:3'
	},
	{
		label: 'DSLR - 3:2',
		value: '3:2'
	},
	{
		label: 'Instagram Post - 4:5',
		value: '4:5'
	},
	{
		label: 'Old Monitor - 5:4',
		value: '5:4'
	},
	{
		label: 'Widescreen - 16:9',
		value: '16:9'
	},
	{
		label: 'Vertical Video - 9:16',
		value: '9:16'
	},
	{
		label: 'Ultra Widescreen - 21:9',
		value: '21:9'
	},
	{
		label: 'Ultra Portrait - 9:21',
		value: '9:21'
	}
];

export {
	imageModels,
	openaiQualities,
	openaiSizes,
	openaiStyles,
	staiOutputFormats,
	staiStylePresets,
	staiAspectRatios
};
