import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vuetify({
			autoImport: true
		}),
		components({
			resolvers: [VuetifyResolver()]
		})
	]
});
