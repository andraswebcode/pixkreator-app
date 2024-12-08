import {
	Constructor,
	Control,
	controlsUtils,
	FabricObject,
	FabricObjectProps,
	TOriginX,
	TOriginY
} from 'fabric';

type CurrentControl = 'transform' | 'modify';

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
		objectCaching = false;

		private _currentControls: CurrentControl = 'transform';

		toObject(propertiesToInclude: string[] = []) {
			return super.toObject(propertiesToInclude.concat(['id', 'name', 'selectable']));
		}

		switchControls(type?: CurrentControl) {
			if (type === 'transform' || this._currentControls === 'modify') {
				this.controls = controlsUtils.createObjectDefaultControls();
				this._currentControls = 'transform';
			} else if (type === 'modify' || this._currentControls === 'transform') {
				this.controls = this._getModifyControls();
				this._currentControls = 'modify';
			}
			this.lockMovementX = this._currentControls === 'modify';
			this.lockMovementY = this._currentControls === 'modify';
			this.setCoords();
			this.canvas?.requestRenderAll();
		}

		_getModifyControls(): Record<string, Control> {
			return {};
		}
	};
}

export { Defaults };
