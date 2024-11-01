<script setup lang="ts">
import { ref, toRaw, watch } from 'vue';
import { jsonToBlob } from '../../utils/json-to-blob';
import { debounce } from '../../utils/functions';
import { useDisplay } from 'vuetify';

const props = defineProps<{
	name: string;
	label: string;
	filter: any;
	controls: any[];
	json: any;
	thumbJson: any;
}>();
const src = ref('');
const filters = ref<any[]>([props.filter]);

watch(
	() => [props.json, filters],
	debounce(([newJson, newFilters]) => {
		jsonToBlob({
			width: newJson.width,
			height: newJson.height,
			objects: [
				{
					...newJson.layers[0],
					filters: toRaw(newFilters.value)
				}
			]
		}).then((blob) => {
			src.value = URL.createObjectURL(blob);
		});
	}, 400),
	{
		deep: true,
		immediate: true
	}
);
const { mdAndUp } = useDisplay();
</script>

<template>
	<VContainer class="w-100 h-100">
		<VRow class="w-100 h-100">
			<VCol
				cols="12"
				md="8"
				align-self="center"
				class="w-100"
				:class="{
					'h-100': mdAndUp
				}"
			>
				<VImg aspect-ratio="1" :src="src" />
			</VCol>
			<VCol
				cols="12"
				md="4"
				class="w-100"
				:class="{
					'h-100': mdAndUp
				}"
			>
				<h3 class="mb-2">{{ props.label }}</h3>
				<FilterSettings v-model="filters" />
			</VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
