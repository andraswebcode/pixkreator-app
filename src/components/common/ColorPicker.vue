<script setup lang="ts">
import { mdiSquare, mdiCloseCircle } from '@mdi/js';
import { ref } from 'vue';

const properties = defineProps<{
	label: string;
	disabled: boolean;
}>();
const model = defineModel<string>();

const tab = ref('palette');
const swatches = [
	['#FFFFFF', '#BFBFBF', '#7F7F7F', '#3F3F3F', '#000000'], // Black to White
	['#FF0000', '#CC0000', '#990000', '#660000', '#330000'], // Red
	['#FF7F00', '#CC6600', '#994C00', '#663300', '#331900'], // Orange
	['#FFFF00', '#CCCC00', '#999900', '#666600', '#333300'], // Yellow
	['#00FF00', '#00CC00', '#009900', '#006600', '#003300'], // Green
	['#00FFFF', '#00CCCC', '#009999', '#006666', '#003333'], // Cyan
	['#0000FF', '#0000CC', '#000099', '#000066', '#000033'], // Blue
	['#7F00FF', '#6600CC', '#4C0099', '#330066', '#190033'], // Violet
	['#FF00FF', '#CC00CC', '#990099', '#660066', '#330033'], // Magenta
	['#800080', '#660066', '#4C004C', '#330033', '#190019'] // Purple
];
</script>

<template>
	<VMenu :close-on-content-click="false">
		<template v-slot:activator="{ props }">
			<VTextField
				:label="properties.label"
				dirty
				readonly
				clearable
				:clear-icon="mdiCloseCircle"
				:disabled="properties.disabled"
				v-model="model"
				v-bind="props"
			>
				<template v-slot:prepend-inner>
					<VIcon :icon="mdiSquare" :color="model" />
				</template>
			</VTextField>
		</template>
		<VCard>
			<VTabs v-model="tab" fixed-tabs density="compact">
				<VTab value="palette">Palette</VTab>
				<VTab value="picker">Picker</VTab>
			</VTabs>
			<VDivider />
			<VTabsWindow v-model="tab">
				<VTabsWindowItem value="palette">
					<VColorPicker
						hide-canvas
						hide-sliders
						hide-inputs
						show-swatches
						:swatches="swatches"
						swatches-max-height="328px"
						v-model="model"
					/>
				</VTabsWindowItem>
				<VTabsWindowItem value="picker">
					<VColorPicker v-model="model" />
				</VTabsWindowItem>
			</VTabsWindow>
		</VCard>
	</VMenu>
</template>

<style scoped lang="scss"></style>
