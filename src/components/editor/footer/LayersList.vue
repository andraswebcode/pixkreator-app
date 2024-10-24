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
	mdiFormatText,
	mdiTrashCan,
	mdiLockOpenVariant,
	mdiEyeOff,
	mdiDragVertical,
	mdiAlertCircle,
	mdiContentCopy
} from '@mdi/js';
import { useEditor, useProject } from '../../../store';
import { computed, ref } from 'vue';
import { uniqueId } from '../../../utils/functions';

const ICON_MAP = {
	group: mdiLayersOutline,
	image: mdiImageOutline,
	rect: mdiRectangleOutline,
	circle: mdiCircleOutline,
	ellipse: mdiEllipseOutline,
	path: mdiHeartOutline,
	polyline: mdiDiamondOutline,
	polygon: mdiDiamondOutline,
	itext: mdiFormatText
};
const NAME_MAP = {
	group: 'Group',
	image: 'Image',
	rect: 'Rect',
	circle: 'Circle',
	ellipse: 'Ellipse',
	path: 'Path',
	polyline: 'Polyline',
	polygon: 'Polygon',
	itext: 'Text'
};
const project = useProject();
const editor = useEditor();
const open = ref(false);
const items = computed<any[]>(() =>
	project.ids.map((id) => {
		const item = project.byIds[id] || {};
		return {
			id: item.id,
			label: item.name || NAME_MAP[item.type.toLowerCase()],
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
	if (item.lock) {
		return;
	}

	if (editor.activeLayerIds.includes(item.id)) {
		editor.activeLayerIds = [];
		// editor.activeLayerIds = editor.activeLayerIds.filter((_id) => _id !== id);
	} else {
		editor.activeLayerIds = [item.id];
		// editor.activeLayerIds = unique(editor.activeLayerIds.concat([id]));
	}

	editor.mode = 'select';
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
const cloneLayer = (id: string) => {
	const layer = project.byIds[id];
	const copy = {
		...layer,
		id: uniqueId(layer.type),
		left: layer.left + 10,
		top: layer.top + 10
	};
	if (layer.type === 'Group') {
		//
	} else {
		project.addLayer(copy);
	}
};
const deleteLayer = (id: string) => {
	project.removeLayer(id);
	editor.activeLayerIds = [];
};
</script>

<template>
	<VMenu persistent :close-on-content-click="false" v-model="open">
		<template v-slot:activator="{ props }">
			<VBtn :icon="mdiLayers" v-tooltip:top="'Layers'" v-bind="props" />
		</template>
		<VCard width="300" max-height="500">
			<VList v-if="items.length" v-sortable="sortLayers">
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
							v-tooltip:top="item.lock ? 'Unlock' : 'Lock'"
							variant="text"
							size="x-small"
							@click="lockLayer(item.id)"
						/>
						<VBtn
							:icon="item.hidden ? mdiEyeOff : mdiEye"
							v-tooltip:top="item.hidden ? 'Show' : 'Hide'"
							variant="text"
							size="x-small"
							@click="toggleLayer(item.id)"
						/>
						<VBtn
							:icon="mdiContentCopy"
							v-tooltip:top="'Clone'"
							variant="text"
							size="x-small"
							@click="cloneLayer(item.id)"
						/>
						<VBtn
							:icon="mdiTrashCan"
							v-tooltip:top="'Remove'"
							variant="text"
							size="x-small"
							@click="deleteLayer(item.id)"
						/>
					</template>
				</VListItem>
			</VList>
			<VAlert v-else type="warning" :icon="mdiAlertCircle">
				There are no layers on the canvas.
			</VAlert>
		</VCard>
	</VMenu>
</template>

<style scoped lang="scss">
.handle {
	cursor: grab;
}
</style>
