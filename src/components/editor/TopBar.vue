<script setup lang="ts">
import { mdiRedo, mdiUndo } from '@mdi/js';
import { useRequest } from '../../hooks';
import { useRoute, useRouter } from 'vue-router';
import { useProject } from '../../store';
import { toRaw } from 'vue';

const { save } = useRequest();
const route = useRoute();
const router = useRouter();
const project = useProject();
const saveDesign = () => {
	const { title, description, status, width, height, byIds, ids } = project;

	save(
		route.params.id as string,
		{
			title,
			description,
			status,
			width,
			height,
			layers: toRaw(byIds),
			layer_ids: toRaw(ids)
		},
		({ id }) => {
			router.push({
				params: { id }
			});
		}
	);
};
</script>

<template>
	<VAppBar>
		<template v-slot:prepend></template>
		<VBtn :icon="mdiUndo" v-tooltip="'Undo'" />
		<VBtn :icon="mdiRedo" v-tooltip="'Redo'" />
		<template v-slot:append>
			<VBtn color="primary" variant="flat" @click="saveDesign">Save</VBtn>
			<UserMenu />
		</template>
	</VAppBar>
</template>

<style scoped lang="scss"></style>
