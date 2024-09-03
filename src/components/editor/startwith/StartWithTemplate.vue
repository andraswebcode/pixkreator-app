<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useRequest from '../../../hooks/request';
import templateCategories from '../../../utils/template-categories';
import { DETAILS_DIALOG_WIDTH } from '../../../utils/constants';
import { useRouter } from 'vue-router';
import useFitToScreen from '../../../hooks/fittoscreen';

const categories = [
	{
		label: 'All Templates',
		value: ''
	}
].concat(templateCategories);
const { list } = useRequest();
const router = useRouter();
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
			category: category.value
		},
		'templates',
		(data) => {
			items.value = data.items;
			loading.value = false;
		}
	);
};
const filterCategory = (value: string) => {
	category.value = value;
	filter();
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
	<VContainer class="wrapper">
		<VRow>
			<VCol class="sidebar" cols="auto">
				<SearchInput
					label="Search Templates"
					v-model="search"
					@click:append-inner="filter"
				/>
				<VList>
					<VListItem
						v-for="cat of categories"
						link
						:active="cat.value === category"
						@click="filterCategory(cat.value)"
					>
						<VListItemTitle>{{ cat.label }}</VListItemTitle>
					</VListItem>
				</VList>
			</VCol>
			<VCol>
				<LibraryWrapper>
					<LibraryItems
						:items-length="items.length"
						:count="24"
						:cols="2"
						:loading="loading"
						@load="loadMore"
					>
						<GridItem
							v-for="(item, i) of items"
							:key="item.id"
							cols="2"
							:src="item.thumbnail"
							@click="openDetails(i)"
						/>
					</LibraryItems>
				</LibraryWrapper>
			</VCol>
		</VRow>
	</VContainer>
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

<style scoped lang="scss">
.wrapper {
	height: 90vh;
}
.v-row {
	height: 100%;
	.v-col {
		height: 100%;
	}
}
.sidebar {
	display: flex;
	flex-direction: column;
	flex-flow: column;
	width: 256px;
	& > * {
		flex: 0 0 auto;
	}
	.v-list {
		flex: 0 1 auto;
	}
}
</style>
