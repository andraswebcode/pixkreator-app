<script setup lang="ts">
const props = defineProps<{
	cols: number;
	count: number;
}>();
</script>

<template>
	<VCol v-for="i in props.count" :key="i" :cols="props.cols">
		<VCard>
			<VResponsive aspect-ratio="1">
				<VSkeletonLoader height="100%" />
			</VResponsive>
		</VCard>
	</VCol>
</template>

<style scoped lang="scss"></style>
