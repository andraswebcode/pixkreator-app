const invertAlphaMask = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
	const ctx = canvas.getContext('2d');
	const canvas2 = document.createElement('canvas');
	const ctx2 = canvas2.getContext('2d');

	if (!ctx || !ctx2) {
		return canvas;
	}

	canvas2.width = canvas.width;
	canvas2.height = canvas.height;

	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;

	for (let i = 0; i < data.length; i += 4) {
		const r = data[i]; // Red
		const g = data[i + 1]; // Green
		const b = data[i + 2]; // Blue
		const a = data[i + 3]; // Alpha

		if (a === 0) {
			data[i] = 0; // Red
			data[i + 1] = 0; // Green
			data[i + 2] = 0; // Blue
			data[i + 3] = 255;
		} else if (r === 0 && g === 0 && b === 0) {
			data[i] = 255; // Red
			data[i + 1] = 255; // Green
			data[i + 2] = 255; // Blue
		}
	}

	ctx2.putImageData(imageData, 0, 0);

	return canvas2;
};

export { invertAlphaMask };
