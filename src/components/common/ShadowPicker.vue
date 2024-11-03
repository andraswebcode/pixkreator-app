<script setup lang="ts">
import { mdiCloseCircle, mdiSquare } from '@mdi/js';
import { computed } from 'vue';

const properties = defineProps<{
	label: string;
	disabled?: boolean;
}>();
const model = defineModel<{
	offsetX: number;
	offsetY: number;
	blur: number;
	color: string;
} | null>({
	required: true,
	default: {
		offsetX: 0,
		offsetY: 0,
		blur: 0,
		color: '#000000'
	}
});
const valueStr = computed(() => {
	if (!model.value) {
		return 'none';
	}
	const { offsetX, offsetY, blur, color } = model.value;
	return `${offsetX} ${offsetY} ${blur} ${color}`;
});
const hasShadow = computed(() => {
	if (!model.value) {
		return false;
	}
	const { offsetX, offsetY, blur } = model.value;
	return !!(offsetX || offsetY || blur);
});
const applyShadow = (apply: boolean | null) => {
	if (apply) {
		model.value = {
			offsetX: 10,
			offsetY: 10,
			blur: 5,
			color: '#00000066'
		};
	} else {
		model.value = null;
	}
};
</script>

<template>
	<VMenu :close-on-content-click="false">
		<template v-slot:activator="{ props }">
			<VTextField
				:label="properties.label"
				dirty
				readonly
				clearable
				:model-value="valueStr"
				:clear-icon="mdiCloseCircle"
				:disabled="properties.disabled"
				v-bind="props"
				@click:clear="applyShadow(false)"
			>
				<template v-slot:prepend-inner>
					<VIcon :icon="mdiSquare" />
				</template>
			</VTextField>
		</template>
		<VCard>
			<VCardItem>
				<VSwitch
					label="Apply Shadow"
					:model-value="hasShadow"
					@update:model-value="applyShadow"
				/>
			</VCardItem>
			<VCardItem v-if="model">
				<RangeSlider label="Offset X" :min="-100" :max="100" v-model="model.offsetX" />
				<RangeSlider label="Offset Y" :min="-100" :max="100" v-model="model.offsetY" />
				<RangeSlider label="Blur" :min="0" :max="40" v-model="model.blur" />
				<ColorPicker label="Color" v-model="model.color" />
			</VCardItem>
			<VCardItem v-else>
				<RangeSlider label="Offset X" :min="-100" :max="100" disabled />
				<RangeSlider label="Offset Y" :min="-100" :max="100" disabled />
				<RangeSlider label="Blur" :min="0" :max="40" disabled />
				<ColorPicker label="Color" disabled />
			</VCardItem>
		</VCard>
	</VMenu>
</template>

<style scoped lang="scss">
.v-text-field * {
	cursor: pointer;
}
</style>
