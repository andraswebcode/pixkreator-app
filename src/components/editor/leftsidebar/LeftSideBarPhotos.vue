<script setup lang="ts">
import { mdiMagnify } from '@mdi/js';
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';

const { list } = useRequest();
const query = ref('');
const items = ref([]);
const filter = () => {
	items.value = [];
	list(
		{
			query: query.value
		},
		'photos',
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
			v-model="query"
			@click:append-inner="filter"
		/>
		<VInfiniteScroll>
			<VContainer v-if="items.length">
				<VRow>
					<GridItem v-for="item of items" :key="item.id" cols="6" :src="item.thumbnail" />
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
