<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useNotice, useUser } from '../../store';
import { SocialLoginProvider } from '../../types/common';
import { oauthLogin } from '../../utils/oauth-login';
import { mdiFacebook, mdiGoogle } from '@mdi/js';

const userData = useUser();
const router = useRouter();
const notice = useNotice();
const socialLogin = (provider: SocialLoginProvider) => {
	oauthLogin(provider)
		.then(({ user }) => {
			userData.user = user;
			localStorage.setItem('userData', JSON.stringify(userData.user));
			router.push('/dashboard');
		})
		.catch((error) => {
			notice.send(error.response?.data?.message || error.message, 'error');
		});
};
</script>

<template>
	<VRow justify="center">
		<VCol cols="auto">
			<VBtn :prepend-icon="mdiGoogle" @click="socialLogin('google')">Google</VBtn>
		</VCol>
		<VCol cols="auto">
			<VBtn :prepend-icon="mdiFacebook" @click="socialLogin('facebook')">Facebook</VBtn>
		</VCol>
	</VRow>
</template>

<style scoped lang="scss"></style>
