<script setup lang="ts">
const props = defineProps<{
	cols: string | number;
	src?: string;
}>();
const emit = defineEmits(['click']);
</script>

<template>
	<VCol :cols="props.cols">
		<VCard hover link @click.prevent="emit('click')">
			<VImg aspect-ratio="1" color="primary" :src="props.src" />
		</VCard>
	</VCol>
</template>

<style scoped lang="scss"></style>
