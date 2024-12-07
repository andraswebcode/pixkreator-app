<script setup lang="ts">
import { useNotice, useUser } from '../../store';
import { SocialLoginProvider } from '../../types/common';
import { oauthLogin } from '../../utils/oauth-login';

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
	<VRow no-gutters align="center">
		<VCol>
			<VDivider />
		</VCol>
		<VCol class="px-2" cols="auto">
			<p class="text-body-2">or continue with</p>
		</VCol>
		<VCol>
			<VDivider />
		</VCol>
	</VRow>
	<VRow justify="center">
		<VCol cols="auto">
			<VBtn prepend-icon="mdi-google" @click="socialLogin('google')">Google</VBtn>
		</VCol>
	</VRow>
</template>

<style scoped lang="scss"></style>
