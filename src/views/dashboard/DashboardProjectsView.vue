<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import useRequest from '../../hooks/request';
import { mdiContentCopy, mdiRename, mdiTrashCan, mdiViewList } from '@mdi/js';

const router = useRouter();
const route = useRoute();
const search = ref(route.query.search);
const page = ref(2);
const loading = ref(true);
const items = ref<any[]>([]);
const selections = ref<any[]>([]);
const { list } = useRequest();
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
	router.push({
		name: 'editor',
		params: {
			id: items.value[i].id
		}
	});
};

onMounted(() => {
	list({ ...route.query, ...route.params }, 'designs', (data) => {
		items.value = data.items;
		loading.value = false;
	});
});
onBeforeRouteUpdate((to) => {
	list({ ...to.query, ...to.params }, 'designs', (data) => {
		items.value = data.items;
		page.value = 2;
		loading.value = false;
	});
});
</script>

<template>
	<LibraryWrapper>
		<VRow justify="space-between" align="center">
			<VCol cols="4">
				<VRow v-if="selections.length" justify="start">
					<VCol cols="auto" class="ml-4">
						<VBtnGroup>
							<VBtn :icon="mdiContentCopy" size="x-small" />
							<VBtn :icon="mdiTrashCan" size="x-small" />
						</VBtnGroup>
					</VCol>
				</VRow>
			</VCol>
			<VCol cols="4">
				<SearchInput
					label="Search Projects"
					v-model="search"
					@click:append-inner="filter"
				/>
			</VCol>
			<VCol cols="4">
				<VRow justify="end">
					<VCol cols="auto" class="mr-4">
						<VBtnGroup>
							<VBtn :prepend-icon="mdiViewList">All</VBtn>
							<VBtn :prepend-icon="mdiTrashCan">Trash</VBtn>
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
			@load="loadMore"
		>
			<GridItem
				v-for="(item, i) of items"
				:key="item.id"
				:id="item.id"
				:label="item.title"
				cols="2"
				selectable
				:actions="[
					{
						label: 'Rename',
						prependIcon: mdiRename
					},
					{
						label: 'Clone',
						prependIcon: mdiContentCopy
					},
					{
						label: 'Delete',
						prependIcon: mdiTrashCan
					}
				]"
				:json="{
					...item,
					layers: item.layer_ids.map((id) => item.layers[id])
				}"
				@click="editProject(i)"
			/>
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
