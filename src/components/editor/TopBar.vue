<script setup lang="ts">
import { mdiRedo, mdiUndo } from '@mdi/js';
</script>

<template>
	<VAppBar>
		<template v-slot:prepend></template>
		<VBtn :icon="mdiUndo" v-tooltip="'Undo'" />
		<VBtn :icon="mdiRedo" v-tooltip="'Redo'" />
		<template v-slot:append>
			<VBtn color="primary" variant="flat">Save</VBtn>
			<UserMenu />
		</template>
	</VAppBar>
</template>

<style scoped lang="scss"></style>
