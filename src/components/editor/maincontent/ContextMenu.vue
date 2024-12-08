<script setup lang="ts">
import { computed } from 'vue';
import { useEditor } from '../../../store';

const editor = useEditor();
const style = computed(() => ({
	left: editor.contextMenuX + 'px',
	top: editor.contextMenuY + 'px'
}));
const lockLayer = () => {};
const hideLayer = () => {};
const cloneLayer = () => {};
const removeLayer = () => {};
</script>

<template>
	<VMenu :model-value="true" contained :content-props="{ style }">
		<VList density="compact">
			<VListItem prepend-icon="mdi-lock" @click="lockLayer">Lock</VListItem>
			<VListItem prepend-icon="mdi-eye" @click="hideLayer">Hide</VListItem>
			<VListItem prepend-icon="mdi-content-copy" @click="cloneLayer">Clone</VListItem>
			<VListItem prepend-icon="mdi-trash-can" @click="removeLayer">Remove</VListItem>
		</VList>
	</VMenu>
</template>

<style scoped lang="scss"></style>
