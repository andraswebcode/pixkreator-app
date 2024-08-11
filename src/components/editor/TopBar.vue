<script setup lang="ts">
import { mdiRedo, mdiUndo } from '@mdi/js';
</script>

<template>
	<VAppBar>
		<template v-slot:prepend></template>
		<VBtn :icon="mdiUndo" />
		<VBtn :icon="mdiRedo" />
		<template v-slot:append>
			<VBtn color="primary" variant="flat">Save</VBtn>
			<UserMenu />
		</template>
	</VAppBar>
</template>

<style scoped lang="scss"></style>
