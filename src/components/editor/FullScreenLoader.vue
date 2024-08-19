<script setup lang="ts">
import { useEditor } from '../../store';

const editor = useEditor();
</script>

<template>
	<VOverlay class="d-flex justify-center align-center" persistent v-model="editor.loading">
		<VProgressCircular indeterminate color="primary" size="64" />
	</VOverlay>
</template>

<style scoped lang="scss"></style>
