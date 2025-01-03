<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useRequest from '../../../hooks/request';
import templateCategories from '../../../utils/template-categories';
import { DETAILS_DIALOG_WIDTH } from '../../../utils/constants';
import { useRoute, useRouter } from 'vue-router';
import useFitToScreen from '../../../hooks/fittoscreen';

const categories = [
	{
		label: 'All Templates',
		value: ''
	},
	...templateCategories
];
const { list } = useRequest();
const router = useRouter();
const route = useRoute();
const fitToScreen = useFitToScreen();
const search = ref('');
const category = ref('');
const page = ref(2);
const loading = ref(true);
const items = ref<any>([]);
const index = ref(0);
const showDetails = ref(false);
const filter = () => {
	items.value = [];
	loading.value = true;
	list(
		{
			search: search.value,
			category: category.value,
			keyword: route.query.keyword
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
			keyword: route.query.keyword,
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
	router
		.replace({
			query: {
				template: id
			},
			params: {
				id: ''
			}
		})
		.then(() => {
			fitToScreen();
		});
};

onMounted(filter);
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
			responsive
			:loading="loading"
			@load="loadMore"
		>
			<GridItem
				v-for="(item, i) of items"
				:key="item.id"
				cols="2"
				responsive
				:src="item.thumbnail"
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
			<TemplateDetails v-for="item of items" :key="item.id" v-bind="item" />
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="addTemplate">Customize This Template</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss">
.library-wrapper {
	height: calc(90vh - 30px);
}
</style>
