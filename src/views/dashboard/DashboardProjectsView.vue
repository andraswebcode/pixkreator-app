<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import useRequest from '../../hooks/request';
import {
	mdiContentCopy,
	mdiDeleteForever,
	mdiRename,
	mdiRestore,
	mdiTrashCan,
	mdiViewList
} from '@mdi/js';
import { useNotice, useUser } from '../../store';

const router = useRouter();
const route = useRoute();
const notice = useNotice();
const userData = useUser();
const search = ref(route.query.search);
const page = ref(2);
const loading = ref(true);
const items = ref<any[]>([]);
const selections = ref<any[]>([]);
const { list, destroy } = useRequest();
const filter = () => {
	const query: any = {};
	if (search.value) {
		query.search = search.value;
	}

	items.value = [];
	loading.value = true;
	router.push({
		query
	});
};
const loadMore = () => {
	list(
		{
			search: search.value,
			page: page.value
		},
		'designs',
		(data) => {
			items.value.push(...data.items);
			page.value++;
		}
	);
};
const editProject = (i: number) => {
	const item = items.value[i];
	if (item.deleted_at) {
		return;
	}
	router.push({
		name: 'editor',
		params: {
			id: item.id
		}
	});
};
const renameProject = (i: number) => () => {
	console.log(i);
};
const cloneProject = (i: number) => () => {
	console.log(i);
};
const deleteProject = (i: number) => () => {
	const item = items.value[i];
	const id = item.id;
	const force = item.deleted_at;
	destroy(
		id,
		'designs',
		force,
		(data) => {
			notice.send(data.message, 'success');
			items.value = items.value.filter((item) => item.id !== id);
		},
		(error) => {
			notice.send(error.response?.data?.message || error.message, 'error');
		}
	);
};

onMounted(() => {
	loading.value = true;
	list({ ...route.query, ...route.params }, 'designs', (data) => {
		items.value = data.items;
		loading.value = false;
	});
});
onBeforeRouteUpdate((to) => {
	loading.value = true;
	list({ ...to.query, ...to.params }, 'designs', (data) => {
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
			<VCol cols="12" md="4">
				<VRow v-if="selections.length" justify="center" justify-md="start">
					<VCol cols="auto" class="ml-4">
						<VBtnGroup>
							<VBtn :icon="mdiContentCopy" size="x-small" />
							<VBtn :icon="mdiTrashCan" size="x-small" />
						</VBtnGroup>
					</VCol>
				</VRow>
			</VCol>
			<VCol cols="12" md="4">
				<SearchInput
					label="Search Projects"
					v-model="search"
					@click:append-inner="filter"
				/>
			</VCol>
			<VCol cols="12" md="4">
				<VRow justify="center" justify-md="end">
					<VCol cols="auto" class="mr-4">
						<VBtnGroup density="compact">
							<VBtn
								:active="!route.query.trashed"
								:prepend-icon="mdiViewList"
								:to="{
									query: {
										search
									}
								}"
							>
								All
							</VBtn>
							<VBtn
								:active="!!route.query.trashed"
								:prepend-icon="mdiTrashCan"
								:to="{
									query: {
										search,
										trashed: 'true'
									}
								}"
							>
								Trash
							</VBtn>
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
				:id="item.id"
				:label="item.title"
				cols="2"
				selectable
				:actions="
					item.deleted_at
						? [
								{
									label: 'Restore',
									prependIcon: mdiRestore
								},
								{
									label: 'Delete Permanently',
									prependIcon: mdiDeleteForever
								}
						  ]
						: [
								{
									label: 'Rename',
									prependIcon: mdiRename,
									onClick: renameProject(i)
								},
								{
									label: 'Clone',
									prependIcon: mdiContentCopy,
									onClick: cloneProject(i)
								},
								{
									label: 'Delete',
									prependIcon: mdiTrashCan,
									onClick: deleteProject(i)
								}
						  ]
				"
				:json="{
					...item,
					layers: item.layer_ids.map((id) => item.layers[id])
				}"
				responsive
				@click="editProject(i)"
			/>
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
