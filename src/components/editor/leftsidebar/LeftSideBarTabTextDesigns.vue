<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';
import { useProject } from '../../../store';

const project = useProject();
const { list } = useRequest();
const search = ref('');
const category = ref('');
const items = ref<any[]>([]);
const page = ref(2);
const loading = ref(true);
const categories = [
	{
		label: 'All',
		value: ''
	}
];
const filter = () => {
	items.value = [];
	loading.value = true;
	list(
		{
			resource: 'text',
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
			resource: 'text',
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
const addText = (item: any) => {
	const _layer = item.layers[0];
	const layer = {
		..._layer,
		left: _layer.left + item.width / 2 + project.width / 2,
		top: _layer.top + item.height / 2 + project.height / 2
	};
	const group = {
		type: 'group',
		left: project.width / 2,
		top: project.height / 2,
		objects: item.layers
	};

	project.addLayer(item.layers.length === 1 ? layer : group);
};

onMounted(filter);
</script>

<template>
	<LibraryWrapper>
		<SearchFilter label="Search Texts" v-model="search" @click:append-inner="filter">
			<VList min-width="331">
				<VListItem>
					<VSelect label="Category" :items="categories" v-model="category" />
				</VListItem>
			</VList>
		</SearchFilter>
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
				@click="addText(item)"
			/>
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
