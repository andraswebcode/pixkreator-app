<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';
import { useProject } from '../../../store';
import graphicCategories from '../../../utils/graphic-categories';
import graphicStyles from '../../../utils/graphic-styles';

const project = useProject();
const { list } = useRequest();
const search = ref('');
const category = ref('');
const style = ref('');
const items = ref<any[]>([]);
const page = ref(2);
const loading = ref(true);
const categories = [
	{
		label: 'All',
		value: ''
	},
	...graphicCategories
];
const styles = [
	{
		label: 'All',
		value: ''
	},
	...graphicStyles
];
const filter = () => {
	items.value = [];
	loading.value = true;
	list(
		{
			resource: 'graphic',
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
			resource: 'graphic',
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
const addGraphic = (item: any) => {
	const _layer = item.data[0];
	const layer = {
		..._layer,
		left: project.width / 2,
		top: project.height / 2
	};
	const group = {
		type: 'group',
		left: project.width / 2,
		top: project.height / 2,
		width: item.width,
		height: item.height,
		objects: item.data.map((obj) => ({
			...obj,
			left: obj.left - item.width / 2,
			top: obj.top - item.height / 2
		}))
	};

	project.addLayer(item.data.length === 1 ? layer : group);
};

onMounted(filter);
</script>

<template>
	<LibraryWrapper>
		<SearchFilter label="Search Graphics" v-model="search" @click:append-inner="filter">
			<VList min-width="331">
				<VListItem>
					<VSelect label="Category" :items="categories" v-model="category" />
				</VListItem>
				<VListItem>
					<VSelect label="Style" :items="styles" v-model="style" />
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
				:json="{
					width: item.width,
					height: item.height,
					layers: item.data
				}"
				@click="addGraphic(item)"
			/>
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
