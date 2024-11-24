<script setup lang="ts">
import { useEditor } from '../../../store';
import { AppID } from '../../../types/apps';
import { apps } from '../../../utils/apps';

const editor = useEditor();
const setActiveApp = (id: AppID) => {
	editor.activeApp = id;
};
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
		<LeftSideBarAppImageUpscaler v-else-if="editor.activeApp === 'image-upscaler'" />
		<LeftSideBarAppSketchToImage v-else-if="editor.activeApp === 'sketch-to-image'" />
		<LeftSideBarAppEraseObject v-else-if="editor.activeApp === 'erase-object'" />
		<LeftSideBarAppInpaint v-else-if="editor.activeApp === 'inpaint'" />
		<LeftSideBarAppColorWheel v-else-if="editor.activeApp === 'color-wheel'" />
		<LeftSideBarAppCPExtractor v-else-if="editor.activeApp === 'color-palette-extractor'" />
		<LeftSideBarAppDesignGenerator v-else-if="editor.activeApp === 'design-generator'" />
		<LeftSideBarAppCollageMaker v-else-if="editor.activeApp === 'collage-maker'" />
		<LeftSideBarAppPatternCreator v-else-if="editor.activeApp === 'pattern-creator'" />
	</div>
	<div v-else class="pa-4">
		<AppCard
			v-for="app in apps"
			:key="app.id"
			class="mb-4 bg-blue-grey-darken-4"
			v-bind="app"
			@click="setActiveApp(app.id)"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
