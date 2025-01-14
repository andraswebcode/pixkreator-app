import { util } from 'fabric';

const enlivenObjects = (objects: any[], options?: util.EnlivenObjectOptions) =>
	util.enlivenObjects(objects, options);

export { enlivenObjects };
