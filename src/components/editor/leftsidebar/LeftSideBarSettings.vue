<script setup lang="ts">
import { useEditor } from '../../../store';

const editor = useEditor();
</script>

<template>
	<div class="pa-4">
		<VSwitch label="Snap Objects" v-model="editor.snap" />
		<VSwitch label="Show Margin" v-model="editor.showMargin" />
		<RangeSlider label="Margin" v-model="editor.margin" />
	</div>
</template>

<style scoped lang="scss"></style>
