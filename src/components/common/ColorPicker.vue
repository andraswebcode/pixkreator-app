<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUser } from '../../store';

const properties = defineProps<{
	label: string;
	disabled?: boolean;
	clearable?: boolean;
	hideBrand?: boolean;
}>();
const model = defineModel<string>();
const userData = useUser();

const tab = ref(userData.isProPlan ? 'brand' : 'palette');
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
const brandSwatches = computed(() =>
	(userData.user.brand_colors || []).map(({ color }) => [color])
);
</script>

<template>
	<VMenu :close-on-content-click="false">
		<template v-slot:activator="{ props }">
			<VTextField
				:label="properties.label"
				dirty
				readonly
				:clearable="properties.clearable"
				clear-icon="mdi-close-circle"
				:disabled="properties.disabled"
				v-model="model"
				v-bind="props"
			>
				<template v-slot:prepend-inner>
					<VIcon icon="mdi-square" :color="model" />
				</template>
			</VTextField>
		</template>
		<VCard>
			<VTabs v-model="tab" fixed-tabs density="compact">
				<VTab v-if="userData.isProPlan && !properties.hideBrand" value="brand">Brand</VTab>
				<VTab value="palette">Palette</VTab>
				<VTab value="picker">Picker</VTab>
			</VTabs>
			<VDivider />
			<VTabsWindow v-model="tab">
				<VTabsWindowItem v-if="userData.isProPlan && !properties.hideBrand" value="brand">
					<VColorPicker
						hide-canvas
						hide-sliders
						hide-inputs
						show-swatches
						:swatches="brandSwatches"
						swatches-max-height="328px"
						v-model="model"
					/>
				</VTabsWindowItem>
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
					<VBtn v-if="userData.isProPlan && !properties.hideBrand" block>
						Add to Brand Colors
					</VBtn>
				</VTabsWindowItem>
				<VTabsWindowItem value="picker">
					<VColorPicker v-model="model" />
					<VBtn v-if="userData.isProPlan && !properties.hideBrand" block>
						Add to Brand Colors
					</VBtn>
				</VTabsWindowItem>
			</VTabsWindow>
		</VCard>
	</VMenu>
</template>

<style scoped lang="scss">
.v-text-field * {
	cursor: pointer;
}
</style>
