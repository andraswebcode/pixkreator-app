export const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL;

export const PRICING_URL = import.meta.env.VITE_WEBSITE_URL + 'pricing/';

export const LOGO_SRC = import.meta.env.VITE_ASSETS_URL + 'images/logowhite.png';

export const IMAGES_FOLDER = import.meta.env.VITE_ASSETS_URL + 'images/';

export const MIN_ZOOM = 0.01;

export const MAX_ZOOM = 3;

export const ZOOM_STEP = 0.01;

export const SNAP_THRESHOLD = 10;

export const DETAILS_DIALOG_WIDTH = 1200;

export const SMALL_DIALOG_WIDTH = 400;

export const LOGIN_DIALOG_WIDTH = 500;

export const SHARE_IMAGE_MAX_SIZE = 2000;

export const THUMBNAIL_MAX_SIZE = 200;

export const PHOTO_SIZES = [
	{
		label: 'Original',
		value: 'src'
	},
	{
		label: 'Large',
		value: 'large'
	},
	{
		label: 'Medium',
		value: 'medium'
	},
	{
		label: 'Thumbnail',
		value: 'thumbnail'
	}
];

export const PHOTO_ORIENTATIONS = [
	{
		label: 'All',
		value: ''
	},
	{
		label: 'Landscape',
		value: 'landscape'
	},
	{
		label: 'Portrait',
		value: 'portrait'
	},
	{
		label: 'Square',
		value: 'square'
	}
];
