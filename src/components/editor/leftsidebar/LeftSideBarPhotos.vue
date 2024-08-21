<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';
import { useProject } from '../../../store';
import { PHOTO_SIZES, DETAILS_DIALOG_WIDTH } from '../../../utils/constants';
import { getCroppedImageDimensions } from '../../../utils/functions';
import { PhotoSize } from '../../../types/common';
import useFitToScreen from '../../../hooks/fittoscreen';

const { list } = useRequest();
const project = useProject();
const fitToScreen = useFitToScreen();
const query = ref('');
const items = ref<any[]>([]);
const page = ref(2);
const showDetails = ref(false);
const index = ref(0);
const size = ref<PhotoSize>('src');
const resize = ref(false);
const filter = () => {
	items.value = [];
	list(
		{
			query: query.value
		},
		'photos',
		(data) => {
			items.value = data.items;
		}
	);
};
const loadMore = () => {
	list(
		{
			query: query.value,
			page: page.value
		},
		'photos',
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
const addPhoto = () => {
	const item = items.value[index.value];
	const { width, height } = getCroppedImageDimensions(item.width, item.height, size.value);

	if (resize.value) {
		project.width = width;
		project.height = height;
	}

	project.addLayer({
		type: 'image',
		src: item.proxy[size.value],
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
		<SearchInput label="Search Photos" v-model="query" @click:append-inner="filter" />
		<LibraryItems :items-length="items.length" :count="24" :cols="6" @load="loadMore">
			<GridItem
				v-for="(item, i) of items"
				:key="item.id"
				cols="6"
				:src="item.thumbnail"
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
				<PhotoDetails v-bind="item">
					<VSelect label="Select a Size" :items="PHOTO_SIZES" v-model="size" />
					<VSwitch label="Resize Canvas to Image Size" v-model="resize" />
				</PhotoDetails>
			</VCarouselItem>
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="addPhoto">Add Photo</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
