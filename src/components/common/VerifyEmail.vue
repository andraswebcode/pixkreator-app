<script setup lang="ts">
import { ref } from 'vue';
import axios from '../../axios';
import { useNotice, useUser } from '../../store';

const userData = useUser();
const notice = useNotice();
const loading = ref(false);
const resend = () => {
	loading.value = true;
	axios
		.post('verifyemail/resend', {
			email: userData.user.email
		})
		.then((response: any) => {
			notice.send(response.data?.message, 'success');
			loading.value = false;
		})
		.catch((error) => {
			console.log(error);
			loading.value = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		});
};
</script>

<template>
	<VEmptyState
		icon="mdi-email-check"
		headline="Almost There!"
		title="Check Your Inbox"
		text="We’ve sent you a confirmation email. Please click the link to verify your account."
		action-text="Resend Verification Email"
		@click:action="resend"
	/>
</template>

<style scoped lang="scss"></style>
