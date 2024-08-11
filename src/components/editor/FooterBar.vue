<script setup lang="ts">
import { mdiFitToScreen, mdiHandBackLeft, mdiMagnifyMinus, mdiMagnifyPlus } from '@mdi/js';
import { useEditor } from '../../store';
import { MAX_ZOOM, MIN_ZOOM } from '../../utils/constants';
const editor = useEditor();
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
					<VBtn :icon="mdiFitToScreen" v-tooltip:top="'Fit to Screen'" />
				</VCol>
				<VCol cols="auto">
					<VSlider
						v-model="editor.zoom"
						:min="MIN_ZOOM"
						:max="MAX_ZOOM"
						:step="0.1"
						width="400px"
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
							{{ parseInt(modelValue * 100) + '%' }}
						</template>
					</VSlider>
				</VCol>
			</VRow>
		</VContainer>
	</VFooter>
</template>

<style scoped lang="scss"></style>
