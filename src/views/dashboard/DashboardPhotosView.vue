<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import useRequest from '../../hooks/request';

const router = useRouter();
const route = useRoute();
const search = ref(route.query.search);
const page = ref(2);
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
			<GridItem v-for="item of items" :key="item.id" cols="2" :src="item.thumbnail" />
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
