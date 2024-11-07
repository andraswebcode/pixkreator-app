<script setup lang="ts">
import { useEditor } from '../../../store';

const editor = useEditor();
</script>

<template>
	<div class="pa-4">
		<VSwitch label="Show Margin" v-model="editor.showMargin" />
		<RangeSlider v-if="editor.showMargin" label="Margin" v-model="editor.margin" />
		<VSwitch label="Snap Objects" v-model="editor.snap" />
	</div>
</template>

<style scoped lang="scss"></style>
