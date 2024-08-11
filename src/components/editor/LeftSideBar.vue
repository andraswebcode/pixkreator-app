<script setup lang="ts">
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { ref } from 'vue';

const show = ref(true);
const onClick = () => {
	show.value = !show.value;
};
</script>

<template>
	<VNavigationDrawer v-model="show">
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
