import { Group, loadSVGFromURL } from 'fabric';

const parseSVG = (url: string) => {
	return loadSVGFromURL(url).then(({ objects, options, ...rest }) => {
		const layers = objects.map((obj) => ({
			...obj?.toJSON(),
			originX: 'center',
			originY: 'center'
		}));
		const group = new Group(
			objects.map((obj) => {
				obj?.set({
					originX: 'center',
					originY: 'center'
				});
				return obj;
			}) as any,
			{
				originX: 'center',
				originY: 'center'
			}
		);

		return {
			layers,
			group: group.toJSON(),
			width: options.width,
			height: options.height
		};
	});
};

export { parseSVG };
