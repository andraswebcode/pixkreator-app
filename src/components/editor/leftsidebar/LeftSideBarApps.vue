<script setup lang="ts">
import { computed } from 'vue';
import { useEditor } from '../../../store';
import { AppID } from '../../../types/apps';
import { apps } from '../../../utils/apps';

const editor = useEditor();
const appTitle = computed(() => apps.find(({ id }) => id === editor.activeApp)?.title);
const setActiveApp = (id: AppID) => {
	editor.activeApp = id;
};
</script>

<template>
	<div v-if="editor.activeApp" class="pa-4">
		<VRow class="mb-4" no-gutters align="center">
			<VCol cols="auto">
				<VBtn
					icon="mdi-keyboard-backspace"
					v-tooltip="'Back to Apps'"
					rounded="sm"
					size="x-small"
					@click="editor.activeApp = ''"
				/>
			</VCol>
			<VCol>
				<p class="ml-4">
					{{ appTitle }}
				</p>
			</VCol>
		</VRow>

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
