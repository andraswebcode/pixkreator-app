import { Extension, MimeType, PhotoSize } from '../types/common';

const clamp = (value: number, min: number, max: number): number =>
	Math.min(Math.max(value, min), max);

const toFixed = (value: any, fractionDigits = 2): number => {
	const _value = parseFloat(value) || 0;
	return Math.round(_value * 10 ** fractionDigits) / 10 ** fractionDigits || 0;
};

const randInt = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;

const uniqueId = (prefix?: string): string => {
	const pf = prefix ? prefix + '-' : '';
	const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let str = '',
		i;

	for (i = 0; i < 12; i++) {
		str += charset[randInt(0, charset.length - 1)];
	}

	return pf + str;
};

function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;

	return function (...args: Parameters<T>): void {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			func.apply(null, args);
		}, wait);
	};
}

// Thanks ChatGPT! :-)
const isEqual = (value1: any, value2: any, visited = new Set()): boolean => {
	// Check if both values are of the same type
	if (typeof value1 !== typeof value2) {
		return false;
	}

	// If values are primitive types, directly compare them
	if (typeof value1 !== 'object' || value1 === null || value2 === null) {
		return value1 === value2;
	}

	// If both values are the same object reference, they are equal
	if (value1 === value2) {
		return true;
	}

	// Check for circular references
	if (visited.has(value1) || visited.has(value2)) {
		return false;
	}

	visited.add(value1);
	visited.add(value2);

	// Check if both values are arrays
	if (Array.isArray(value1) && Array.isArray(value2)) {
		if (value1.length !== value2.length) {
			return false;
		}
		// Compare array elements recursively
		for (let i = 0; i < value1.length; i++) {
			if (!isEqual(value1[i], value2[i], visited)) {
				return false;
			}
		}
		return true;
	}

	// Check if both values are functions
	if (typeof value1 === 'function' && typeof value2 === 'function') {
		// Check if function sources are the same
		return value1.toString() === value2.toString();
	}

	// Check if both values are objects
	if (typeof value1 === 'object' && typeof value2 === 'object') {
		const keys1 = Object.keys(value1);
		const keys2 = Object.keys(value2);

		// Check if both objects have the same number of keys
		if (keys1.length !== keys2.length) {
			return false;
		}

		// Compare keys and values recursively
		for (const key of keys1) {
			if (!isEqual(value1[key], value2[key], visited)) {
				return false;
			}
		}
		return true;
	}

	// If values are of different types and not arrays or objects, they are not equal
	return false;
};

const unique = <T = any>(array: T[]): T[] => Array.from(new Set(array));

const getCroppedImageDimensions = (
	originalWidth: number,
	originalHeight: number,
	sizeKey: PhotoSize
): { width: number; height: number } => {
	if (sizeKey === 'src') {
		return { width: originalWidth, height: originalHeight };
	} else if (sizeKey === 'thumbnail') {
		return { width: 280, height: 280 };
	}

	const maxDimensions: { [key: string]: number } = {
		large: 1280,
		medium: 640
	};

	const maxDimension = maxDimensions[sizeKey];

	if (originalWidth > originalHeight) {
		const newWidth = maxDimension;
		const newHeight = Math.round((originalHeight / originalWidth) * maxDimension);
		return { width: newWidth, height: newHeight };
	} else {
		const newHeight = maxDimension;
		const newWidth = Math.round((originalWidth / originalHeight) * maxDimension);
		return { width: newWidth, height: newHeight };
	}
};

const formatBlobSize = (bytes: number): string => {
	if (bytes === 0) return '0 Bytes';

	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));

	const size = bytes / Math.pow(1024, i);
	return `${size.toFixed(2)} ${sizes[i]}`;
};

const mimeToExtension = (type: MimeType): Extension => {
	const map: {
		[key in MimeType]: Extension;
	} = {
		'image/png': 'png',
		'image/jpeg': 'jpg',
		'image/webp': 'webp'
	};

	return map[type];
};

export {
	clamp,
	toFixed,
	randInt,
	uniqueId,
	debounce,
	isEqual,
	unique,
	getCroppedImageDimensions,
	formatBlobSize,
	mimeToExtension
};
