<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';
import { PHOTO_ORIENTATIONS, DETAILS_DIALOG_WIDTH, PHOTO_SIZES } from '../../../utils/constants';
import { Orientation, PhotoSize } from '../../../types/common';
import useProps from '../../../hooks/props';
import { useUser } from '../../../store';

type ImageOrigin = 'photo' | 'upload' | 'ai';

const userData = useUser();
const { src } = useProps(['src']);
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
const imageOrigin = ref<ImageOrigin>('photo');
const { list } = useRequest();
const filter = () => {
	items.value = [];
	loading.value = true;
	if (imageOrigin.value === 'photo') {
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
		list({}, 'assets', (data) => {
			items.value = data.items;
			loading.value = false;
		});
	}
};
const loadMore = () => {
	if (imageOrigin.value === 'photo') {
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
		list({}, 'assets', (data) => {
			items.value.push(...data.items);
			page.value++;
		});
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
	src.value = item.proxy[size.value];
};

onMounted(filter);
</script>

<template>
	<VExpansionPanel title="Image" value="image">
		<VExpansionPanelText>
			<div v-if="userData.user.admin">
				<VTextField label="Image Source (Admin Only)" v-model="src" />

				<VDivider class="my-8" />
			</div>
			<VBtn block @click="showImages = true">Replace Image</VBtn>
		</VExpansionPanelText>
	</VExpansionPanel>
	<PersistentHeaderDialog v-model="showImages" @close="showImages = false">
		<LibraryWrapper>
			<VRow justify="center" justify-md="space-between">
				<VCol cols="12" md="4">
					<SearchFilter
						v-if="imageOrigin === 'photo'"
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
				</VCol>
				<VCol cols="auto">
					<VBtnToggle v-model="imageOrigin" @update:model-value="filter">
						<VBtn value="photo">Photos</VBtn>
						<VBtn value="upload">Uploads</VBtn>
						<VBtn value="ai">AI Archive</VBtn>
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
					:src="item.thumbnail"
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
		<DetailsCarousel v-model="index">
			<VCarouselItem v-for="item of items" :key="item.id">
				<PhotoDetails v-bind="item">
					<VSelect label="Select a Size" :items="PHOTO_SIZES" v-model="size" />
				</PhotoDetails>
			</VCarouselItem>
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="replaceImage">Replace Image</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss">
.library-wrapper {
	height: 90vh;
}
</style>
