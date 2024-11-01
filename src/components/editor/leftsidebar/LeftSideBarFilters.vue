<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import imageFilters from '../../../utils/image-filters';
import { DETAILS_DIALOG_WIDTH, THUMBNAIL_MAX_SIZE } from '../../../utils/constants';
import { useEditor, useProject } from '../../../store';
import { ByIDs } from '../../../store/project';
import { jsonToBlob } from '../../../utils/json-to-blob';

const project = useProject();
const editor = useEditor();
const showDetails = ref(false);
const image = ref<any>();
const thumbnail = ref<any>();
const index = ref(0);
const items = computed<any>(() => {
	if (!image.value || !thumbnail.value) {
		return [];
	}
	return imageFilters.map(({ label, name, controls }) => {
		const filter = {
			type: name,
			...controls.reduce((memo, value) => {
				memo[value.name] = value.default;
				return memo;
			}, {})
		};
		return {
			name,
			label,
			controls,
			filter,
			json: {
				width: image.value.width,
				height: image.value.height,
				layers: [
					{
						type: 'Image',
						src: image.value.src,
						left: image.value.width / 2,
						top: image.value.height / 2,
						filters: [filter]
					}
				]
			},
			thumbJson: {
				width: thumbnail.value.width,
				height: thumbnail.value.height,
				layers: [
					{
						type: 'Image',
						src: thumbnail.value.src,
						left: thumbnail.value.width / 2,
						top: thumbnail.value.height / 2,
						filters: [filter]
					}
				]
			}
		};
	});
});
const openDetails = (i: number) => {
	showDetails.value = true;
	index.value = i;
};
const applyFilter = () => {
	const item = items.value[index.value];
	const obj = image.value;
	if (!obj) {
		return;
	}
	project.applyFilter(obj.id, item.filter);
	showDetails.value = false;
};

watch(
	(): [string[], string[], ByIDs] => [editor.activeLayerIds, project.ids, project.byIds],
	([activeIds, ids, byIds]) => {
		const activeId = activeIds[0];
		const imgObject =
			activeId && byIds[activeId]?.type === 'Image'
				? byIds[activeId]
				: ids.map((id) => byIds[id]).find((layer) => layer?.type === 'Image');

		if (!imgObject) {
			return;
		}

		image.value = imgObject;

		// Make a small image (thumbnail) to optimize performance.
		const multiplier = THUMBNAIL_MAX_SIZE / Math.max(imgObject.width, imgObject.height);
		jsonToBlob(
			{
				width: imgObject.width,
				height: imgObject.height,
				objects: [
					{
						...imgObject,
						left: imgObject.width / 2,
						top: imgObject.height / 2,
						scaleX: 1,
						scaleY: 1,
						skewX: 0,
						skewY: 0,
						angle: 0,
						filters: []
					}
				]
			},
			'image/webp',
			0.98,
			multiplier
		)
			.then((blob) => {
				const width = imgObject.width * multiplier;
				const height = imgObject.height * multiplier;
				thumbnail.value = {
					...imgObject,
					src: URL.createObjectURL(blob),
					width,
					height,
					left: width / 2,
					top: height / 2
				};
			})
			.catch(console.warn);
	},
	{
		immediate: true
	}
);
</script>

<template>
	<LibraryWrapper>
		<LibraryItems
			:items-length="items.length"
			:count="24"
			:cols="6"
			no-items-warning="There is no image layer on the canvas. Please add at least one image layer to access image filters."
		>
			<GridItem
				v-for="(item, i) of items"
				:key="item.name"
				:label="item.label"
				cols="6"
				:json="item.thumbJson"
				@click="openDetails(i)"
			/>
		</LibraryItems>
	</LibraryWrapper>
	<PersistentHeaderDialog
		v-model="showDetails"
		@close="showDetails = false"
		:max-width="DETAILS_DIALOG_WIDTH"
		scroll
	>
		<DetailsCarousel v-model="index">
			<FilterDetails v-for="item of items" :key="item.id" v-bind="item" />
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="applyFilter">Apply Filter</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
