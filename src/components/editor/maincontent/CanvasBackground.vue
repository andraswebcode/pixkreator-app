<script setup lang="ts">
import { computed } from 'vue';
import { useEditor, useProject } from '../../../store';

const editor = useEditor();
const project = useProject();
const wrap = computed(() => ({
	width: editor.width + 'px',
	height: editor.height + 'px'
}));
const style = computed(() => ({
	width: project.width * editor.zoom + 'px',
	height: project.height * editor.zoom + 'px',
	left: editor.width / 2 - (project.width / 2) * editor.zoom + editor.panX + 'px',
	top: editor.height / 2 - (project.height / 2) * editor.zoom + editor.panY + 'px',
	backgroundSize: editor.zoom * 20 + 'px'
}));
</script>

<template>
	<div class="wrap" :style="wrap">
		<div class="bg" :style="style" />
	</div>
</template>

<style scoped lang="scss">
.wrap {
	position: absolute;
	left: 16px; // This is the container's padding value.
	top: 16px;
	overflow: hidden;
}
.bg {
	position: absolute;
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAABXZJREFUeF7t1QERgCAUBUHIRCc6EYpMWmNnOBN8XW/e3Ht/o4f5Amst5pYOGWMWiPUbFIjlUSCWxygQC6RALI8CwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTwKBANpQSyQArE8WhDMo0AwkBbEAikQy6MFwTzmOefDbnr6nHvv0++vvXyBYCIFYoEUiOUxCsQCKRDLo0AwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjwLBQFoQC6RALI8WBPMoEAykBbFACsTyaEEwjx+3YB8CrWGGPAAAAABJRU5ErkJggg==');
	background-repeat: repeat;
}
</style>
