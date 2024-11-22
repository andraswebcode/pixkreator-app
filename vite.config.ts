import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
	/*server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				secure: false
			}
		}
	},*/
	build: {
		assetsDir: 'assets',
		rollupOptions: {
			output: {
				entryFileNames: 'assets/js/app.js',
				assetFileNames: ({ originalFileNames }) => {
					if (
						originalFileNames?.[0]?.endsWith('.woff2') ||
						originalFileNames?.[0]?.endsWith('.woff') ||
						originalFileNames?.[0]?.endsWith('.eot') ||
						originalFileNames?.[0]?.endsWith('.ttf')
					) {
						return 'assets/webfonts/materialicons[extname]';
					}
					return 'assets/css/app[extname]';
				}
			}
		}
	},
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
