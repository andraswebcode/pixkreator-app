<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import useRequest from '../../hooks/request';
import { mdiDownload, mdiRename, mdiTrashCan, mdiUpload } from '@mdi/js';

const fileSources: { label: string; value: string }[] = [
	{
		label: 'All',
		value: ''
	},
	{
		label: 'Uploads',
		value: 'uploads'
	},
	{
		label: 'AI Generated',
		value: 'ais'
	},
	{
		label: 'Design Related',
		value: 'designs'
	},
	{
		label: 'Fonts',
		value: 'fonts'
	}
];
const router = useRouter();
const route = useRoute();
const search = ref(route.query.search);
const source = ref(route.params.source);
const items = ref<any>([]);
const page = ref(2);
const loading = ref(true);
const { list } = useRequest();
const filter = () => {
	const query: any = {};
	const params: any = {};
	if (search.value) {
		query.search = search.value;
	}
	params.source = source.value;

	items.value = [];
	loading.value = true;
	router.push({
		query,
		params
	});
};
const loadMore = () => {
	list(
		{
			search: search.value,
			category: source.value,
			page: page.value
		},
		'uploads',
		(data) => {
			items.value.push(...data.items);
			page.value++;
		}
	);
};

onMounted(() => {
	list({ ...route.query, ...route.params }, 'uploads', (data) => {
		items.value = data.items;
		loading.value = false;
	});
});
onBeforeRouteUpdate((to) => {
	list({ ...to.query, ...to.params }, 'uploads', (data) => {
		items.value = data.items;
		page.value = 2;
		loading.value = false;
	});
});
</script>

<template>
	<LibraryWrapper>
		<VRow justify="space-between" align="center">
			<VCol cols="12" md="4"></VCol>
			<VCol cols="12" md="4">
				<SearchInput label="Search Files" v-model="search" @click:append-inner="filter" />
			</VCol>
			<VCol cols="12" md="4">
				<VRow justify="center" justify-md="end">
					<VCol cols="auto" class="mr-4">
						<VBtn :prepend-icon="mdiUpload">Upload</VBtn>
					</VCol>
				</VRow>
			</VCol>
		</VRow>
		<VRow justify="center">
			<VCol cols="12" md="6" lg="4">
				<VCard>
					<VTabs center-active v-model="source" @update:model-value="filter">
						<VTab v-for="type of fileSources" :key="type.value" :value="type.value">
							{{ type.label }}
						</VTab>
					</VTabs>
				</VCard>
			</VCol>
		</VRow>
		<LibraryItems
			:items-length="items.length"
			:count="24"
			:cols="2"
			:loading="loading"
			responsive
			@load="loadMore"
		>
			<GridItem
				v-for="item of items"
				:key="item.id"
				cols="2"
				selectable
				:actions="[
					{
						label: 'Rename',
						prependIcon: mdiRename
					},
					{
						label: 'Download',
						prependIcon: mdiDownload
					},
					{
						label: 'Delete',
						prependIcon: mdiTrashCan
					}
				]"
				:src="item.image"
				responsive
			/>
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
