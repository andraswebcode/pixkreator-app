<script setup lang="ts">
import { computed } from 'vue';
import { useEditor, useProject } from '../../../store';
import useProps from '../../../hooks/props';
import { uniqueId } from '../../../utils/functions';

const editor = useEditor();
const project = useProject();
const { type } = useProps(['type']);
const style = computed(() => ({
	left: editor.contextMenuX + 'px',
	top: editor.contextMenuY + 'px'
}));
const groupLayers = () => {
	project.groupLayers(editor.activeLayerIds);
	editor.activeLayerIds = [];
};
const ungroupLayers = () => {
	project.ungroupLayers(editor.activeLayerIds[0]);
};
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
const cloneLayer = () => {
	const layer = project.getFirstLayer(editor.activeLayerIds);

	if (layer.type === 'Group') {
		const group = {
			...layer,
			id: uniqueId(layer.type),
			left: layer.left + 10,
			top: layer.top + 10,
			objects: layer.childIds?.map((childId) => {
				const child = project.getFirstLayer(childId);
				return {
					...child,
					id: uniqueId(child.type)
				};
			})
		};
		project.addLayer(group);
	} else {
		project.addLayer({
			...layer,
			id: uniqueId(layer.type),
			left: layer.left + 10,
			top: layer.top + 10
		});
	}
};
const removeLayer = () => {
	project.removeLayer(editor.activeLayerIds);
	editor.activeLayerIds = [];
};
</script>

<template>
	<VMenu :model-value="true" contained :content-props="{ style }">
		<VList density="compact">
			<VListItem
				v-if="editor.activeLayerIds.length > 1"
				prepend-icon="mdi-group"
				@click="groupLayers"
			>
				Group
			</VListItem>
			<VListItem
				v-else-if="type === 'Group'"
				prepend-icon="mdi-ungroup"
				@click="ungroupLayers"
			>
				Ungroup
			</VListItem>
			<VListItem prepend-icon="mdi-lock" @click="lockLayer">Lock</VListItem>
			<VListItem prepend-icon="mdi-eye" @click="toggleLayer">Hide</VListItem>
			<VListItem prepend-icon="mdi-content-copy" @click="cloneLayer">Clone</VListItem>
			<VListItem prepend-icon="mdi-trash-can" @click="removeLayer">Remove</VListItem>
		</VList>
	</VMenu>
</template>

<style scoped lang="scss"></style>
