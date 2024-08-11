<script setup>
import FormContainer from '../components/common/FormContainer.vue';
</script>

<template>
	<FormContainer label="Send Email" :loading="false">
		<template v-slot:title>Forgot Your Password?</template>
		<template v-slot:subtitle>
			Enter your email, and we'll send a link to reset your password.
		</template>
		<VTextField label="Email" type="email" required />
		<small class="d-block mb-2">
			<RouterLink to="/login">&larr; Back to Login</RouterLink>
		</small>
	</FormContainer>
</template>

<style scoped></style>
