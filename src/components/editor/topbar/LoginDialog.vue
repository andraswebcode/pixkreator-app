<script setup lang="ts">
import { useEditor } from '../../../store';
import { LOGIN_DIALOG_WIDTH } from '../../../utils/constants';

const editor = useEditor();
</script>

<template>
	<PersistentHeaderDialog
		title="Sign in to Continue"
		:max-width="LOGIN_DIALOG_WIDTH"
		v-model="editor.openLoginDialog"
		@close="editor.openLoginDialog = false"
	>
		<LoginCard />
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
