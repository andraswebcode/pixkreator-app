<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEditor, useProject } from '../../store';

const editor = useEditor();
const project = useProject();
const show = ref(true);
const showLayerSettings = computed(
	() => editor.activeLayerIds.length === 1 && project.ids.includes(editor.activeLayerIds[0])
);
const onClick = () => {
	show.value = !show.value;
};
</script>

<template>
	<RightSideBarDrawer v-model="show">
		<RightSideBarLayerSettings v-if="showLayerSettings" />
		<RightSideBarCanvasSettings v-else />
		<template v-slot:append>
			<SideBarToggler
				@click="onClick"
				:icon="show ? 'mdi-chevron-right' : 'mdi-chevron-left'"
			/>
		</template>
	</RightSideBarDrawer>
</template>

<style scoped lang="scss">
.sidebar-toggler {
	top: calc(50% - 14px);
	left: -29px;
}
</style>
