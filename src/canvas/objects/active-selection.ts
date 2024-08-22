import { ActiveSelection, TOriginX, TOriginY } from 'fabric';

import { Defaults } from '../mixins/defaults';

class PROActiveSelection extends Defaults(ActiveSelection) {
	transparentCorners = true;
	borderDashArray = [4, 8];
	originX: TOriginX = 'left';
	originY: TOriginY = 'top';
}

export { PROActiveSelection };
