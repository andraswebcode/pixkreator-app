<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { DETAILS_DIALOG_WIDTH } from '../../../utils/constants';
import useRequest from '../../../hooks/request';
import { useNotice, useProject, useUser } from '../../../store';
import useFitToScreen from '../../../hooks/fittoscreen';
import { parseSVG } from '../../../utils/parse-svg';

const { list } = useRequest();
const fitToScreen = useFitToScreen();
const userData = useUser();
const project = useProject();
const notice = useNotice();
const search = ref('');
const items = ref<any[]>([]);
const page = ref(2);
const loading = ref(true);
const showDetails = ref(false);
const index = ref(0);
const resize = ref(false);
const filter = () => {
	items.value = [];
	loading.value = true;
	list(
		{
			search: search.value,
			source: 'uploads'
		},
		'uploads',
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
			source: 'uploads',
			page: page.value
		},
		'uploads',
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
const addImage = () => {
	const item = items.value[index.value];

	if (resize.value) {
		project.width = item.width;
		project.height = item.height;
	}

	if (item.mime_type === 'image/svg+xml') {
		parseSVG(item.image)
			.then(({ layers, group }) => {
				if (layers.length === 0) {
					notice.send('SVG parse failed.', 'error');
				} else if (layers.length === 1) {
					project.addLayer(layers[0]);
				} else {
					project.addLayer(group);
				}
				showDetails.value = false;
				fitToScreen();
			})
			.catch(console.warn);
	} else {
		project.addLayer({
			type: 'image',
			src: item.image,
			left: project.width / 2,
			top: project.height / 2
		});
		showDetails.value = false;
		fitToScreen();
	}
};

onMounted(filter);
</script>

<template>
	<VerifyEmailAlert v-if="!userData.user.email_verified" class="mx-3 mt-3" />
	<LibraryWrapper v-else>
		<SearchInput label="Search" v-model="search" @click:append-inner="filter" />
		<LibraryItems
			:items-length="items.length"
			:count="24"
			:cols="6"
			:loading="loading"
			@load="loadMore"
		>
			<GridItem
				v-for="(item, i) of items"
				:key="item.id"
				cols="6"
				:src="item.image"
				@click="openDetails(i)"
			/>
		</LibraryItems>
	</LibraryWrapper>
	<PersistentHeaderDialog
		v-model="showDetails"
		@close="showDetails = false"
		:max-width="DETAILS_DIALOG_WIDTH"
		scroll
	>
		<DetailsCarousel v-model="index">
			<UploadDetails v-for="item of items" :key="item.id" v-bind="item">
				<VSwitch label="Resize Canvas to Image Size" v-model="resize" />
			</UploadDetails>
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="addImage">Add Image</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
