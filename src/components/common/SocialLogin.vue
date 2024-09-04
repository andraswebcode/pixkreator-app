<script setup lang="ts">
import { useNotice, useUser } from '../../store';
import { SocialLoginProvider } from '../../types/common';
import { oauthLogin } from '../../utils/oauth-login';
import { mdiFacebook, mdiGoogle } from '@mdi/js';

const emit = defineEmits(['success']);
const userData = useUser();
const notice = useNotice();
const socialLogin = (provider: SocialLoginProvider) => {
	oauthLogin(provider)
		.then(({ user }) => {
			userData.user = user;
			localStorage.setItem('userData', JSON.stringify(userData.user));
			emit('success');
		})
		.catch((error) => {
			notice.send(error.response?.data?.message || error.message, 'error');
		});
};
</script>

<template>
	<VRow justify="center">
		<VCol cols="auto">
			<VBtn
				:prepend-icon="mdiGoogle"
				variant="tonal"
				size="large"
				@click="socialLogin('google')"
			>
				Google
			</VBtn>
		</VCol>
		<VCol cols="auto">
			<VBtn
				:prepend-icon="mdiFacebook"
				variant="tonal"
				size="large"
				@click="socialLogin('facebook')"
			>
				Facebook
			</VBtn>
		</VCol>
	</VRow>
</template>

<style scoped lang="scss"></style>
