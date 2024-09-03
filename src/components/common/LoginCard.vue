<script setup lang="ts">
import { ref } from 'vue';
import axios from '../../axios';
import { useNotice, useUser } from '../../store';
import { useRouter } from 'vue-router';
import { oauthLogin } from '../../utils/oauth-login';
import { mdiFacebook, mdiGoogle } from '@mdi/js';
import { SocialLoginProvider } from '../../types/common';

const userData = useUser();
const router = useRouter();
const notice = useNotice();
const email = ref('');
const password = ref('');
const loading = ref(false);
const isValid = ref(false);
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
const socialLogin = (provider: SocialLoginProvider) => {
	oauthLogin(provider)
		.then(({ user }) => {
			userData.user = user;
			localStorage.setItem('userData', JSON.stringify(userData.user));
			router.push('/dashboard');
		})
		.catch((error) => {
			loading.value = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		});
};
</script>

<template>
	<VCard>
		<VCardItem>
			<VCardTitle>Login</VCardTitle>
			<VCardSubtitle>
				New to Image Designer Pro?
				<RouterLink to="/register">Create an account</RouterLink>
			</VCardSubtitle>
		</VCardItem>
		<VDivider />
		<VCardItem>
			<VRow justify="center">
				<VCol cols="auto">
					<VBtn :prepend-icon="mdiGoogle" @click="socialLogin('google')">Google</VBtn>
				</VCol>
				<VCol cols="auto">
					<VBtn :prepend-icon="mdiFacebook" @click="socialLogin('facebook')"
						>Facebook</VBtn
					>
				</VCol>
			</VRow>
		</VCardItem>
		<VDivider />
		<VForm v-model="isValid" @submit.prevent="login">
			<VCardItem>
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
			</VCardItem>
			<VDivider />
			<VCardActions>
				<VBtn type="submit" :disabled="!isValid" :loading="loading">Login</VBtn>
			</VCardActions>
		</VForm>
	</VCard>
</template>

<style scoped lang="scss"></style>
