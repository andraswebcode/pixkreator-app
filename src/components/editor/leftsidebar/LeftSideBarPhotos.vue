<script setup lang="ts">
import { mdiMagnify } from '@mdi/js';
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';

const { list } = useRequest();
const query = ref('');
const items = ref<any[]>([]);
const showDetails = ref(false);
const index = ref(0);
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
const openDetails = (i: number) => {
	showDetails.value = true;
	index.value = i;
};

onMounted(filter);
</script>

<template>
	<LibraryWrapper>
		<VTextField
			label="Search Photos"
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
					<GridItem
						v-for="(item, i) of items"
						:key="item.id"
						cols="6"
						:src="item.thumbnail"
						@click="openDetails(i)"
					/>
				</VRow>
			</VContainer>
			<VContainer v-else>
				<VRow>
					<GridLoader :cols="6" :count="24" />
				</VRow>
			</VContainer>
		</VInfiniteScroll>
	</LibraryWrapper>
	<PersistentHeaderDialog v-model="showDetails" @close="showDetails = false" max-width="800">
		<DetailsCarousel v-model="index">
			<VCarouselItem v-for="item of items" :key="item.id">
				<PhotoDetails v-bind="item" />
			</VCarouselItem>
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn>Add Photo</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
