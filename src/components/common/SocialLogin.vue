<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { useNotice, useUser } from '../../store';
import { SocialLoginProvider } from '../../types/common';
import { oauthLogin } from '../../utils/oauth-login';
import { mdiFacebook, mdiGoogle } from '@mdi/js';
import { computed } from 'vue';

const emit = defineEmits(['success']);
const userData = useUser();
const notice = useNotice();
const { smAndUp } = useDisplay();
const size = computed(() => (smAndUp.value ? 'large' : 'small'));
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
				:size="size"
				@click="socialLogin('google')"
			>
				Google
			</VBtn>
		</VCol>
		<VCol cols="auto">
			<VBtn
				:prepend-icon="mdiFacebook"
				variant="tonal"
				:size="size"
				@click="socialLogin('facebook')"
			>
				Facebook
			</VBtn>
		</VCol>
	</VRow>
</template>

<style scoped lang="scss"></style>
