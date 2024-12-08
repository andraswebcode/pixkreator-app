<script setup lang="ts">
import { computed } from 'vue';
import { useEditor, useProject } from '../../../store';

const editor = useEditor();
const project = useProject();
const style = computed(() => ({
	left: editor.contextMenuX + 'px',
	top: editor.contextMenuY + 'px'
}));
const lockLayer = () => {
	const { selectable } = project.getFirstLayer(editor.activeLayerIds);
	project.updateProps(editor.activeLayerIds, {
		selectable: !selectable
	});
	editor.activeLayerIds = [];
};
const toggleLayer = () => {
	const { visible } = project.getFirstLayer(editor.activeLayerIds);
	project.updateProps(editor.activeLayerIds, {
		visible: !visible
	});
	editor.activeLayerIds = [];
};
const cloneLayer = () => {};
const removeLayer = () => {
	project.removeLayer(editor.activeLayerIds);
	editor.activeLayerIds = [];
};
</script>

<template>
	<VMenu :model-value="true" contained :content-props="{ style }">
		<VList density="compact">
			<VListItem prepend-icon="mdi-lock" @click="lockLayer">Lock</VListItem>
			<VListItem prepend-icon="mdi-eye" @click="toggleLayer">Hide</VListItem>
			<VListItem prepend-icon="mdi-content-copy" @click="cloneLayer">Clone</VListItem>
			<VListItem prepend-icon="mdi-trash-can" @click="removeLayer">Remove</VListItem>
		</VList>
	</VMenu>
</template>

<style scoped lang="scss"></style>
