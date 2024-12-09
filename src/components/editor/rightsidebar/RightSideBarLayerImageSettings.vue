<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('transform');
</script>

<template>
	<VTabs v-model="tab">
		<VTab value="transform" v-tooltip:top="'Transform'">
			<VIcon icon="mdi-tune" />
		</VTab>
		<VTab value="image" v-tooltip:top="'Image'">
			<VIcon icon="mdi-image" />
		</VTab>
		<VTab value="filters" v-tooltip:top="'Filters'">
			<VIcon icon="mdi-image-auto-adjust" />
		</VTab>
		<VTab value="clipping" v-tooltip:top="'Clipping'">
			<VIcon icon="mdi-content-cut" />
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
		<RightSideBarTabImageSettings v-else-if="tab === 'image'" />
		<RightSideBarTabFiltersSettings v-else-if="tab === 'filters'" />
		<RightSideBarTabClippingSettings v-else-if="tab === 'clipping'" />
		<RightSideBarTabShadowSettings v-else-if="tab === 'shadow'" />
		<RightSideBarTabCompositingSettings v-else-if="tab === 'compositing'" />
	</TabItem>
</template>

<style scoped lang="scss"></style>
