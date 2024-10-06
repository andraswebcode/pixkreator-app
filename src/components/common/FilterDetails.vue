<script setup lang="ts">
import { ref, watch } from 'vue';
import { jsonToBlob } from '../../utils/json-to-blob';

const props = defineProps<{
	name: string;
	label: string;
	controls: any[];
	json: any;
}>();
const src = ref('');

watch(
	() => props.json,
	(newJson) => {
		jsonToBlob({
			width: newJson.width,
			height: newJson.height,
			objects: newJson.layers
		}).then((blob) => {
			src.value = URL.createObjectURL(blob);
		});
	},
	{
		immediate: true
	}
);
</script>

<template>
	<VContainer>
		<VRow>
			<VCol cols="12" md="8" align-self="center">
				<VImg aspect-ratio="1" :src="src" />
			</VCol>
			<VCol cols="12" md="4">
				<h3 class="mb-2">{{ props.label }}</h3>
				<div v-for="c of props.controls" :key="c.name">
					<VSelect v-if="c.type === 'select'" :label="c.label" :items="c.options" />
					<RangeSlider v-else-if="c.type === 'range'" :label="c.label" />
					<ColorPicker v-else-if="c.type === 'color'" :label="c.label" />
				</div>
			</VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
