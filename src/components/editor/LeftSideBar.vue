<script setup lang="ts">
import { computed } from 'vue';
import { useEditor } from '../../store';

const editor = useEditor();
const show = computed(() => !!editor.tool);
</script>

<template>
	<VNavigationDrawer v-model="show" :width="356">
		<LeftSideBarTemplates v-if="editor.tool === 'templates'" />
		<LeftSideBarUploads v-else-if="editor.tool === 'uploads'" />
		<LeftSideBarPhotos v-else-if="editor.tool === 'photos'" />
		<LeftSideBarGraphics v-else-if="editor.tool === 'graphics'" />
		<LeftSideBarTexts v-else-if="editor.tool === 'texts'" />
		<LeftSideBarAI v-else-if="editor.tool === 'ai'" />
		<LeftSideBarFilters v-else-if="editor.tool === 'filters'" />
		<LeftSideBarDraw v-else-if="editor.tool === 'draw'" />
		<LeftSideBarBrand v-else-if="editor.tool === 'brand'" />
	</VNavigationDrawer>
</template>

<style scoped lang="scss">
.sidebar-toggler {
	top: calc(50% - 14px);
	left: calc(100% + 1px);
}
</style>
