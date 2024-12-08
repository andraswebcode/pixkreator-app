<script setup lang="ts">
import { useEditor, useProject } from '../../../store';
import { computed } from 'vue';
import { uniqueId } from '../../../utils/functions';
import useProps from '../../../hooks/props';

const ICON_MAP = {
	group: 'mdi-layers-outline',
	image: 'mdi-image-outline',
	rect: 'mdi-rectangle-outline',
	circle: 'mdi-circle-outline',
	ellipse: 'mdi-ellipse-outline',
	path: 'mdi-heart-outline',
	polyline: 'mdi-diamond-outline',
	polygon: 'mdi-diamond-outline',
	itext: 'mdi-format-text',
	qrcode: 'mdi-qrcode',
	chart: 'mdi-chart-areaspline'
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
	itext: 'Text',
	qrcode: 'QR Code',
	chart: 'Chart'
};
const project = useProject();
const editor = useEditor();
const { type } = useProps(['type']);
const items = computed<any[]>(() =>
	project.ids.map((id) => {
		const item = project.getFirstLayer(id);
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
	editor.activeLayerIds = [];
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
	const { selectable } = project.getFirstLayer(id);
	const _id = editor.activeLayerIds.includes(id) ? editor.activeLayerIds : id;
	project.updateProps(_id, {
		selectable: !selectable
	});
	editor.activeLayerIds = [];
};
const toggleLayer = (id: string) => {
	const { visible } = project.getFirstLayer(id);
	const _id = editor.activeLayerIds.includes(id) ? editor.activeLayerIds : id;
	project.updateProps(_id, {
		visible: !visible
	});
	editor.activeLayerIds = [];
};
const cloneLayer = (id: string) => {
	const layer = project.getFirstLayer(id);
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
	const _id = editor.activeLayerIds.includes(id) ? editor.activeLayerIds : id;
	project.removeLayer(_id);
	editor.activeLayerIds = [];
};
</script>

<template>
	<div class="pa-4">
		<div class="mb-2">
			<VBtn
				icon="mdi-group"
				v-tooltip="'Group'"
				size="x-small"
				variant="text"
				:disabled="editor.activeLayerIds.length < 2"
				@click="groupLayers"
			/>
			<VBtn
				icon="mdi-ungroup"
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
					<VIcon icon="mdi-drag-vertical" class="handle" />
					<VIcon :icon="item.icon" :disabled="item.lock" @click="selectLayer(item)" />
				</template>
				<VListItemTitle>{{ item.label }}</VListItemTitle>
				<template v-slot:append>
					<VBtn
						:icon="item.lock ? 'mdi-lock' : 'mdi-lock-open-variant'"
						v-tooltip:top="item.lock ? 'Unlock' : 'Lock'"
						variant="text"
						size="x-small"
						@click="lockLayer(item.id)"
					/>
					<VBtn
						:icon="item.hidden ? 'mdi-eye-off' : 'mdi-eye'"
						v-tooltip:top="item.hidden ? 'Show' : 'Hide'"
						variant="text"
						size="x-small"
						@click="toggleLayer(item.id)"
					/>
					<VBtn
						icon="mdi-content-copy"
						v-tooltip:top="'Clone'"
						variant="text"
						size="x-small"
						@click="cloneLayer(item.id)"
					/>
					<VBtn
						icon="mdi-trash-can"
						v-tooltip:top="'Remove'"
						variant="text"
						size="x-small"
						@click="deleteLayer(item.id)"
					/>
				</template>
			</VListItem>
		</VList>
		<VAlert v-else type="warning" class="mt-2" icon="mdi-alert-circle">
			There are no layers on the canvas.
		</VAlert>
	</div>
</template>

<style scoped lang="scss">
.handle {
	cursor: grab;
}
</style>
