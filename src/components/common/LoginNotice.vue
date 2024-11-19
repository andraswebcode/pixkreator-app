<script setup lang="ts">
import { useEditor } from '../../store';

const editor = useEditor();
</script>

<template>
	<VEmptyState
		icon="mdi-login"
		title="Unlock This Feature!"
		text="Sign in now to access all editing tools."
		action-text="Sign in"
		@click:action="editor.openLoginDialog = true"
	/>
</template>

<style scoped lang="scss"></style>
