<script setup lang="ts">
import { ref } from 'vue';
import { useProject } from '../../../store';

const project = useProject();
const text = ref('Text');
const family = ref('Roboto');
const addText = () => {
	project.addLayer({
		type: 'i-text',
		text: text.value,
		fontFamily: family.value,
		left: project.width / 2,
		top: project.height / 2
	});
};
</script>

<template>
	<div class="pa-4">
		<VTextarea label="Text" v-model="text" />
		<FontSelect label="Font Family" v-model="family" />
		<VBtn block @click="addText">Add Text</VBtn>
	</div>
</template>

<style scoped lang="scss"></style>
