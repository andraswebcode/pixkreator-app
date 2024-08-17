import { onMounted, Ref, ref } from 'vue';
import Rect from '../canvas/shapes/rect';
import { useProject } from '../store';
import Canvas from '../canvas/canvas';

const useCanvas: () => {
	canvasRef: Ref<HTMLCanvasElement | null>;
	getFabricCanvas: () => Canvas | null;
} = () => {
	const canvasRef = ref<HTMLCanvasElement | null>(null);
	let fabricCanvas: Canvas | null = null;
	const getFabricCanvas: () => Canvas | null = () => fabricCanvas;
	const project = useProject();

	onMounted(() => {
		const { clientWidth = 0, clientHeight = 0 } = document.getElementById('canvas') || {};
		if (!fabricCanvas) {
			fabricCanvas = new Canvas(canvasRef.value as HTMLCanvasElement, {
				backgroundColor: '#FFF',
				width: clientWidth,
				height: clientHeight,
				clipPath: new Rect({
					top: 0,
					left: 0,
					width: project.width,
					height: project.height,
					originX: 'left',
					originY: 'top'
				})
			});
		}
	});

	return { canvasRef, getFabricCanvas };
};

export default useCanvas;
