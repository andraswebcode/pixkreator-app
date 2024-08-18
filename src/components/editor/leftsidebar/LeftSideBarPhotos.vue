<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';
import { useProject } from '../../../store';
import { PHOTO_SIZES, DETAILS_DIALOG_WIDTH } from '../../../utils/constants';

const { list } = useRequest();
const project = useProject();
const query = ref('');
const items = ref<any[]>([]);
const page = ref(2);
const showDetails = ref(false);
const index = ref(0);
const size = ref('src');
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
const loadMore = () => {
	list(
		{
			query: query.value,
			page: page.value
		},
		'photos',
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
const addPhoto = () => {
	const item = items.value[index.value];
	project.addLayer({
		type: 'image',
		src: item.proxy[size.value]
	});
	showDetails.value = false;
};

onMounted(filter);
</script>

<template>
	<LibraryWrapper>
		<SearchInput label="Search Photos" v-model="query" @click:append-inner="filter" />
		<LibraryItems :items-length="items.length" :count="24" :cols="6" @load="loadMore">
			<GridItem
				v-for="(item, i) of items"
				:key="item.id"
				cols="6"
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
			<VCarouselItem v-for="item of items" :key="item.id">
				<PhotoDetails v-bind="item">
					<VSelect label="Select a Size" :items="PHOTO_SIZES" v-model="size" />
					<VSwitch label="Resize Canvas to Image Size" />
				</PhotoDetails>
			</VCarouselItem>
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="addPhoto">Add Photo</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
