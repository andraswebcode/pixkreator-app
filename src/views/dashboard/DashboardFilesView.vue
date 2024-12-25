<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import useRequest from '../../hooks/request';
import { useNotice, useUser } from '../../store';

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
const userData = useUser();
const notice = useNotice();
const search = ref(route.query.search);
const source = ref(route.params.source);
const items = ref<any>([]);
const page = ref(2);
const loading = ref(true);
const { list, destroy } = useRequest();
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
			source: source.value,
			page: page.value
		},
		'uploads',
		(data) => {
			items.value.push(...data.items);
			page.value++;
		}
	);
};
const editFile = (i: number) => {
	const item = items.value[i];
	router.push({
		name: 'editor',
		query: {
			file: item.id
		}
	});
};
const downloadFile = (i: number) => () => {
	const item = items.value[i];
	const { id, image, file_name, file_extension } = item;
	const name = file_name || 'image-' + id;
	const a = document.createElement('a');

	a.style.display = 'none';
	a.href = image;
	a.download = name + '.' + file_extension;

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};
const deleteFile = (i: number) => () => {
	if (!confirm('Are you sure you want to permanently delete this item?')) {
		return;
	}

	const item = items.value[i];
	const id = item.id;
	destroy(
		id,
		'uploads',
		false,
		(data) => {
			notice.send(data.message, 'success');
			items.value = items.value.filter((item) => item.id !== id);
		},
		(error) => {
			console.log(error);

			notice.send(error.response?.data?.message || error.message, 'error');
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
	<div v-if="!userData.user.email_verified">
		<VerifyEmailAlert />
	</div>
	<LibraryWrapper v-else>
		<VRow justify="space-between" align="center">
			<VCol cols="12" md="4"></VCol>
			<VCol cols="12" md="4">
				<SearchFilter label="Search Files" v-model="search" @click:append-inner="filter">
					<VList min-width="331">
						<VListItem>
							<VSelect
								label="Category"
								:items="fileSources"
								v-model="source"
								@update:model-value="filter"
							/>
						</VListItem>
					</VList>
				</SearchFilter>
			</VCol>
			<VCol cols="12" md="4">
				<VRow justify="center" justify-md="end">
					<VCol cols="auto" class="mr-4">
						<VBtnGroup density="compact">
							<VBtn prepend-icon="mdi-cloud-upload" to="upload">Upload</VBtn>
						</VBtnGroup>
					</VCol>
				</VRow>
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
				v-for="(item, i) of items"
				:key="item.id"
				cols="2"
				:actions="[
					{
						label: 'Download',
						prependIcon: 'mdi-download',
						onClick: downloadFile(i)
					},
					{
						label: 'Delete',
						prependIcon: 'mdi-trash-can',
						onClick: deleteFile(i)
					}
				]"
				:src="item.image"
				responsive
				@click="editFile(i)"
			/>
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
