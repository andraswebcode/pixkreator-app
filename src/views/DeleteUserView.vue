<script setup lang="ts">
import { useNotice, useUser } from '../store';
import { ref } from 'vue';
import axios from '../axios';
import { useRouter } from 'vue-router';

const userData = useUser();
const router = useRouter();
const notice = useNotice();
const otp = ref();
const showVerify = ref(false);
const sendEmail = () => {
	axios
		.post(
			'deleteuser/email',
			{},
			{
				headers: {
					Authorization: userData.bearerToken
				}
			}
		)
		.then(() => {
			showVerify.value = true;
		})
		.catch((error) => {
			notice.send(error.response?.data.message || error.message, 'error');
		});
};
const deleteUser = () => {
	axios
		.delete('users/' + userData.user.id, {
			headers: {
				Authorization: userData.bearerToken,
				'X-User-Delete-Code': otp.value
			}
		})
		.then(() => {
			userData.user = {};
			localStorage.removeItem('userData');
			router.push('/');
		})
		.catch((error) => {
			notice.send(error.response?.data.message || error.message, 'error');
		});
};
</script>

<template>
	<AppBar />
	<VMain>
		<VContainer>
			<VEmptyState
				v-if="showVerify"
				icon="mdi-account-alert"
				headline="This action cannot be undone"
				title="Verify Your Identity"
				action-text="Delete Account Permanently"
				@click:action="deleteUser"
			>
				<p class="text-center">
					We sent a verification code to <strong>{{ userData.user.email }}</strong>
				</p>
				<p class="text-center">Please check your email and paste the code below.</p>
				<VOtpInput v-model="otp" />
			</VEmptyState>
			<VEmptyState
				v-else
				:icon="mdiAccountAlert"
				headline="This action cannot be undone"
				title="Are you sure you want to delete your account?"
				action-text="Delete Account"
				@click:action="sendEmail"
			>
				<p class="text-center">Deleting your account is permanent and cannot be undone.</p>
				<p class="text-center">
					All your data, settings, and personal information will be removed from our
					system,
				</p>
				<p class="text-center">and you will no longer have access to your account.</p>
			</VEmptyState>
		</VContainer>
	</VMain>
</template>

<style scoped lang="scss">
.v-container,
.v-row {
	height: 100%;
}
</style>
