<script setup lang="ts">
const props = defineProps<{
	src: string;
}>();
</script>

<template>
	<VContainer>
		<VRow>
			<VCol>
				<VImg color="primary" :src="src" />
			</VCol>
			<VCol></VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
