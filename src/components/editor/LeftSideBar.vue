<script setup lang="ts">
import { computed } from 'vue';
import { useEditor } from '../../store';

const editor = useEditor();
const show = computed(() => !!editor.tool);
</script>

<template>
	<LeftSideBarDrawer v-model="show">
		<LeftSideBarTemplates v-if="editor.tool === 'templates'" />
		<LeftSideBarUploads v-else-if="editor.tool === 'uploads'" />
		<LeftSideBarPhotos v-else-if="editor.tool === 'photos'" />
		<LeftSideBarGraphics v-else-if="editor.tool === 'graphics'" />
		<LeftSideBarTexts v-else-if="editor.tool === 'texts'" />
		<LeftSideBarAI v-else-if="editor.tool === 'ai'" />
		<LeftSideBarFilters v-else-if="editor.tool === 'filters'" />
		<LeftSideBarDraw v-else-if="editor.tool === 'draw'" />
		<LeftSideBarApps v-else-if="editor.tool === 'apps'" />
		<LeftSideBarBrand v-else-if="editor.tool === 'brand'" />
		<LeftSideBarLayerList v-else-if="editor.tool === 'list'" />
		<LeftSideBarSettings v-else-if="editor.tool === 'settings'" />
	</LeftSideBarDrawer>
</template>

<style scoped lang="scss">
.sidebar-toggler {
	top: calc(50% - 14px);
	left: calc(100% + 1px);
}
</style>
