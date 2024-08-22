<script setup lang="ts">
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { ref } from 'vue';
import { useEditor } from '../../store';

const editor = useEditor();
const show = ref(true);
const onClick = () => {
	show.value = !show.value;
};
</script>

<template>
	<VNavigationDrawer v-if="editor.tool" v-model="show" :width="356">
		<LeftSideBarTemplates v-if="editor.tool === 'templates'" />
		<LeftSideBarUploads v-else-if="editor.tool === 'uploads'" />
		<LeftSideBarPhotos v-else-if="editor.tool === 'photos'" />
		<LeftSideBarGraphics v-else-if="editor.tool === 'graphics'" />
		<LeftSideBarTexts v-else-if="editor.tool === 'texts'" />
		<LeftSideBarAI v-else-if="editor.tool === 'ai'" />
		<LeftSideBarDraw v-else-if="editor.tool === 'draw'" />
		<LeftSideBarBrand v-else-if="editor.tool === 'brand'" />
		<template v-slot:append>
			<SideBarToggler @click="onClick" :icon="show ? mdiChevronLeft : mdiChevronRight" />
		</template>
	</VNavigationDrawer>
</template>

<style scoped lang="scss">
.sidebar-toggler {
	top: calc(50% - 14px);
	left: calc(100% + 1px);
}
</style>
