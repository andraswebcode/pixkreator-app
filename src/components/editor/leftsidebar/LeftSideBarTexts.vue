<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRequest } from '../../../hooks';
import { useProject } from '../../../store';

const project = useProject();
const { list } = useRequest();
const tab = ref('search');
const text = ref('');
const search = ref('');
const category = ref('');
const items = ref<any[]>([]);
const page = ref(2);
const categories = [
	{
		label: 'All',
		value: ''
	}
];
const filter = () => {
	items.value = [];
	list(
		{
			search: search.value
		},
		'texts',
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
		'texts',
		(data) => {
			items.value.push(...data.items);
			page.value++;
		}
	);
};
const addTextDesign = (item: any) => {
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
const addText = () => {
	project.addLayer({
		type: 'i-text',
		text: text.value,
		left: project.width / 2,
		top: project.height / 2
	});
};

onMounted(filter);
</script>

<template>
	<TabsWrapper>
		<VTabs v-model="tab" fixed-tabs>
			<VTab value="search">Search</VTab>
			<VTab value="create">Create</VTab>
		</VTabs>
		<VDivider />
		<VTabsWindow v-model="tab">
			<VTabsWindowItem value="search">
				<LibraryWrapper>
					<SearchInput
						label="Search Texts"
						v-model="search"
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
					<LibraryItems
						:items-length="items.length"
						:count="24"
						:cols="6"
						@load="loadMore"
					>
						<GridItem
							v-for="item of items"
							:key="item.id"
							cols="6"
							:json="item"
							@click="addTextDesign(item)"
						/>
					</LibraryItems>
				</LibraryWrapper>
			</VTabsWindowItem>
			<VTabsWindowItem value="create">
				<VTextarea label="Text" v-model="text" />
				<VBtn block @click="addText">Add Text</VBtn>
			</VTabsWindowItem>
		</VTabsWindow>
	</TabsWrapper>
</template>

<style scoped lang="scss"></style>
