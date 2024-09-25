<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import imageFilters from '../../../utils/image-filters';
import { DETAILS_DIALOG_WIDTH } from '../../../utils/constants';
import { useEditor, useProject } from '../../../store';
import { ByID, ByIDs } from '../../../store/project';

const project = useProject();
const editor = useEditor();
const showDetails = ref(false);
const image = ref<ByID | undefined>();
const index = ref(0);
const items = computed<any>(() => {
	const obj = image.value;
	if (!obj) {
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
				width: obj.width,
				height: obj.height,
				layers: [
					{
						type: 'Image',
						src: obj.src,
						left: obj.width / 2,
						top: obj.height / 2,
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
		if (activeId && byIds[activeId]?.type === 'Image') {
			image.value = byIds[activeId];
		} else {
			image.value = ids.map((id) => byIds[id]).find((layer) => layer?.type === 'Image');
		}
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
				:json="item.json"
				@click="openDetails(i)"
			/>
		</LibraryItems>
	</LibraryWrapper>
	<PersistentHeaderDialog
		v-model="showDetails"
		@close="showDetails = false"
		:max-width="DETAILS_DIALOG_WIDTH"
	>
		<DetailsCarousel v-model="index">
			<VCarouselItem v-for="item of items" :key="item.name">
				<FilterDetails v-bind="item" />
			</VCarouselItem>
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="applyFilter">Apply Filter</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
