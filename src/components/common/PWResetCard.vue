<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false);
const isValid = ref(false);
</script>

<template>
	<VCard>
		<VCardItem v-if="$slots.title || $slots.subtitle">
			<VCardTitle v-if="$slots.title">
				<slot name="title" />
			</VCardTitle>
			<VCardSubtitle v-if="$slots.subtitle">
				<slot name="subtitle" />
			</VCardSubtitle>
		</VCardItem>
		<VDivider v-if="$slots.title || $slots.subtitle" />
		<VForm v-model="isValid">
			<VCardItem>
				<VTextField label="Email" type="email" required />
				<slot />
			</VCardItem>
			<VDivider />
			<VCardActions>
				<VBtn type="submit" :disabled="!isValid" :loading="loading">Send Email</VBtn>
			</VCardActions>
		</VForm>
	</VCard>
</template>

<style scoped lang="scss"></style>
