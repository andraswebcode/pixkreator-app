<script setup lang="ts">
import { computed } from 'vue';
import imageFilters from '../../utils/image-filters';

const props = defineProps<{
	type: string;
	index: number;
}>();
const model = defineModel<any[]>();
const item = computed<any>(() => imageFilters.find((item) => item.name === props.type));
const modelItem = computed<any>(() => model.value?.[props.index]);
const update = (key, value) => {
	if (model.value) {
		model.value[props.index][key] = value;
	}
};
</script>

<template>
	<h3 v-if="item">{{ item.label }}</h3>
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
			:model-value="modelItem[c.name] || c.default"
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
