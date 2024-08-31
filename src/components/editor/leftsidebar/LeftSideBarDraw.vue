<script setup lang="ts">
import { computed } from 'vue';
import { useEditor } from '../../../store';

const editor = useEditor();
const btnLabel = computed(() => (editor.mode === 'draw' ? 'Stop Drawing' : 'Start Drawing'));
const switchDrawing = () => {
	if (editor.mode === 'draw') {
		editor.mode = 'select';
	} else {
		editor.mode = 'draw';
	}
};
</script>

<template>
	<div class="pa-4">
		<VSelect label="Draw" v-model="editor.pencil" density="compact" />
		<RangeSlider label="Pencil Width" v-model="editor.penWidth" />
		<ColorPicker label="Pencil Color" v-model="editor.penColor" />
		<VBtn block :color="editor.mode === 'draw' ? 'primary' : ''" @click="switchDrawing">
			{{ btnLabel }}
		</VBtn>
	</div>
</template>

<style scoped lang="scss"></style>
