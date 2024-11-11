import {
	Constructor,
	controlsUtils,
	FabricObject,
	FabricObjectProps,
	TOriginX,
	TOriginY
} from 'fabric';

function Defaults<TBase extends Constructor<FabricObject>>(Base: TBase) {
	return class Defaults extends Base implements Partial<FabricObjectProps> {
		cornerStyle: 'rect' | 'circle' = 'circle';
		cornerSize = 10;
		touchCornerSize = 25;
		cornerColor = '#80b682';
		transparentCorners = false;
		borderColor = '#80b682';
		borderDashArray = [4, 2];
		borderOpacityWhenMoving = 0.8;
		originX: TOriginX = 'center';
		originY: TOriginY = 'center';

		private _currentControls: 'transform' | 'modify' = 'transform';

		toObject(propertiesToInclude: string[] = []) {
			return super.toObject(propertiesToInclude.concat(['id', 'name', 'selectable']));
		}

		switchControls() {
			if (this._currentControls === 'modify') {
				this.controls = controlsUtils.createObjectDefaultControls();
				this._currentControls = 'transform';
			} else {
				this._createModifyControls();
				this._currentControls = 'modify';
			}
			this.setCoords();
			this.canvas?.requestRenderAll();
		}

		_createModifyControls() {}
	};
}

export { Defaults };
