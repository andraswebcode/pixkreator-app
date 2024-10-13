<script setup lang="ts">
const props = defineProps<{
	title: string;
	image: string;
	width: number;
	height: number;
	user_id: number;
	file_name: string;
	mime_type: string;
	file_size: string;
	file_extension: string;
	source: string;
	metadata: any;
	created_at: string;
	updated_at: string;
}>();
</script>

<template>
	<VContainer>
		<VRow>
			<VCol cols="12" md="8" align-self="center">
				<VImg aspect-ratio="1" :src="props.image" />
			</VCol>
			<VCol cols="12" md="4">
				<h3 v-if="props.title" class="mb-2">{{ props.title }}</h3>
				<p v-if="props.source === 'ais'">
					<strong>Prompt:</strong>
					<br />
					{{ props.metadata?.prompt }}
				</p>
				<slot />
			</VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
