<script setup lang="ts">
import { ref } from 'vue';
import { useProject } from '../../../../store';

const project = useProject();
const tab = ref('layout');
const addCollage = () => {
	project.addLayer({
		type: 'collage',
		width: project.width,
		height: project.height,
		left: project.width / 2,
		top: project.height / 2
	});
};
</script>

<template>
	<LazyLoadImage class="mb-4" aspect-ratio="2" />
	<VTabs v-model="tab">
		<VTab value="layout" v-tooltip:top="'Layout'">
			<VIcon icon="mdi-collage" />
		</VTab>
		<VTab value="images" v-tooltip:top="'Images'">
			<VIcon icon="mdi-image-multiple" />
		</VTab>
	</VTabs>
	<TabItem v-if="tab === 'layout'"></TabItem>
	<TabItem v-if="tab === 'images'"></TabItem>
	<VBtn block @click="addCollage">Add to Canvas</VBtn>
</template>

<style scoped lang="scss"></style>
