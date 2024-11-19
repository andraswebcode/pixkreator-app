<script setup lang="ts">
import { computed } from 'vue';
import imageFilters from '../../utils/image-filters';
import { useEditor, useProject } from '../../store';
import { ImageFilterType } from '../../types/image-filter';

const props = defineProps<{
	type: ImageFilterType;
	index: number;
	showHeader?: boolean;
}>();
const model = defineModel<any[]>();
const editor = useEditor();
const project = useProject();
const item = computed<any>(() => imageFilters.find((item) => item.name === props.type));
const modelItem = computed<any>(() => model.value?.[props.index]);
const update = (key, value) => {
	if (model.value) {
		model.value[props.index][key] = value;
	}
};
const remove = () => {
	const id = editor.activeLayerIds[0];
	project.removeFilter(id, props.type);
};
</script>

<template>
	<VRow v-if="props.showHeader" class="mb-2" align="center">
		<VCol>
			<h4>{{ item.label }}</h4>
		</VCol>
		<VCol cols="auto">
			<VBtn icon="mdi-trash-can" size="x-small" flat @click="remove" />
		</VCol>
	</VRow>
	<div v-if="item" v-for="c in item.controls">
		<VSelect
			v-if="c.type === 'select'"
			:label="c.label"
			:items="c.options"
			:model-value="modelItem[c.name] || c.default"
			@update:model-value="update(c.name, $event)"
		/>
		<RangeSlider
			v-else-if="c.type === 'range'"
			:label="c.label"
			:min="c.min"
			:max="c.max"
			:step="c.step"
			:model-value="typeof modelItem[c.name] === 'undefined' ? c.default : modelItem[c.name]"
			@update:model-value="update(c.name, $event)"
		/>
		<ColorPicker
			v-else-if="c.type === 'color'"
			:label="c.label"
			:model-value="modelItem[c.name] || c.default"
			@update:model-value="update(c.name, $event)"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
