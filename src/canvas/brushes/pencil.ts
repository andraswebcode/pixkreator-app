import { PencilBrush } from 'fabric';
import { PROPath } from '../objects/path';
import { PROShadow } from '../shadow';

class PROPencilBrush extends PencilBrush {
	fill = 'rgba(0, 0, 0, 0)';

	public createPath(pathData) {
		const path = new PROPath(pathData, {
			fill: this.fill,
			stroke: this.color,
			strokeWidth: this.width,
			strokeLineCap: this.strokeLineCap,
			strokeMiterLimit: this.strokeMiterLimit,
			strokeLineJoin: this.strokeLineJoin,
			strokeDashArray: this.strokeDashArray
		});

		if (this.shadow) {
			this.shadow.affectStroke = true;
			path.shadow = new PROShadow(this.shadow);
		}

		return path;
	}
}

export { PROPencilBrush };
