import { controlsUtils, Path } from 'fabric';
import { Defaults } from '../mixins/defaults';

class PROPath extends Defaults(Path) {
	_createModifyControls() {
		this.controls = controlsUtils.createPathControls(this);
	}
}

export { PROPath };
