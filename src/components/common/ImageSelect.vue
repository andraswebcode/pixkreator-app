<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useRequest from '../../hooks/request';
import { PHOTO_ORIENTATIONS, DETAILS_DIALOG_WIDTH, PHOTO_SIZES } from '../../utils/constants';
import { Orientation, PhotoSize } from '../../types/common';
import { getCroppedImageDimensions } from '../../utils/functions';
import { useUser } from '../../store';

type ImageOrigin = 'photos' | 'uploads' | 'ais';

const props = defineProps<{
	btnLabel: string;
	addLabel?: string;
}>();
const src = defineModel<string>('src');
const width = defineModel<number>('width');
const height = defineModel<number>('height');
const userData = useUser();
const items = ref<any[]>([]);
const search = ref('');
const orientation = ref<Orientation | ''>('');
const color = ref('');
const page = ref(2);
const loading = ref(true);
const showDetails = ref(false);
const index = ref(0);
const size = ref<PhotoSize>('large');
const showImages = ref(false);
const imageOrigin = ref<ImageOrigin>('photos');
const { list } = useRequest();
const filter = () => {
	items.value = [];
	loading.value = true;
	if (imageOrigin.value === 'photos') {
		list(
			{
				query: search.value,
				orientation: orientation.value,
				color: color.value
			},
			'photos',
			(data) => {
				items.value = data.items;
				loading.value = false;
			}
		);
	} else {
		if (userData.loggedIn) {
			list(
				{
					search: search.value,
					source: imageOrigin.value
				},
				'uploads',
				(data) => {
					items.value = data.items;
					loading.value = false;
				}
			);
		}
	}
};
const loadMore = () => {
	if (imageOrigin.value === 'photos') {
		list(
			{
				query: search.value,
				orientation: orientation.value,
				color: color.value,
				page: page.value
			},
			'photos',
			(data) => {
				items.value.push(...data.items);
				page.value++;
			}
		);
	} else {
		if (userData.loggedIn) {
			list(
				{
					search: search.value,
					source: imageOrigin.value,
					page: page.value
				},
				'uploads',
				(data) => {
					items.value.push(...data.items);
					page.value++;
				}
			);
		}
	}
};
const openDetails = (i: number) => {
	showDetails.value = true;
	index.value = i;
};
const replaceImage = () => {
	showImages.value = false;
	showDetails.value = false;

	const item = items.value[index.value];

	if (imageOrigin.value === 'photos') {
		const cropped = getCroppedImageDimensions(item.width, item.height, size.value);

		src.value = item.proxy[size.value];
		width.value = cropped.width;
		height.value = cropped.height;
	} else {
		src.value = item.image;
		width.value = item.width;
		height.value = item.height;
	}
};

onMounted(filter);
</script>

<template>
	<LazyLoadImage v-if="src" class="mb-3" :src="src" aspect-ratio="1" />
	<VBtn class="mb-5" block @click="showImages = true">{{ props.btnLabel }}</VBtn>
	<PersistentHeaderDialog v-model="showImages" @close="showImages = false">
		<LibraryWrapper>
			<VRow justify="center" justify-md="space-between">
				<VCol cols="12" md="4">
					<SearchFilter
						v-if="imageOrigin === 'photos'"
						label="Search Photos"
						v-model="search"
						:filter-disabled="!search"
						@click:append-inner="filter"
					>
						<VList min-width="331">
							<VListItem>
								<VSelect
									label="Orientation"
									:items="PHOTO_ORIENTATIONS"
									v-model="orientation"
								/>
							</VListItem>
							<VListItem>
								<ColorPicker label="Color" v-model="color" />
							</VListItem>
						</VList>
					</SearchFilter>
					<SearchInput
						v-else
						label="Search Photos"
						v-model="search"
						@click:append-inner="filter"
					/>
				</VCol>
				<VCol v-if="userData.loggedIn" cols="auto">
					<VBtnToggle v-model="imageOrigin" @update:model-value="filter">
						<VBtn value="photos">Photos</VBtn>
						<VBtn value="uploads">Uploads</VBtn>
						<VBtn value="ais">AI Archive</VBtn>
					</VBtnToggle>
				</VCol>
			</VRow>
			<LibraryItems
				:items-length="items.length"
				:count="24"
				:cols="2"
				responsive
				:loading="loading"
				@load="loadMore"
			>
				<GridItem
					v-for="(item, i) of items"
					:key="item.id"
					cols="2"
					responsive
					:src="item.thumbnail || item.image"
					@click="openDetails(i)"
				/>
			</LibraryItems>
		</LibraryWrapper>
	</PersistentHeaderDialog>
	<PersistentHeaderDialog
		v-model="showDetails"
		@close="showDetails = false"
		:max-width="DETAILS_DIALOG_WIDTH"
	>
		<DetailsCarousel v-if="imageOrigin === 'photos'" v-model="index">
			<PhotoDetails v-for="item of items" :key="item.id" v-bind="item">
				<VSelect label="Select a Size" :items="PHOTO_SIZES" v-model="size" />
			</PhotoDetails>
		</DetailsCarousel>
		<DetailsCarousel v-else v-model="index">
			<UploadDetails v-for="item of items" :key="item.id" v-bind="item" />
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="replaceImage">{{ props.addLabel || props.btnLabel }}</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
