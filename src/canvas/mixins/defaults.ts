import { Constructor, FabricObjectProps, TOriginX, TOriginY } from 'fabric';

function Defaults<TBase extends Constructor>(Base: TBase) {
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
	};
}

export { Defaults };
