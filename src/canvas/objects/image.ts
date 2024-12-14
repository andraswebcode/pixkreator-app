import { FabricImage } from 'fabric';
import { Defaults } from '../mixins/defaults';
import { ImageCropControl } from '../controls/imagecrop';

class PROImage extends Defaults(FabricImage) {
	private _alphaMaskElement: HTMLImageElement = document.createElement('img');

	_getModifyControls() {
		return {
			mt: new ImageCropControl({
				x: 0,
				y: -0.5
			}),
			mb: new ImageCropControl({
				x: 0,
				y: 0.5
			}),
			ml: new ImageCropControl({
				x: -0.5,
				y: 0
			}),
			mr: new ImageCropControl({
				x: 0.5,
				y: 0
			})
		};
	}

	_renderFill(ctx: CanvasRenderingContext2D) {
		super._renderFill(ctx);
		const elementToDraw = this._alphaMaskElement;
		if (!elementToDraw.src) {
			return;
		}
		const scaleX = this._filterScalingX,
			scaleY = this._filterScalingY,
			w = this.width,
			h = this.height,
			cropX = Math.max(this.cropX, 0),
			cropY = Math.max(this.cropY, 0),
			elWidth = (elementToDraw as HTMLImageElement).naturalWidth || elementToDraw.width,
			elHeight = (elementToDraw as HTMLImageElement).naturalHeight || elementToDraw.height,
			sX = cropX * scaleX,
			sY = cropY * scaleY,
			sW = Math.min(w * scaleX, elWidth - sX),
			sH = Math.min(h * scaleY, elHeight - sY),
			x = -w / 2,
			y = -h / 2,
			maxDestW = Math.min(w, elWidth / scaleX - cropX),
			maxDestH = Math.min(h, elHeight / scaleY - cropY);

		elementToDraw && ctx.drawImage(elementToDraw, sX, sY, sW, sH, x, y, maxDestW, maxDestH);
	}

	setAlphaMask(blob: Blob | null) {
		const img = this._alphaMaskElement;
		if (blob === null) {
			if (img.src) {
				URL.revokeObjectURL(img.src);
			}
			img.src = '';
			this.canvas?.requestRenderAll();
		} else {
			img.src = URL.createObjectURL(blob);
		}

		img.onload = () => {
			this.canvas?.requestRenderAll();
		};
	}
}

export { PROImage };
