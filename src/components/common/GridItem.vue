<script setup lang="ts">
import { ref, toRaw, watch } from 'vue';
import { jsonToBlob } from '../../utils/json-to-blob';

const props = defineProps<{
	cols: string | number;
	src?: string;
	json?: any;
}>();
const emit = defineEmits(['click']);
const srcFromJson = ref(''); // base64 string

watch(
	() => props.json,
	(newJson) => {
		if (!newJson) {
			return;
		}
		jsonToBlob({
			width: newJson.width,
			height: newJson.height,
			background: newJson.background,
			objects: toRaw(newJson.layers)
		}).then((blob) => {
			srcFromJson.value = URL.createObjectURL(blob);
		});
	},
	{
		immediate: true
	}
);
</script>

<template>
	<VCol :cols="props.cols">
		<VCard hover link @click.prevent="emit('click')">
			<VImg aspect-ratio="1" color="blue-grey-darken-4" :src="props.src || srcFromJson" />
		</VCard>
	</VCol>
</template>

<style scoped lang="scss"></style>
