<script setup lang="ts">
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { ref } from 'vue';
import { useEditor } from '../../store';

const show = ref(true);
const editor = useEditor();
const onClick = () => {
	show.value = !show.value;
};
</script>

<template>
	<VNavigationDrawer location="end" v-model="show">
		<RightSideBarLayerSettings v-if="editor.activeLayerIds.length" />
		<RightSideBarCanvasSettings v-else />
		<template v-slot:append>
			<SideBarToggler @click="onClick" :icon="show ? mdiChevronRight : mdiChevronLeft" />
		</template>
	</VNavigationDrawer>
</template>

<style scoped lang="scss">
.sidebar-toggler {
	top: calc(50% - 14px);
	left: -29px;
}
</style>
