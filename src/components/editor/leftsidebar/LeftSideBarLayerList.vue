<script setup lang="ts">
import {
	mdiRectangleOutline,
	mdiCircleOutline,
	mdiEllipseOutline,
	mdiEye,
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
	mdiContentCopy,
	mdiGroup,
	mdiUngroup
} from '@mdi/js';
import { useEditor, useProject } from '../../../store';
import { computed } from 'vue';
import { uniqueId } from '../../../utils/functions';
import useProps from '../../../hooks/props';

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
const { type } = useProps(['type']);
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
const groupLayers = () => {
	project.groupLayers(editor.activeLayerIds);
};
const ungroupLayers = () => {
	project.ungroupLayers(editor.activeLayerIds[0]);
};
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
	<div class="pa-4">
		<div class="mb-2">
			<VBtn
				:icon="mdiGroup"
				v-tooltip="'Group'"
				size="x-small"
				variant="text"
				:disabled="editor.activeLayerIds.length < 2"
				@click="groupLayers"
			/>
			<VBtn
				:icon="mdiUngroup"
				v-tooltip="'Ungroup'"
				size="x-small"
				variant="text"
				:disabled="type !== 'Group' || editor.activeLayerIds.length !== 1"
				@click="ungroupLayers"
			/>
		</div>
		<VDivider />
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
		<VAlert v-else type="warning" class="mt-2" :icon="mdiAlertCircle">
			There are no layers on the canvas.
		</VAlert>
	</div>
</template>

<style scoped lang="scss">
.handle {
	cursor: grab;
}
</style>
