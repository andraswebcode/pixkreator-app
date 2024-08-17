<script setup lang="ts">
import { mdiMagnify } from '@mdi/js';
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';
import categories from '../../../utils/template-categories';

const { list } = useRequest();
const search = ref('');
const category = ref('');
const items = ref([]);
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

onMounted(filter);
</script>

<template>
	<LibraryWrapper>
		<VTextField
			label="Search Templates"
			variant="solo"
			hide-details
			single-line
			flat
			:append-inner-icon="mdiMagnify"
			:model-value="search"
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
		<VInfiniteScroll>
			<VContainer v-if="items.length">
				<VRow>
					<GridItem v-for="item of items" :key="item.id" cols="6" />
				</VRow>
			</VContainer>
			<VContainer v-else>
				<VRow>
					<GridLoader :cols="6" :count="24" />
				</VRow>
			</VContainer>
		</VInfiniteScroll>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
