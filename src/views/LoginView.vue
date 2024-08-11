<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const loading = ref(false);
const emailRules = [(value: string) => !!value || 'Email is required.'];
const passwordRules = [(value: string) => !!value || 'Password is required.'];
const login = () => {
	loading.value = true;
};
</script>

<template>
	<FormContainer label="Login" :loading="loading" @submit="login">
		<template v-slot:title>Login</template>
		<template v-slot:subtitle>
			New to Image Designer Pro?
			<RouterLink to="/register">Create an account</RouterLink>
		</template>
		<VTextField label="Email" type="email" :rules="emailRules" v-model="email" />
		<VTextField label="Password" type="password" :rules="passwordRules" v-model="password" />
		<small class="d-block mb-2">
			<RouterLink to="/pwreset">Forgot your password?</RouterLink>
		</small>
	</FormContainer>
</template>

<style scoped lang="scss"></style>
