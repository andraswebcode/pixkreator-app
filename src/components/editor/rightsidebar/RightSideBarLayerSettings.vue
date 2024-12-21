<script setup lang="ts">
import useProps from '../../../hooks/props';

const { type } = useProps(['type']);
</script>

<template>
	<RightSideBarLayerImageSettings v-if="type === 'Image'" />
	<RightSideBarLayerRectSettings v-else-if="type === 'Rect'" />
	<RightSideBarLayerEllipseSettings v-else-if="type === 'Ellipse'" />
	<RightSideBarLayerCircleSettings v-else-if="type === 'Circle'" />
	<RightSideBarLayerTextSettings v-else-if="type === 'IText'" />
	<RightSideBarLayerPathSettings v-else-if="type === 'Path'" />
	<RightSideBarLayerPathSettings v-else-if="type === 'Polygon'" />
	<RightSideBarLayerPathSettings v-else-if="type === 'Polyline'" />
	<RightSideBarLayerGroupSettings v-else-if="type === 'Group'" />
	<RightSideBarLayerQRCodeSettings v-else-if="type === 'QRCode'" />
	<RightSideBarLayerChartSettings v-else-if="type === 'Chart'" />
	<RightSideBarLayerCollageSettings v-else-if="type === 'Collage'" />
</template>

<style scoped lang="scss"></style>
