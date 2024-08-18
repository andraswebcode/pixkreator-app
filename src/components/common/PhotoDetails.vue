<script setup lang="ts">
const props = defineProps<{
	title: string;
	medium: string;
	width: number;
	height: number;
}>();
</script>

<template>
	<VContainer>
		<VRow>
			<VCol cols="8" align-self="center">
				<VImg aspect-ratio="1" :src="props.medium" />
			</VCol>
			<VCol cols="4">
				<h3 class="mb-2">{{ props.title }}</h3>
				<p class="mb-4">Original size: {{ props.width }}x{{ props.height }}</p>
				<slot />
			</VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss">
.v-container,
.v-row {
	width: 100%;
	height: 100%;
}
</style>
