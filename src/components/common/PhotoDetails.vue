<script setup lang="ts">
import { useDisplay } from 'vuetify';

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
const { mdAndUp } = useDisplay();
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
				<VImg aspect-ratio="1" :src="props.medium" />
			</VCol>
			<VCol
				cols="12"
				md="4"
				class="w-100"
				:class="{
					'h-100': mdAndUp
				}"
			>
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

<style scoped lang="scss"></style>
