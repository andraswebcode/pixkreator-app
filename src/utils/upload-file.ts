import { MimeType } from '../types/common';

const uploadFile = (accept: MimeType | MimeType[] = [], multiple = false) => {
	const input = document.createElement('input');

	input.type = 'file';
	input.style.display = 'none';
	input.multiple = multiple;

	if (Array.isArray(accept)) {
		input.accept = accept.join(',');
	} else {
		input.accept = accept;
	}

	document.body.appendChild(input);
	input.click();

	return new Promise<FileList | null>((resolve, reject) => {
		input.addEventListener('change', () => {
			resolve(input.files);
		});
		input.addEventListener('error', (error) => {
			reject(error);
		});

		input.remove();
	});
};

export { uploadFile };
