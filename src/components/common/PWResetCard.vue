<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false);
const isValid = ref(false);
</script>

<template>
	<VCard>
		<VCardItem>
			<VCardTitle>Forgot Your Password?</VCardTitle>
			<VCardSubtitle>
				Enter your email, and we'll send a link to reset your password.
			</VCardSubtitle>
		</VCardItem>
		<VDivider />
		<VForm v-model="isValid">
			<VCardItem>
				<VTextField label="Email" type="email" required />
				<small class="d-block mb-2">
					<RouterLink to="/login">&larr; Back to Login</RouterLink>
				</small>
			</VCardItem>
			<VDivider />
			<VCardActions>
				<VBtn type="submit" :disabled="!isValid" :loading="loading">Send Email</VBtn>
			</VCardActions>
		</VForm>
	</VCard>
</template>

<style scoped lang="scss"></style>
