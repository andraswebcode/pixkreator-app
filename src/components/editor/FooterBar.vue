<script setup lang="ts">
import {
	mdiCog,
	mdiFitToScreen,
	mdiHandBackLeft,
	mdiHelpCircle,
	mdiLayers,
	mdiMagnifyMinus,
	mdiMagnifyPlus,
	mdiMessageText
} from '@mdi/js';
import { useEditor } from '../../store';
import { MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } from '../../utils/constants';
import useFitToScreen from '../../hooks/fittoscreen';
import { useDisplay } from 'vuetify';

const { smAndUp, mdAndUp } = useDisplay();
const editor = useEditor();
const fitToScreen = useFitToScreen();
const toggleList = () => {
	editor.tool = editor.tool === 'list' ? '' : 'list';
};
const switchPan = () => {
	editor.mode = editor.mode === 'pan' ? 'select' : 'pan';
};
const zoom = (dir: string) => {
	if (dir === 'in') {
		editor.zoom += 0.1;
	} else {
		editor.zoom -= 0.1;
	}
};
</script>

<template>
	<VFooter app height="56px">
		<VContainer>
			<VRow justify="space-between" align="center">
				<VCol cols="auto">
					<VRow no-gutters justify="center" align="center">
						<VCol cols="auto">
							<VBtn :icon="mdiLayers" v-tooltip:top="'Layers'" @click="toggleList" />
						</VCol>
						<VCol cols="auto">
							<VBtn :icon="mdiCog" v-tooltip:top="'Settings'" />
						</VCol>
					</VRow>
				</VCol>
				<VCol cols="auto">
					<VRow no-gutters justify="center" align="center">
						<VCol cols="auto">
							<VBtn
								:color="editor.mode === 'pan' ? 'primary' : ''"
								:icon="mdiHandBackLeft"
								v-tooltip:top="'Pan Mode'"
								@click="switchPan"
							/>
						</VCol>
						<VCol cols="auto">
							<VBtn
								:icon="mdiFitToScreen"
								v-tooltip:top="'Fit to Screen'"
								@click="fitToScreen"
							/>
						</VCol>
						<VCol v-if="smAndUp" cols="auto">
							<VSlider
								v-model="editor.zoom"
								:min="MIN_ZOOM"
								:max="MAX_ZOOM"
								:step="ZOOM_STEP"
								:width="mdAndUp ? 400 : 170"
								thumb-label
							>
								<template v-slot:prepend>
									<VBtn
										:icon="mdiMagnifyMinus"
										v-tooltip:top="'Zoom Out'"
										:disabled="editor.zoom === MIN_ZOOM"
										@click="zoom('out')"
									/>
								</template>
								<template v-slot:append>
									<VBtn
										:icon="mdiMagnifyPlus"
										v-tooltip:top="'Zoom in'"
										:disabled="editor.zoom === MAX_ZOOM"
										@click="zoom('in')"
									/>
								</template>
								<template v-slot:thumb-label="{ modelValue }">
									{{
										// @ts-ignore
										parseInt(modelValue * 100) + '%'
									}}
								</template>
							</VSlider>
						</VCol>
					</VRow>
				</VCol>
				<VCol cols="auto">
					<VRow no-gutters justify="center" align="center">
						<VCol cols="auto">
							<VBtn :icon="mdiMessageText" v-tooltip:top="'Feedback'" />
						</VCol>
						<VCol cols="auto">
							<VBtn :icon="mdiHelpCircle" v-tooltip:top="'Help'" />
						</VCol>
					</VRow>
				</VCol>
			</VRow>
		</VContainer>
	</VFooter>
</template>

<style scoped lang="scss"></style>
