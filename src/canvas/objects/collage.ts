import { FabricObject, FabricObjectProps, TClassProperties } from 'fabric';
import { Defaults } from '../mixins/defaults';
import { CollageItem } from '../../types/apps';

interface CollageProps extends FabricObjectProps {
	items: CollageItem[];
}

const COLLAGE_PROPS = ['items'] as const;

const collageDefaultValues: Partial<TClassProperties<PROCollage>> = {
	items: [
		{
			src: '',
			width: 50,
			height: 50
		},
		{
			src: '',
			width: 50,
			height: 50
		},
		{
			src: '',
			width: 50,
			height: 50
		},
		{
			src: '',
			width: 50,
			height: 50
		}
	]
};

class PROCollage extends Defaults(FabricObject) implements CollageProps {
	declare items: CollageItem[];

	private _elements: HTMLImageElement[] = [];

	static type = 'Collage';

	static cacheProperties = [...FabricObject.cacheProperties, ...COLLAGE_PROPS];

	static ownDefaults = collageDefaultValues;

	static getDefaults(): Record<string, any> {
		return {
			...super.getDefaults(),
			...PROCollage.ownDefaults
		};
	}

	static fromObject(object, options) {
		return new Promise<any>((resolve) => {
			resolve(new this(object));
		});
	}
}

export { PROCollage };
