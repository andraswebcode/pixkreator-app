<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import useRequest from '../../hooks/request';
import { DETAILS_DIALOG_WIDTH, PHOTO_SIZES } from '../../utils/constants';
import { PhotoSize } from '../../types/common';

const router = useRouter();
const route = useRoute();
const search = ref(route.query.search);
const page = ref(2);
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
	items.value = [];
	router.push({
		query
	});
};
const loadMore = () => {
	list(
		{
			query: search.value,
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
const addPhoto = () => {};

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
		<LibraryItems :items-length="items.length" :count="24" :cols="2" @load="loadMore">
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
