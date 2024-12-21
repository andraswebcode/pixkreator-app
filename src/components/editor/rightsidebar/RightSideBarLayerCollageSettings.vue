<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('transform');
</script>

<template>
	<VTabs v-model="tab">
		<VTab value="transform" v-tooltip:top="'Transform'">
			<VIcon icon="mdi-tune" />
		</VTab>
		<VTab value="images" v-tooltip:top="'Images'">
			<VIcon icon="mdi-image-multiple" />
		</VTab>
		<VTab value="layout" v-tooltip:top="'Layout'">
			<VIcon icon="mdi-collage" />
		</VTab>
		<VTab value="border" v-tooltip:top="'Border'">
			<VIcon icon="mdi-border-all" />
		</VTab>
		<VTab value="shadow" v-tooltip:top="'Shadow'">
			<VIcon icon="mdi-box-shadow" />
		</VTab>
		<VTab value="compositing" v-tooltip:top="'Compositing'">
			<VIcon icon="mdi-water-opacity" />
		</VTab>
	</VTabs>
	<TabItem>
		<RightSideBarTabTransformSettings v-if="tab === 'transform'" />
		<RightSideBarTabCompositingSettings v-else-if="tab === 'compositing'" />
	</TabItem>
</template>

<style scoped lang="scss"></style>
