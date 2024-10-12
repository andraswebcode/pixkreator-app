<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import useRequest from '../../hooks/request';
import templateCategories from './../../utils/template-categories';
import { DETAILS_DIALOG_WIDTH } from '../../utils/constants';

const router = useRouter();
const route = useRoute();
const search = ref(route.query.search);
const category = ref(route.params.category);
const page = ref(2);
const loading = ref(true);
const showDetails = ref(false);
const index = ref(0);
const items = ref<any>([]);
const { list } = useRequest();
const categories = [
	{
		label: 'All',
		slug: ''
	},
	...templateCategories
];
const filter = () => {
	const query: any = {};
	const params: any = {};
	if (search.value) {
		query.search = search.value;
	}
	params.category = category.value;

	items.value = [];
	loading.value = true;
	router.push({
		query,
		params
	});
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
	router.push({
		name: 'editor',
		query: {
			template: id
		}
	});
};

onMounted(() => {
	list({ ...route.query, ...route.params }, 'templates', (data) => {
		items.value = data.items;
		loading.value = false;
	});
});
onBeforeRouteUpdate((to) => {
	list({ ...to.query, ...to.params }, 'templates', (data) => {
		items.value = data.items;
		page.value = 2;
		loading.value = false;
	});
});
</script>

<template>
	<LibraryWrapper>
		<VRow justify="center">
			<VCol cols="12" md="6" lg="4">
				<SearchFilter
					label="Search Templates"
					v-model="search"
					@click:append-inner="filter"
				>
					<VList min-width="331">
						<VListItem>
							<VSelect
								label="Category"
								:items="categories"
								item-value="slug"
								v-model="category"
								@update:model-value="filter"
							/>
						</VListItem>
					</VList>
				</SearchFilter>
			</VCol>
		</VRow>
		<LibraryItems
			:items-length="items.length"
			:count="24"
			:cols="2"
			:loading="loading"
			responsive
			@load="loadMore"
		>
			<GridItem
				v-for="(item, i) of items"
				:key="item.id"
				cols="2"
				:src="item.thumbnail"
				responsive
				@click="openDetails(i)"
			/>
		</LibraryItems>
	</LibraryWrapper>
	<PersistentHeaderDialog
		v-model="showDetails"
		@close="showDetails = false"
		:max-width="DETAILS_DIALOG_WIDTH"
	>
		<DetailsCarousel v-model="index">
			<VCarouselItem v-for="item of items" :key="item.id">
				<TemplateDetails v-bind="item" />
			</VCarouselItem>
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="addTemplate">Customize This Template</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
