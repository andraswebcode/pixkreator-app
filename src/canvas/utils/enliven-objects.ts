import { BaseFabricObject, FabricObject } from 'fabric';
import { PROImage } from '../objects/image';
import { PRORect } from '../objects/rect';
import { PROCircle } from '../objects/circle';
import { PROEllipse } from '../objects/ellipse';
import { PROPath } from '../objects/path';
import { PROGroup } from '../objects/group';

const objectsMap = {
	group: PROGroup,
	image: PROImage,
	rect: PRORect,
	circle: PROCircle,
	ellipse: PROEllipse,
	path: PROPath
};

export const enlivenObjects = <T extends BaseFabricObject | FabricObject>(objects: any[]) =>
	new Promise<T[]>((resolve, reject) => {
		const promises = objects.map((obj) => objectsMap[obj.type.toLowerCase()].fromObject(obj));
		Promise.all(promises).then(resolve).catch(reject);
	});
