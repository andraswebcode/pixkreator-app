<script setup lang="ts">
import { useEditor, useStAI } from '../../store';

const editor = useEditor();
const stai = useStAI();
</script>

<template>
	<VMain>
		<VContainer class="position-relative">
			<CanvasBackground />
			<FabricCanvas />
			<CanvasPan v-if="editor.mode === 'pan'" />
			<ContextMenu v-if="editor.mode === 'select' && editor.showContextMenu" />
			<MaskDrawingCanvas v-if="stai.drawMask" />
		</VContainer>
	</VMain>
</template>

<style scoped lang="scss">
.v-container {
	height: 100%;
}
</style>
