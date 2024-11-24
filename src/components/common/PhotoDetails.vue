<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { getCroppedImageDimensions } from '../../utils/functions';
import { PhotoSize } from '../../types/common';

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
	size: PhotoSize;
}>();
const { mdAndUp } = useDisplay();
const size = computed(() => {
	const { width, height } = getCroppedImageDimensions(props.width, props.height, props.size);
	return `${width}x${height}`;
});
</script>

<template>
	<VContainer class="w-100 h-100">
		<VRow class="w-100 h-100">
			<VCol
				cols="12"
				md="8"
				align-self="center"
				class="w-100"
				:class="{
					'h-100': mdAndUp
				}"
			>
				<LazyLoadImage aspect-ratio="1" :src="props.medium" />
			</VCol>
			<VCol
				cols="12"
				md="4"
				class="w-100"
				:class="{
					'h-100': mdAndUp
				}"
			>
				<h3 class="mb-4">
					{{ props.title || 'Photo' }} - by
					<a :href="props.photographer_url" target="_blank">{{ props.photographer }}</a>
				</h3>
				<p class="mb-2">Original size: {{ props.width }}x{{ props.height }}</p>
				<p class="mb-4">Size: {{ size }}</p>
				<slot />
			</VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
