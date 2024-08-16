<script setup lang="ts">
const props = defineProps<{
	cols: string | number;
	src: string;
}>();
</script>

<template>
	<VCol :cols="props.cols">
		<VCard>
			<VImg aspect-ratio="1" color="primary" cover :lazy-src="props.src" :src="props.src" />
		</VCard>
	</VCol>
</template>

<style scoped lang="scss"></style>
