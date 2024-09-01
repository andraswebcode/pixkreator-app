<script setup lang="ts">
const props = defineProps<{
	title: string;
	photographer: string;
	photographer_url: string;
	src: string;
	large: string;
	medium: string;
	thumbnail: string;
	proxy: any;
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
				<h3 class="mb-2">
					{{ props.title || 'Photo' }} - by
					<a :href="props.photographer_url" target="_blank">{{ props.photographer }}</a>
				</h3>
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
h3 {
	white-space: normal;
}
</style>
