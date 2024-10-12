import { ShapeBrush } from './shape';
import { PRORect } from '../objects/rect';
import { toFixed } from '../../utils/functions';

class PRORectBrush extends ShapeBrush {
	protected _finalizeAndAddRect() {
		const { size, position } = this._getSizeAndPosition();
		const shape = new PRORect({
			left: toFixed(position.x - this.width / 2),
			top: toFixed(position.y - this.width / 2),
			width: toFixed(Math.abs(size.x)),
			height: toFixed(Math.abs(size.y)),
			stroke: this.color,
			strokeWidth: this.width,
			strokeLineCap: this.strokeLineCap,
			strokeMiterLimit: this.strokeMiterLimit,
			strokeLineJoin: this.strokeLineJoin,
			strokeDashArray: this.strokeDashArray,
			fill: this.fill,
			shadow: this.shadow
		});

		this.canvas.add(shape);
		this.canvas.fire('path:created', {
			path: shape
		});
	}

	protected _renderShape(ctx: CanvasRenderingContext2D) {
		const { size, position } = this._getSizeAndPosition();
		ctx.rect(position.x, position.y, Math.abs(size.x), Math.abs(size.y));
	}
}

export { PRORectBrush };
