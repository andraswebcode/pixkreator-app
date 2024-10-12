import { PencilBrush, Shadow } from 'fabric';
import { PROPath } from '../objects/path';

class PROPencilBrush extends PencilBrush {
	public createPath(pathData) {
		const path = new PROPath(pathData, {
			fill: null,
			stroke: this.color,
			strokeWidth: this.width,
			strokeLineCap: this.strokeLineCap,
			strokeMiterLimit: this.strokeMiterLimit,
			strokeLineJoin: this.strokeLineJoin,
			strokeDashArray: this.strokeDashArray
		});

		if (this.shadow) {
			this.shadow.affectStroke = true;
			path.shadow = new Shadow(this.shadow);
		}

		return path;
	}
}

export { PROPencilBrush };
