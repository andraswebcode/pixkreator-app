<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DETAILS_DIALOG_WIDTH } from '../../../utils/constants';
import useRequest from '../../../hooks/request';
import { useProject } from '../../../store';
import useFitToScreen from '../../../hooks/fittoscreen';

const { list } = useRequest();
const fitToScreen = useFitToScreen();
const project = useProject();
const search = ref('');
const items = ref<any[]>([]);
const page = ref(2);
const loading = ref(true);
const showDetails = ref(false);
const index = ref(0);
const resize = ref(false);
const filter = () => {
	items.value = [];
	loading.value = true;
	list(
		{
			search: search.value,
			source: 'uploads'
		},
		'uploads',
		(data) => {
			items.value = data.items;
			loading.value = false;
		}
	);
};
const loadMore = () => {
	list(
		{
			search: search.value,
			source: 'uploads',
			page: page.value
		},
		'uploads',
		(data) => {
			items.value.push(...data.items);
			page.value++;
		}
	);
};
const openDetails = (i: number) => {
	showDetails.value = true;
	index.value = i;
};
const addImage = () => {
	const item = items.value[index.value];

	if (resize.value) {
		project.width = item.width;
		project.height = item.height;
	}

	project.addLayer({
		type: 'image',
		src: item.image,
		left: project.width / 2,
		top: project.height / 2
	});
	showDetails.value = false;
	fitToScreen();
};

onMounted(filter);
</script>

<template>
	<LibraryWrapper>
		<SearchInput label="Search" v-model="search" @click:append-inner="filter" />
		<LibraryItems
			:items-length="items.length"
			:count="24"
			:cols="6"
			:loading="loading"
			@load="loadMore"
		>
			<GridItem
				v-for="(item, i) of items"
				:key="item.id"
				cols="6"
				:src="item.image"
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
			<VCarouselItem v-for="item of items" :key="item.id">
				<UploadDetails v-bind="item">
					<VSwitch label="Resize Canvas to Image Size" v-model="resize" />
				</UploadDetails>
			</VCarouselItem>
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="addImage">Add Image</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
