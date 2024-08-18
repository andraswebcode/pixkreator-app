<script setup lang="ts">
import { mdiMagnify } from '@mdi/js';
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';
import templateCategories from '../../../utils/template-categories';

const { list } = useRequest();
const search = ref('');
const category = ref('');
const page = ref(2);
const items = ref<any>([]);
const categories = [
	{
		label: 'All',
		value: ''
	},
	...templateCategories
];
const filter = () => {
	items.value = [];
	list(
		{
			search: search.value,
			category: category.value
		},
		'templates',
		(data) => {
			items.value = data.items;
		}
	);
};
const loadMore = () => {
	list(
		{
			search: search.value,
			category: category.value,
			page: page.value
		},
		'templates',
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
		<VTextField
			label="Search Templates"
			variant="solo"
			hide-details
			single-line
			flat
			:append-inner-icon="mdiMagnify"
			:model-value="search"
			@click:append-inner="filter"
		/>
		<VSelect
			:items="categories"
			v-model="category"
			flat
			single-line
			hide-details
			@update:model-value="filter"
		/>
		<LibraryItems :items-length="items.length" :count="24" :cols="6" @load="loadMore">
			<GridItem v-for="item of items" :key="item.id" cols="6" />
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
