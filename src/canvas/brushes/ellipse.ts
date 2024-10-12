import { Point } from 'fabric';
import { ShapeBrush } from './shape';
import { PROEllipse } from '../objects/ellipse';
import { toFixed } from '../../utils/functions';
import { PROCircle } from '../objects/circle';

class PROEllipseBrush extends ShapeBrush {
	protected _finalizeAndAddRect() {
		const { size, position } = this._getSizeAndPosition();
		const options = {
			left: toFixed(position.x - this.width / 2),
			top: toFixed(position.y - this.width / 2),
			stroke: this.color,
			strokeWidth: this.width,
			strokeLineCap: this.strokeLineCap,
			strokeMiterLimit: this.strokeMiterLimit,
			strokeLineJoin: this.strokeLineJoin,
			strokeDashArray: this.strokeDashArray,
			fill: this.fill,
			shadow: this.shadow
		};
		const shape =
			size.x === size.y
				? new PROCircle({
						radius: toFixed(Math.abs(size.x / 2)),
						...options
				  })
				: new PROEllipse({
						rx: toFixed(Math.abs(size.x / 2)),
						ry: toFixed(Math.abs(size.y / 2)),
						...options
				  });

		this.canvas.add(shape);
		this.canvas.fire('path:created', {
			path: shape
		});
	}

	protected _renderShape(ctx: CanvasRenderingContext2D) {
		const { size, position } = this._getSizeAndPosition();
		const pos = position.add(
			new Point(size.x < 0 ? -size.x : size.x, size.y < 0 ? -size.y : size.y).scalarDivide(2)
		);
		ctx.ellipse(pos.x, pos.y, Math.abs(size.x / 2), Math.abs(size.y / 2), 0, 0, Math.PI * 2);
	}
}

export { PROEllipseBrush };
