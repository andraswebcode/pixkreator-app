<script setup lang="ts">
import { mdiClose, mdiPlus } from '@mdi/js';
import { computed } from 'vue';

const props = defineProps<{
	label: string;
}>();
const model = defineModel<number[]>();
const items = computed<number[][]>(() => {
	const array = model.value;
	if (!array) {
		return [];
	}
	return array.reduce((memo, _, i) => {
		if (i % 2 === 0) {
			memo.push([array[i], array[i + 1]]);
		}
		return memo;
	}, [] as number[][]);
});
const updateValue = (value: number, i1: number, i2: number) => {
	const array = (model.value || []).slice();
	const index = i1 * 2 + i2;

	if (index >= 0 && index < array.length) {
		array[index] = value;
		model.value = array;
	}
};
const addDashGap = () => {
	model.value = (model.value || []).concat([4, 4]);
};
const removeDashGap = (index: number) => {
	const array = model.value || [];
	const startIndex = index * 2;

	if (startIndex >= 0 && startIndex < array.length) {
		model.value = array.filter((_, i) => i < startIndex || i >= startIndex + 2);
	}
};
</script>

<template>
	<div class="stroke-dash-control mb-5">
		<VLabel class="v-field-label--floating mb-2">{{ props.label }}</VLabel>
		<VRow>
			<VCol>
				<VLabel class="v-field-label--floating">Dashes</VLabel>
			</VCol>
			<VCol class="pl-0">
				<VLabel class="v-field-label--floating">Gaps</VLabel>
			</VCol>
		</VRow>
		<InputGroup v-for="(item, i) of items" :key="i">
			<VTextField
				type="number"
				:min="0"
				:model-value="item[0]"
				@update:model-value="updateValue(parseFloat($event), i, 0)"
			/>
			<VTextField
				type="number"
				:min="0"
				:model-value="item[1]"
				@update:model-value="updateValue(parseFloat($event), i, 1)"
			/>
			<VBtn :icon="mdiClose" size="x-small" flat @click="removeDashGap(i)" />
		</InputGroup>
		<VBtn :prepend-icon="mdiPlus" size="x-small" flat @click="addDashGap">Add</VBtn>
	</div>
</template>

<style scoped lang="scss">
.v-label {
	display: block;
	visibility: visible;
	position: static;
}
.input-group {
	position: relative;
	.v-btn {
		position: absolute;
		top: 0;
		right: 0;
	}
}
</style>
