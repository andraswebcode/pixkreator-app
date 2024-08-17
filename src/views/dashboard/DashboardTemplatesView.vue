<script setup lang="ts">
import { mdiMagnify } from '@mdi/js';
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import useRequest from '../../hooks/request';
import categories from './../../utils/template-categories';

const router = useRouter();
const route = useRoute();
const search = ref('');
const category = ref('');
const items = ref([]);
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

onMounted(() => {
	list(route.query, 'templates', (data) => {
		items.value = data.items;
	});
});
onBeforeRouteUpdate((to) => {
	list(to.query, 'templates', (data) => {
		items.value = data.items;
	});
});
</script>

<template>
	<VRow justify="center">
		<VCol cols="4">
			<SearchInput label="Search Templates" v-model="search" @click:append-inner="filter" />
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
	<VInfiniteScroll>
		<VContainer v-if="items.length">
			<VRow>
				<GridItem v-for="item of items" :key="item.id" cols="2" />
			</VRow>
		</VContainer>
		<VContainer v-else>
			<VRow>
				<GridLoader :cols="2" :count="24" />
			</VRow>
		</VContainer>
	</VInfiniteScroll>
</template>

<style scoped lang="scss"></style>
