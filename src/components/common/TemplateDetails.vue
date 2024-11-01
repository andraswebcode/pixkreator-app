<script setup lang="ts">
import { useDisplay } from 'vuetify';

const props = defineProps<{
	title: string;
	description: string;
	slug: string;
	width: number;
	height: number;
	layers: any;
	layer_ids: string[];
	colors: string[];
	fonts: string[];
	keywords: string[];
	preview: string;
	thumbnail: string;
	category: string;
	category_name: string;
	category_url: string;
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
				<VImg aspect-ratio="1" :src="props.preview" />
			</VCol>
			<VCol
				cols="12"
				md="4"
				class="w-100"
				:class="{
					'h-100': mdAndUp
				}"
			>
				<h3 class="mb-2">{{ props.title }}</h3>
				<p class="mb-4">{{ props.description }}</p>
				<slot />
			</VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
