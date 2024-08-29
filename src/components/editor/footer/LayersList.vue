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
	mdiImageOutline,
	mdiTrashCan,
	mdiLockOpenVariant,
	mdiEyeOff,
	mdiDragVertical
} from '@mdi/js';
import { useEditor, useProject } from '../../../store';
import { computed, ref } from 'vue';

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
			selected: editor.activeLayerIds.includes(id),
			lock: !item.selectable,
			hidden: !item.visible
		};
	})
);
const sortLayers = (ids: string[]) => {
	project.ids = ids;
};
const selectLayer = (item: any) => {
	if (!item.selectable) {
		return;
	}

	if (editor.activeLayerIds.includes(item.id)) {
		editor.activeLayerIds = [];
		// editor.activeLayerIds = editor.activeLayerIds.filter((_id) => _id !== id);
	} else {
		editor.activeLayerIds = [item.id];
		// editor.activeLayerIds = unique(editor.activeLayerIds.concat([id]));
	}
};
const lockLayer = (id: string) => {
	const { selectable } = project.byIds[id] || {};
	project.updateProps(id, {
		selectable: !selectable
	});
	editor.activeLayerIds = editor.activeLayerIds.filter((_id) => _id !== id);
};
const toggleLayer = (id: string) => {
	const { visible } = project.byIds[id] || {};
	project.updateProps(id, {
		visible: !visible
	});
};
</script>

<template>
	<VMenu persistent :close-on-content-click="false" v-model="open">
		<template v-slot:activator="{ props }">
			<VBtn :icon="mdiLayers" v-tooltip:top="'Layers'" v-bind="props" />
		</template>
		<VCard width="300" max-height="500">
			<VList v-sortable="sortLayers">
				<VListItem
					v-for="item of items"
					:key="item.id"
					:active="item.selected"
					:data-id="item.id"
				>
					<template v-slot:prepend>
						<VIcon :icon="mdiDragVertical" class="handle" />
						<VIcon :icon="item.icon" :disabled="item.lock" @click="selectLayer(item)" />
					</template>
					<VListItemTitle>{{ item.label }}</VListItemTitle>
					<template v-slot:append>
						<VBtn
							:icon="item.lock ? mdiLock : mdiLockOpenVariant"
							class="mr-1"
							size="x-small"
							@click="lockLayer(item.id)"
						/>
						<VBtn
							:icon="item.hidden ? mdiEyeOff : mdiEye"
							size="x-small"
							@click="toggleLayer(item.id)"
						/>
						<VBtn
							:icon="mdiTrashCan"
							class="ml-1"
							size="x-small"
							@click="project.removeLayer(item.id)"
						/>
					</template>
				</VListItem>
			</VList>
		</VCard>
	</VMenu>
</template>

<style scoped lang="scss">
.handle {
	cursor: grab;
}
</style>
