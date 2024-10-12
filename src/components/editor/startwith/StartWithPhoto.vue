<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useRequest from '../../../hooks/request';
import { DETAILS_DIALOG_WIDTH, PHOTO_ORIENTATIONS, PHOTO_SIZES } from '../../../utils/constants';
import { useRouter } from 'vue-router';
import { Orientation, PhotoSize } from '../../../types/common';
import useFitToScreen from '../../../hooks/fittoscreen';

const { list } = useRequest();
const router = useRouter();
const fitToScreen = useFitToScreen();
const search = ref('');
const orientation = ref<Orientation | ''>('');
const color = ref('');
const items = ref<any[]>([]);
const page = ref(2);
const loading = ref(true);
const showDetails = ref(false);
const index = ref(0);
const size = ref<PhotoSize>('large');
const filter = () => {
	items.value = [];
	loading.value = true;
	list(
		{
			query: search.value,
			orientation: orientation.value,
			color: color.value
		},
		'photos',
		(data) => {
			items.value = data.items;
			loading.value = false;
		}
	);
};
const loadMore = () => {
	list(
		{
			query: search.value,
			orientation: orientation.value,
			color: color.value,
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
	const id = items.value[index.value]?.id;

	router
		.replace({
			query: {
				photo: id,
				size: size.value
			},
			params: {
				id: ''
			}
		})
		.then(() => {
			fitToScreen();
		});
};

onMounted(filter);
</script>

<template>
	<LibraryWrapper>
		<VRow justify="center">
			<VCol cols="12" md="6" lg="4">
				<SearchFilter
					label="Search Photos"
					v-model="search"
					:filter-disabled="!search"
					@click:append-inner="filter"
				>
					<VList min-width="331">
						<VListItem>
							<VSelect
								label="Orientation"
								:items="PHOTO_ORIENTATIONS"
								v-model="orientation"
							/>
						</VListItem>
						<VListItem>
							<ColorPicker label="Color" v-model="color" />
						</VListItem>
					</VList>
				</SearchFilter>
			</VCol>
		</VRow>
		<LibraryItems
			:items-length="items.length"
			:count="24"
			:cols="2"
			responsive
			:loading="loading"
			@load="loadMore"
		>
			<GridItem
				v-for="(item, i) of items"
				:key="item.id"
				cols="2"
				responsive
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
				</PhotoDetails>
			</VCarouselItem>
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="addPhoto">Edit This Photo</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss">
.library-wrapper {
	height: 90vh;
}
</style>
