<script setup lang="ts">
import { ref } from 'vue';
import axios from '../axios';
import { useNotice, useUser } from '../store';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loading = ref(false);
const userData = useUser();
const router = useRouter();
const notice = useNotice();
const emailRules = [(value: string) => !!value || 'Email is required.'];
const passwordRules = [(value: string) => !!value || 'Password is required.'];
const login = () => {
	loading.value = true;
	axios
		.post('login', {
			email: email.value,
			password: password.value
		})
		.then(({ data }) => {
			userData.user = data.user;
			localStorage.setItem('userData', JSON.stringify(userData.user));
			router.push('/dashboard');
		})
		.catch((error) => {
			console.log(error);
			loading.value = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		});
};
</script>

<template>
	<FormContainer label="Login" :loading="loading" @submit="login">
		<template v-slot:title>Login</template>
		<template v-slot:subtitle>
			New to Image Designer Pro?
			<RouterLink to="/register">Create an account</RouterLink>
		</template>
		<VTextField
			label="Email"
			type="email"
			:rules="emailRules"
			:hide-details="false"
			v-model="email"
		/>
		<VTextField
			label="Password"
			type="password"
			:rules="passwordRules"
			:hide-details="false"
			v-model="password"
		/>
		<small class="d-block mb-2">
			<RouterLink to="/pwreset">Forgot your password?</RouterLink>
		</small>
	</FormContainer>
</template>

<style scoped lang="scss"></style>
