<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProject } from '../../../store';
import useRequest from '../../../hooks/request';

const project = useProject();
const { list } = useRequest();
const search = ref('');
const items = ref<any[]>([]);
const page = ref(2);
const loading = ref(true);
const filter = () => {
	items.value = [];
	loading.value = true;
	list(
		{
			resource: 'filter',
			search: search.value
		},
		'assets',
		(data) => {
			items.value = data.items;
			loading.value = false;
		}
	);
};
const loadMore = () => {
	list(
		{
			resource: 'filter',
			search: search.value,
			page: page.value
		},
		'assets',
		(data) => {
			items.value.push(...data.items);
			page.value++;
		}
	);
};
const applyFilter = (item: any) => {
	console.log(item, project);
};

onMounted(filter);
</script>

<template>
	<LibraryWrapper>
		<SearchInput label="Search Filters" v-model="search" @click:append-inner="filter" />
		<LibraryItems
			:items-length="items.length"
			:count="24"
			:cols="6"
			:loading="loading"
			@load="loadMore"
		>
			<GridItem
				v-for="item of items"
				:key="item.id"
				cols="6"
				:json="item"
				@click="applyFilter(item)"
			/>
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
