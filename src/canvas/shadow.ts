import { Shadow, TClassProperties } from 'fabric';

const defaults: Partial<TClassProperties<Shadow>> = {
	...Shadow.ownDefaults,
	affectStroke: true,
	nonScaling: true
};

class PROShadow extends Shadow {
	static ownDefaults = defaults;

	affectStroke = true;
	nonScaling = true;
}

export { PROShadow };
