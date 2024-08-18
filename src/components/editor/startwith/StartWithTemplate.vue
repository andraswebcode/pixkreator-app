<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useRequest from '../../../hooks/request';
import templateCategories from '../../../utils/template-categories';
import { DETAILS_DIALOG_WIDTH } from '../../../utils/constants';

const { list } = useRequest();
const search = ref('');
const category = ref('');
const page = ref(2);
const items = ref<any>([]);
const index = ref(0);
const showDetails = ref(false);
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
const openDetails = (i: number) => {
	showDetails.value = true;
	index.value = i;
};

onMounted(filter);
</script>

<template>
	<VContainer class="wrapper">
		<VRow>
			<VCol class="sidebar" cols="auto">
				<SearchInput label="Search Templates" />
				<VList>
					<VListItem link>
						<VListItemTitle>Editor's Choice</VListItemTitle>
					</VListItem>
					<VListItem link>
						<VListItemTitle>All Templates</VListItemTitle>
					</VListItem>
					<VDivider />
					<VListItem v-for="cat of templateCategories" link>
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
			<VBtn>Customize This Template</VBtn>
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
	width: 256px;
}
</style>
