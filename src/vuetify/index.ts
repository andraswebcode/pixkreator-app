import { createVuetify } from 'vuetify';
import { mdi, aliases } from 'vuetify/iconsets/mdi';
import components from './components';
import defaults from './defaults';
import componentAliases from './aliases';

export default createVuetify({
	components,
	directives: {},
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi
		}
	},
	defaults: defaults,
	aliases: componentAliases
});
