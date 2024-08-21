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
		<RightSideBarLayerTextSettings v-else-if="type === 'Text'" />
	</VExpansionPanels>
</template>

<style scoped lang="scss"></style>
