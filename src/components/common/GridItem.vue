<script setup lang="ts">
const props = defineProps<{
	cols: string | number;
}>();
</script>

<template>
	<VCol :cols="props.cols">
		<VCard>
			<VImg aspect-ratio="0.75" color="primary" />
		</VCard>
	</VCol>
</template>

<style scoped lang="scss"></style>
