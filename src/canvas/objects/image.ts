import { FabricImage } from 'fabric';
import { Defaults } from '../mixins/defaults';
import { ImageCropControl } from '../controls/imagecrop';

class PROImage extends Defaults(FabricImage) {
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
}

export { PROImage };
