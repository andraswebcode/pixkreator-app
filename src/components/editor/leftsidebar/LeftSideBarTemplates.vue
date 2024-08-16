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
			item-title="label"
			item-value="value"
			flat
			single-line
			hide-details
			@update:model-value="filter"
		/>
		<VInfiniteScroll v-if="items.length">
			<VContainer>
				<VRow>
					<GridItem v-for="item of items" :key="item.id" cols="6" />
				</VRow>
			</VContainer>
		</VInfiniteScroll>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
