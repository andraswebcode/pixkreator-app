<script setup lang="ts">
import {
	mdiRectangleOutline,
	mdiCircleOutline,
	mdiEllipseOutline,
	mdiEye,
	mdiLayers,
	mdiLock,
	mdiLayersOutline,
	mdiHeartOutline,
	mdiDiamondOutline,
	mdiImageOutline
} from '@mdi/js';
import { useEditor, useProject } from '../../../store';
import { computed, ref } from 'vue';
import { unique } from '../../../utils/functions';

const ICON_MAP = {
	group: mdiLayersOutline,
	image: mdiImageOutline,
	rect: mdiRectangleOutline,
	circle: mdiCircleOutline,
	ellipse: mdiEllipseOutline,
	path: mdiHeartOutline,
	polyline: mdiDiamondOutline,
	polygon: mdiDiamondOutline
};
const project = useProject();
const editor = useEditor();
const open = ref(false);
const items = computed<any[]>(() =>
	project.ids.map((id) => {
		const item = project.byIds[id] || {};
		return {
			id: item.id,
			label: item.name || item.type,
			icon: ICON_MAP[item.type.toLowerCase()],
			selected: editor.activeLayerIds.includes(id)
		};
	})
);
const selectLayer = (id: string) => {
	if (editor.activeLayerIds.includes(id)) {
		editor.activeLayerIds = [];
		// editor.activeLayerIds = editor.activeLayerIds.filter((_id) => _id !== id);
	} else {
		editor.activeLayerIds = [id];
		// editor.activeLayerIds = unique(editor.activeLayerIds.concat([id]));
	}
};
</script>

<template>
	<VMenu persistent :close-on-content-click="false" v-model="open">
		<template v-slot:activator="{ props }">
			<VBtn :icon="mdiLayers" v-tooltip:top="'Layers'" v-bind="props" />
		</template>
		<VCard width="300" max-height="500">
			<VList>
				<VListItem
					v-for="item of items"
					:key="item.id"
					:active="item.selected"
					@click="selectLayer(item.id)"
				>
					<template v-slot:prepend>
						<VIcon :icon="item.icon" />
					</template>
					<VListItemTitle>{{ item.label }}</VListItemTitle>
					<template v-slot:append>
						<VBtn :icon="mdiLock" />
						<VBtn :icon="mdiEye" />
					</template>
				</VListItem>
			</VList>
		</VCard>
	</VMenu>
</template>

<style scoped lang="scss"></style>
