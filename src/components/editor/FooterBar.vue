<script setup lang="ts">
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
const toggleSettings = () => {
	editor.tool = editor.tool === 'settings' ? '' : 'settings';
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
							<VBtn icon="mdi-layers" v-tooltip:top="'Layers'" @click="toggleList" />
						</VCol>
						<VCol cols="auto">
							<VBtn
								icon="mdi-cog"
								v-tooltip:top="'Settings'"
								@click="toggleSettings"
							/>
						</VCol>
					</VRow>
				</VCol>
				<VCol cols="auto">
					<VRow no-gutters justify="center" align="center">
						<VCol cols="auto">
							<VBtn
								:color="editor.mode === 'pan' ? 'primary' : ''"
								icon="mdi-hand-back-left"
								v-tooltip:top="'Pan Mode'"
								@click="switchPan"
							/>
						</VCol>
						<VCol cols="auto">
							<VBtn
								icon="mdi-fit-to-screen"
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
										icon="mdi-magnify-minus"
										v-tooltip:top="'Zoom Out'"
										:disabled="editor.zoom === MIN_ZOOM"
										@click="zoom('out')"
									/>
								</template>
								<template v-slot:append>
									<VBtn
										icon="mdi-magnify-plus"
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
							<FeedBack />
						</VCol>
						<VCol cols="auto">
							<VBtn icon="mdi-help-circle" v-tooltip:top="'Help'" />
						</VCol>
					</VRow>
				</VCol>
			</VRow>
		</VContainer>
	</VFooter>
</template>

<style scoped lang="scss"></style>
