<script setup lang="ts">
const props = defineProps<{
	title: string;
	description: string;
	preview: string;
}>();
</script>

<template>
	<VContainer>
		<VRow>
			<VCol cols="8" align-self="center">
				<VImg aspect-ratio="1" :src="props.preview" />
			</VCol>
			<VCol cols="4">
				<h3 class="mb-2">{{ props.title }}</h3>
				<p class="mb-4">{{ props.description }}</p>
				<slot />
			</VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
