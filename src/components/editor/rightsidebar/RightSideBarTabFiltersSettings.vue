<script setup lang="ts">
import useProps from '../../../hooks/props';
import { useEditor } from '../../../store';

const editor = useEditor();
const { filters } = useProps(['filters']);
const searchFilters = () => {
	editor.tool = 'filters';
};
</script>

<template>
	<FilterSettings v-if="filters.length" show-header v-model="filters" />
	<div v-else>
		<VAlert class="mb-5" type="info" :icon="false"> No filters applied yet. </VAlert>
		<VBtn v-if="editor.tool !== 'filters'" block @click="searchFilters"> Search Filters </VBtn>
	</div>
</template>

<style scoped lang="scss"></style>
