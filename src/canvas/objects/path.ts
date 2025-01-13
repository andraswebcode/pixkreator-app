import { controlsUtils, Path, util } from 'fabric';
import { Defaults } from '../mixins/defaults';
import { toFixed } from '../../utils/functions';

class PROPath extends Defaults(Path) {
	_getModifyControls() {
		return controlsUtils.createPathControls(this);
	}
	_setPath(path: util.TComplexPathData | string, adjustPosition?: boolean) {
		const _path = util.makePathSimpler(Array.isArray(path) ? path : util.parsePath(path));

		// @ts-ignore
		this.path = _path.map((c) => c.map((n) => (typeof n === 'number' ? toFixed(n) : n)));

		this.setBoundingBox(adjustPosition);
	}
}

export { PROPath };
