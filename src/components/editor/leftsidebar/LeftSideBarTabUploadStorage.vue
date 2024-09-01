<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';

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
			page: page.value
		},
		'uploads',
		(data) => {
			items.value.push(...data.items);
			page.value++;
		}
	);
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
			<GridItem v-for="item of items" :key="item.id" cols="6" :src="item.image" />
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
