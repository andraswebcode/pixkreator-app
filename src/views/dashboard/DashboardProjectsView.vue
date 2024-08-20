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
			search: search.value,
			page: page.value
		},
		'designs',
		(data) => {
			items.value.push(...data.items);
			page.value++;
		}
	);
};
const editProject = (i: number) => {
	router.push({
		name: 'editor',
		params: {
			id: items.value[i].id
		}
	});
};

onMounted(() => {
	list({ ...route.query, ...route.params }, 'designs', (data) => {
		items.value = data.items;
	});
});
onBeforeRouteUpdate((to) => {
	list({ ...to.query, ...to.params }, 'designs', (data) => {
		items.value = data.items;
		page.value = 2;
	});
});
</script>

<template>
	<LibraryWrapper>
		<VRow justify="center">
			<VCol cols="4">
				<SearchInput
					label="Search Templates"
					v-model="search"
					@click:append-inner="filter"
				/>
			</VCol>
		</VRow>
		<LibraryItems :items-length="items.length" :count="24" :cols="2" @load="loadMore">
			<GridItem
				v-for="(item, i) of items"
				:key="item.id"
				cols="2"
				:src="item.thumbnail"
				@click="editProject(i)"
			/>
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
