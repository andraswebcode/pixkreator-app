<script setup lang="ts">
import { ref } from 'vue';
import useProps from '../../../hooks/props';

const panels = ref(['shape', 'transforms']);
const { type } = useProps(['type']);
</script>

<template>
	<VExpansionPanels v-model="panels">
		<RightSideBarLayerImageSettings v-if="type === 'Image'" />
		<RightSideBarLayerRectSettings v-else-if="type === 'Rect'" />
		<RightSideBarLayerEllipseSettings v-else-if="type === 'Ellipse'" />
		<RightSideBarLayerCircleSettings v-else-if="type === 'Circle'" />
		<RightSideBarLayerTextSettings v-else-if="type === 'IText'" />
		<RightSideBarLayerPathSettings v-else-if="type === 'Path'" />
		<RightSideBarLayerPathSettings v-else-if="type === 'Polygon'" />
		<RightSideBarLayerPathSettings v-else-if="type === 'Polyline'" />
		<RightSideBarLayerGroupSettings v-else-if="type === 'Group'" />
	</VExpansionPanels>
</template>

<style scoped lang="scss"></style>
