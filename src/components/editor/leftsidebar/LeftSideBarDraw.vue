<script setup lang="ts">
import { computed } from 'vue';
import { useEditor, useProject } from '../../../store';

const editor = useEditor();
const project = useProject();
const btnLabel = computed(() => (editor.mode === 'draw' ? 'Stop Drawing' : 'Start Drawing'));
const switchDrawing = () => {
	if (editor.mode === 'draw') {
		editor.mode = 'select';
	} else {
		editor.mode = 'draw';
	}
};
const testAddRect = () => {
	project.addLayer({
		type: 'rect',
		width: 200,
		height: 200,
		fill: 'rgba(0, 0, 0, 0)',
		stroke: 'black',
		strokeWidth: 12
	});
};
</script>

<template>
	<VBtn @click="testAddRect">Test Add Rect</VBtn>
	<VSelect label="Draw" v-model="editor.pencil" />
	<VSlider label="Pencil Width" v-model="editor.penWidth" />
	<ColorPicker label="Pencil Color" v-model="editor.penColor" />
	<div class="px-4">
		<VBtn block :color="editor.mode === 'draw' ? 'primary' : ''" @click="switchDrawing">{{
			btnLabel
		}}</VBtn>
	</div>
</template>

<style scoped lang="scss"></style>
