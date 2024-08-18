<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import useRequest from '../../hooks/request';
import categories from './../../utils/template-categories';

const router = useRouter();
const route = useRoute();
const search = ref('');
const category = ref('');
const page = ref(2);
const items = ref<any>([]);
const { list } = useRequest();
const filter = () => {
	const query: any = {};
	if (search.value) {
		query.search = search.value;
	}
	items.value = [];
	router.push({
		query
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

onMounted(() => {
	list(route.query, 'templates', (data) => {
		items.value = data.items;
	});
});
onBeforeRouteUpdate((to) => {
	list(to.query, 'templates', (data) => {
		items.value = data.items;
		page.value = 2;
	});
});
</script>

<template>
	<LibraryWrapper>
		<VRow justify="center">
			<VCol cols="4">
				<SearchInput
					label="Search Templates"
					v-model="search"
					@click:append-inner="filter"
				/>
			</VCol>
		</VRow>
		<VRow justify="center">
			<VCol cols="4">
				<VCard>
					<VTabs center-active v-model="category" @update:model-value="filter">
						<VTab v-for="cat of categories" :key="cat.value" :value="cat.value">
							{{ cat.label }}
						</VTab>
					</VTabs>
				</VCard>
			</VCol>
		</VRow>
		<LibraryItems :items-length="items.length" :count="24" :cols="2" @load="loadMore">
			<GridItem v-for="item of items" :key="item.id" cols="2" :src="item.thumbnail" />
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
