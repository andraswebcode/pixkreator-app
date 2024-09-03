<script setup lang="ts">
import { ref } from 'vue';
import axios from '../../axios';
import { useNotice, useUser } from '../../store';
import { useRouter } from 'vue-router';
import { mdiFacebook, mdiGoogle } from '@mdi/js';
import { oauthLogin } from '../../utils/oauth-login';
import { SocialLoginProvider } from '../../types/common';

const userData = useUser();
const router = useRouter();
const notice = useNotice();
const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const loading = ref(false);
const isValid = ref(false);
const nameRules = [(value) => (value && value.length) || 'Please provide your name.'];
const emailRules = [
	(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please provide a valid email address.'
];
const pwRules = [
	(value) => (value && value.length > 7) || 'The password must be at least 8 characters.'
];
const pwcRules = [
	(value) => (value && value === password.value) || 'The password confirmation does not match.'
];
const register = () => {
	loading.value = true;
	axios
		.post('register', {
			name: name.value,
			email: email.value,
			password: password.value,
			password_confirmation: passwordConfirm.value
		})
		.then(({ data }) => {
			userData.user = data.user;
			localStorage.setItem('userData', JSON.stringify(userData.user));
			router.push('/dashboard');
		})
		.catch((error) => {
			loading.value = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		});
};
const socialRegister = (provider: SocialLoginProvider) => {
	oauthLogin(provider).then(console.log).catch(console.warn);
};
</script>

<template>
	<VCard>
		<VCardItem>
			<VCardTitle>Create an Account</VCardTitle>
			<VCardSubtitle>
				Already have an account?
				<RouterLink to="/login">Login</RouterLink>
			</VCardSubtitle>
		</VCardItem>
		<VDivider />
		<VCardItem>
			<VRow justify="center">
				<VCol cols="auto">
					<VBtn :prepend-icon="mdiGoogle" @click="socialRegister('google')">
						Google
					</VBtn>
				</VCol>
				<VCol cols="auto">
					<VBtn :prepend-icon="mdiFacebook" @click="socialRegister('facebook')">
						Facebook
					</VBtn>
				</VCol>
			</VRow>
		</VCardItem>
		<VDivider />
		<VForm v-model="isValid" @submit.prevent="register">
			<VCardItem>
				<VTextField
					label="Name"
					required
					v-model="name"
					:rules="nameRules"
					:hide-details="false"
					autocomplete="off"
				/>
				<VTextField
					label="Email"
					type="email"
					required
					v-model="email"
					:rules="emailRules"
					:hide-details="false"
					autocomplete="off"
				/>
				<VTextField
					label="Password"
					type="password"
					required
					v-model="password"
					:rules="pwRules"
					:hide-details="false"
					autocomplete="new-password"
				/>
				<VTextField
					label="Confirm Password"
					type="password"
					required
					v-model="passwordConfirm"
					:rules="pwcRules"
					:hide-details="false"
					autocomplete="new-password"
				/>
			</VCardItem>
			<VCardActions>
				<VBtn type="submit" :disabled="!isValid" :loading="loading">Register</VBtn>
			</VCardActions>
		</VForm>
	</VCard>
</template>

<style scoped lang="scss"></style>
