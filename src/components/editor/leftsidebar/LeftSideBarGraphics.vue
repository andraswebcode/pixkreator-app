<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRequest } from '../../../hooks';
import { useProject } from '../../../store';

const project = useProject();
const { list } = useRequest();
const search = ref('');
const items = ref<any[]>([]);
const page = ref(2);
const filter = () => {
	items.value = [];
	list(
		{
			search: search.value
		},
		'graphics',
		(data) => {
			items.value = data.items;
		}
	);
};
const loadMore = () => {
	list(
		{
			search: search.value,
			page: page.value
		},
		'photos',
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
		<SearchInput label="Search Graphics" v-model="search" @click:append-inner="filter" />
		<LibraryItems :items-length="items.length" :count="24" :cols="6" @load="loadMore">
			<GridItem v-for="item of items" :key="item.id" cols="6" :json="item" />
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
