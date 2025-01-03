<script setup lang="ts">
import { ref } from 'vue';
import { useEditor } from '../../../store';
import { LOGIN_DIALOG_WIDTH } from '../../../utils/constants';

const editor = useEditor();
const form = ref<'login' | 'register' | 'pwreset' | 'verify'>('login');
const _openDialog = () => {
	if (editor.nonLoggedInUserWantsTo === 'download') {
		editor.openDownloadDialog = true;
	} else if (editor.nonLoggedInUserWantsTo === 'share') {
		editor.openShareDialog = true;
	}
	editor.nonLoggedInUserWantsTo = false;
	editor.openLoginDialog = false;
};
const loginSuccess = () => {
	if (editor.nonLoggedInUserWantsTo) {
		_openDialog();
	} else {
		editor.openLoginDialog = false;
	}
};
const registerSuccess = () => {
	if (editor.nonLoggedInUserWantsTo) {
		_openDialog();
	} else {
		form.value = 'verify';
	}
};
</script>

<template>
	<PersistentHeaderDialog
		title="Sign in to Continue"
		:max-width="LOGIN_DIALOG_WIDTH"
		scroll
		auto-height
		v-model="editor.openLoginDialog"
		@close="editor.openLoginDialog = false"
	>
		<LoginCard v-if="form === 'login'" @success="loginSuccess">
			<template v-slot:subtitle>
				New to PixKreator?
				<a href="#" @click.prevent="form = 'register'">Create an account</a>
			</template>
			<small class="d-block mb-2">
				<a href="#" @click.prevent="form = 'pwreset'">Forgot your password?</a>
			</small>
		</LoginCard>
		<RegisterCard v-else-if="form === 'register'" @success="registerSuccess">
			<template v-slot:subtitle>
				Already have an account?
				<a href="#" @click.prevent="form = 'login'">Login</a>
			</template>
		</RegisterCard>
		<ForgotPWCard v-else-if="form === 'pwreset'">
			<template v-slot:subtitle>
				Enter your email, and we'll send a link to reset your password.
			</template>
			<small class="d-block mb-2">
				<a href="#" @click.prevent="form = 'login'">&larr; Back to Login</a>
			</small>
		</ForgotPWCard>
		<VCard v-else-if="form === 'verify'">
			<VCardItem>
				<VerifyEmail />
			</VCardItem>
		</VCard>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
