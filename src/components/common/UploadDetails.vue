<script setup lang="ts">
import { useDisplay } from 'vuetify';

const props = defineProps<{
	title: string;
	image: string;
	width: number;
	height: number;
	user_id: number;
	file_name: string;
	mime_type: string;
	file_size: number;
	file_extension: string;
	source: string;
	metadata: any;
	created_at: string;
	updated_at: string;
}>();
const { mdAndUp } = useDisplay();
const actionTextMap = {
	'background-remover': 'Removed Background',
	'image-upscaler': 'Upscaled by 4x',
	'erase-object': 'Object Erased',
	inpaint: 'Inpainted'
};
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
				<VImg aspect-ratio="1" :src="props.image" />
			</VCol>
			<VCol
				cols="12"
				md="4"
				class="w-100"
				:class="{
					'h-100': mdAndUp
				}"
			>
				<h3 v-if="props.title" class="mb-2">{{ props.title }}</h3>
				<div v-if="props.source === 'ais'">
					<p v-if="props.metadata?.style">
						<strong>Style: </strong>
						{{ props.metadata.style }}
					</p>
					<p v-if="props.metadata?.app">
						<strong>Action: </strong>
						{{ actionTextMap[props.metadata.app] }}
					</p>
					<p v-if="props.metadata?.prompt">
						<strong>Prompt:</strong>
						<br />
						{{ props.metadata.prompt }}
					</p>
				</div>
				<slot />
			</VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
