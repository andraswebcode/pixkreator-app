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
		<TemplatesList v-if="editor.tool === 'templates'" />
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
