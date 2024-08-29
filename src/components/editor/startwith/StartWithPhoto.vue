<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useRequest from '../../../hooks/request';
import { DETAILS_DIALOG_WIDTH, PHOTO_SIZES } from '../../../utils/constants';
import { getCroppedImageDimensions } from '../../../utils/functions';
import { useProject } from '../../../store';
import { useRouter } from 'vue-router';
import { PhotoSize } from '../../../types/common';
import useFitToScreen from '../../../hooks/fittoscreen';

const { list } = useRequest();
const project = useProject();
const router = useRouter();
const fitToScreen = useFitToScreen();
const query = ref('');
const items = ref<any[]>([]);
const page = ref(2);
const showDetails = ref(false);
const index = ref(0);
const size = ref<PhotoSize>('src');
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

	router
		.replace({
			query: {},
			params: {
				id: ''
			}
		})
		.then(() => {
			project.width = width;
			project.height = height;
			project.addLayer({
				type: 'image',
				src: item.proxy[size.value],
				left: project.width / 2,
				top: project.height / 2
			});
			fitToScreen();
		});
};

onMounted(filter);
</script>

<template>
	<VContainer class="wrapper">
		<VRow>
			<VCol class="sidebar" cols="auto">
				<SearchInput label="Search Photos" v-model="query" @click:append-inner="filter" />
			</VCol>
			<VCol>
				<LibraryWrapper>
					<LibraryItems
						:items-length="items.length"
						:count="24"
						:cols="2"
						@load="loadMore"
					>
						<GridItem
							v-for="(item, i) of items"
							:key="item.id"
							cols="2"
							:src="item.thumbnail"
							@click="openDetails(i)"
						/>
					</LibraryItems>
				</LibraryWrapper>
			</VCol>
		</VRow>
	</VContainer>
	<PersistentHeaderDialog
		v-model="showDetails"
		@close="showDetails = false"
		:max-width="DETAILS_DIALOG_WIDTH"
	>
		<DetailsCarousel v-model="index">
			<VCarouselItem v-for="item of items" :key="item.id">
				<PhotoDetails v-bind="item">
					<VSelect label="Select a Size" :items="PHOTO_SIZES" v-model="size" />
				</PhotoDetails>
			</VCarouselItem>
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="addPhoto">Edit This Photo</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss">
.wrapper {
	height: 90vh;
}
.v-row {
	height: 100%;
	.v-col {
		height: 100%;
	}
}
.sidebar {
	width: 256px;
}
</style>
