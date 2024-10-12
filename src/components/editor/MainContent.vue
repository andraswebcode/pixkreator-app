<script setup lang="ts">
import { useEditor } from '../../store';

const editor = useEditor();
</script>

<template>
	<VMain>
		<VContainer class="position-relative">
			<CanvasBackground />
			<FabricCanvas />
			<CanvasPan v-if="editor.mode === 'pan'" />
		</VContainer>
	</VMain>
</template>

<style scoped lang="scss">
.v-container {
	height: 100%;
}
</style>
