<script setup lang="ts">
import { mdiMagnify } from '@mdi/js';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import useRequest from '../../hooks/request';

const router = useRouter();
const route = useRoute();
const search = ref('');
const items = ref([]);
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
const load = console.log;

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
	<VRow justify="center">
		<VCol cols="4">
			<SearchInput label="Search Photos" v-model="search" @click:append-inner="filter" />
		</VCol>
	</VRow>
	<VInfiniteScroll>
		<VContainer v-if="items.length" @load="load">
			<VRow>
				<GridItem v-for="item of items" :key="item.id" cols="2" :src="item.thumbnail" />
			</VRow>
		</VContainer>
		<VContainer v-else>
			<VRow>
				<GridLoader :cols="2" :count="24" />
			</VRow>
		</VContainer>
	</VInfiniteScroll>
</template>

<style scoped lang="scss"></style>
