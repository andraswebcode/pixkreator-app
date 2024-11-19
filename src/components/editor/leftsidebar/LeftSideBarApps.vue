<script setup lang="ts">
import { useEditor } from '../../../store';
import { IMAGES_FOLDER } from '../../../utils/constants';

const editor = useEditor();
</script>

<template>
	<div v-if="editor.activeApp" class="pa-4">
		<VBtn
			class="mb-4"
			block
			prepend-icon="mdi-keyboard-backspace"
			@click="editor.activeApp = ''"
		>
			Back to Apps
		</VBtn>
		<LeftSideBarAppQRGenerator v-if="editor.activeApp === 'qr-code-generator'" />
		<LeftSideBarAppChartMaker v-if="editor.activeApp === 'chart-maker'" />
		<LeftSideBarAppBGRemover v-else-if="editor.activeApp === 'background-remover'" />
		<LeftSideBarAppCPExtractor v-else-if="editor.activeApp === 'color-palette-extractor'" />
		<LeftSideBarAppPatternCreator v-else-if="editor.activeApp === 'pattern-creator'" />
	</div>
	<div v-else class="pa-4">
		<AppCard
			class="mb-4 bg-blue-grey-darken-4"
			title="QR Code Generator"
			description="Easily generate and customize QR codes for your designs."
			:img="IMAGES_FOLDER + 'app-qrcode.webp'"
			@click="editor.activeApp = 'qr-code-generator'"
		/>
		<AppCard
			class="mb-4 bg-blue-grey-darken-4"
			title="Chart Maker"
			description="Easily create stunning data visualizations for your projects."
			:img="IMAGES_FOLDER + 'app-qrcode.webp'"
			@click="editor.activeApp = 'chart-maker'"
		/>
		<AppCard
			class="mb-4 bg-blue-grey-darken-4"
			title="Background Remover"
			description="Easily remove backgrounds from your images with precision."
			:img="IMAGES_FOLDER + 'app-qrcode.webp'"
			@click="editor.activeApp = 'background-remover'"
		/>
		<AppCard
			class="mb-4 bg-blue-grey-darken-4"
			title="Pattern Creator"
			description="Design seamless patterns to elevate your backgrounds and layouts."
			:img="IMAGES_FOLDER + 'app-qrcode.webp'"
			@click="editor.activeApp = 'pattern-creator'"
		/>
		<AppCard
			class="mb-4 bg-blue-grey-darken-4"
			title="Color Palette Extractor"
			description="Extract color palettes from your images for a cohesive design."
			:img="IMAGES_FOLDER + 'app-qrcode.webp'"
			@click="editor.activeApp = 'color-palette-extractor'"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
