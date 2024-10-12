import { BaseBrush, Point, TBrushEventData } from 'fabric';

abstract class ShapeBrush extends BaseBrush {
	public fill = 'rgba(0, 0, 0, 0)';
	private _startPosition = new Point();
	private _currentPosition = new Point();
	private _ctrlKey = false;

	public constructor(canvas) {
		super(canvas);
		this._reset();
	}

	public onMouseDown(pointer: Point): void {
		this._reset();
		this._startPosition.setFromPoint(pointer);
	}

	public onMouseMove(pointer: Point, ev: TBrushEventData): void {
		this._ctrlKey = ev.e.ctrlKey || ev.e.metaKey;
		this._currentPosition.setFromPoint(pointer);
		this.canvas.clearContext(this.canvas.contextTop);
		this._render();
	}

	public onMouseUp(): boolean | void {
		if (
			this._currentPosition.x !== this._startPosition.x &&
			this._currentPosition.y !== this._startPosition.y
		) {
			this._finalizeAndAddRect();
		}
		this.canvas.clearContext(this.canvas.contextTop);
		this._ctrlKey = false;
	}

	public _render(): void {
		const ctx = this.canvas.contextTop;

		this._saveAndTransform(ctx);
		ctx.beginPath();
		this._renderShape(ctx);
		ctx.fill();
		if (this.width) {
			ctx.stroke();
		}
		ctx.restore();
	}

	protected _reset() {
		if (this.fill) {
			const ctx = this.canvas.contextTop;
			this._setBrushStyles(ctx);
			ctx.fillStyle = this.fill;
		}
		this._setShadow();
		this._startPosition.setXY(0, 0);
		this._currentPosition.setXY(0, 0);
	}

	protected _getSizeAndPosition() {
		const startPos = this._startPosition;
		const currPos = this._currentPosition;
		const size = currPos.subtract(startPos);

		if (this._ctrlKey) {
			size.x = Math.max(size.x, size.y);
			size.y = Math.max(size.x, size.y);
		}

		const position = startPos.subtract(
			new Point(size.x < 0 ? Math.abs(size.x) : 0, size.y < 0 ? Math.abs(size.y) : 0)
		);

		return {
			size,
			position
		};
	}

	protected abstract _renderShape(ctx: CanvasRenderingContext2D);
	protected abstract _finalizeAndAddRect();
}

export { ShapeBrush };
