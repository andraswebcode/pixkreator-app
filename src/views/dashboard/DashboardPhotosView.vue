<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import useRequest from '../../hooks/request';
import { DETAILS_DIALOG_WIDTH, PHOTO_ORIENTATIONS, PHOTO_SIZES } from '../../utils/constants';
import { Orientation, PhotoSize } from '../../types/common';

const router = useRouter();
const route = useRoute();
const search = ref(route.query.search);
const orientation = ref<Orientation | ''>('');
const color = ref('');
const page = ref(2);
const loading = ref(true);
const showDetails = ref(false);
const index = ref(0);
const size = ref<PhotoSize>('src');
const items = ref<any>([]);
const { list } = useRequest();
const filter = () => {
	const query: any = {};
	if (search.value) {
		query.search = search.value;
	}
	if (orientation.value) {
		query.orientation = orientation.value;
	}
	if (color.value) {
		query.color = color.value;
	}
	items.value = [];
	loading.value = true;
	router.push({
		query
	});
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

	router.push({
		name: 'editor',
		query: {
			photo: id,
			size: size.value
		}
	});
};

onMounted(() => {
	const { search, ...query } = route.query;
	list(
		{
			query: search,
			...query
		},
		'photos',
		(data) => {
			items.value = data.items;
			loading.value = false;
		}
	);
});
onBeforeRouteUpdate((to) => {
	const { search, ...query } = to.query;
	list(
		{
			query: search,
			...query
		},
		'photos',
		(data) => {
			items.value = data.items;
			loading.value = false;
		}
	);
});
</script>

<template>
	<LibraryWrapper>
		<VRow justify="center">
			<VCol cols="4">
				<SearchInput label="Search Photos" v-model="search" @click:append-inner="filter" />
			</VCol>
		</VRow>
		<VRow justify="center">
			<VCol cols="4">
				<VRow>
					<VCol>
						<VSelect
							label="Orientation"
							:items="PHOTO_ORIENTATIONS"
							:disabled="!search"
							v-model="orientation"
						/>
					</VCol>
					<VCol>
						<ColorPicker label="Color" :disabled="!search" v-model="color" />
					</VCol>
				</VRow>
			</VCol>
		</VRow>
		<LibraryItems
			:items-length="items.length"
			:count="24"
			:cols="2"
			:loading="loading"
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
			<VBtn @click="addPhoto">Add Photo</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
