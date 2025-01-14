import { Shadow, TClassProperties } from 'fabric';

const defaults: Partial<TClassProperties<Shadow>> = {
	...Shadow.ownDefaults,
	affectStroke: true
};

class PROShadow extends Shadow {
	static ownDefaults = defaults;

	affectStroke = true;
}

export { PROShadow };
