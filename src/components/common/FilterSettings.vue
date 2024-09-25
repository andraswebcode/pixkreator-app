<script setup lang="ts">
import { computed } from 'vue';
import { mdiTrashCan } from '@mdi/js';
import { ImageFilter } from '../../types/image-filter';
import imageFilters from '../../utils/image-filters';
import { useEditor, useProject } from '../../store';

const props = defineProps<ImageFilter>();
const editor = useEditor();
const project = useProject();
const filter = computed<any>(() => imageFilters.find((f) => f.name === props.type));
const remove = () => {
	const id = editor.activeLayerIds[0];
	project.removeFilter(id, props.type);
};
</script>

<template>
	<div>
		<VRow class="mb-2" align="center">
			<VCol>
				<h4>{{ filter?.label }}</h4>
			</VCol>
			<VCol cols="auto">
				<VBtn :icon="mdiTrashCan" size="x-small" @click="remove" />
			</VCol>
		</VRow>
		<div v-for="c of filter?.controls" :key="c.name">
			<VSelect v-if="c.type === 'select'" :label="c.label" :items="c.options" />
			<RangeSlider v-else-if="c.type === 'range'" :label="c.label" />
			<ColorPicker v-else-if="c.type === 'color'" :label="c.label" />
		</div>
		<VDivider class="mb-2" />
	</div>
</template>

<style scoped lang="scss"></style>
