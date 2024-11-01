<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';
import templateCategories from '../../../utils/template-categories';
import { DETAILS_DIALOG_WIDTH } from '../../../utils/constants';
import { useRouter } from 'vue-router';

const { list } = useRequest();
const router = useRouter();
const search = ref('');
const category = ref('');
const page = ref(2);
const loading = ref(true);
const showDetails = ref(false);
const index = ref(0);
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
	loading.value = true;
	list(
		{
			search: search.value,
			category: category.value
		},
		'templates',
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
const openDetails = (i: number) => {
	showDetails.value = true;
	index.value = i;
};
const addTemplate = () => {
	const id = items.value[index.value]?.id;
	router.replace({
		query: {
			template: id
		},
		params: {
			id: ''
		}
	});
	showDetails.value = false;
};

onMounted(filter);
</script>

<template>
	<LibraryWrapper>
		<SearchFilter label="Search Templates" v-model="search" @click:append-inner="filter">
			<VList min-width="331">
				<VListItem>
					<VSelect
						label="Category"
						:items="categories"
						v-model="category"
						@update:model-value="filter"
					/>
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
				v-for="(item, i) of items"
				:key="item.id"
				cols="6"
				:src="item.thumbnail"
				@click="openDetails(i)"
			/>
		</LibraryItems>
	</LibraryWrapper>
	<PersistentHeaderDialog
		v-model="showDetails"
		@close="showDetails = false"
		:max-width="DETAILS_DIALOG_WIDTH"
		scroll
	>
		<DetailsCarousel v-model="index">
			<TemplateDetails v-for="item of items" :key="item.id" v-bind="item" />
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="addTemplate">Add Template</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
