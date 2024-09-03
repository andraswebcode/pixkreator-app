<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const loading = ref(false);
const isValid = ref(false);
const emailRules = [
	(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please provide a valid email address.'
];
const sendEmail = () => {
	loading.value = true;
};
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
		<VDivider v-if="$slots.title || $slots.subtitle" class="mb-5" />
		<VForm v-model="isValid" @submit.prevent="sendEmail">
			<VCardItem>
				<VTextField
					label="Email"
					type="email"
					:rules="emailRules"
					:hide-details="false"
					v-model="email"
				/>
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
