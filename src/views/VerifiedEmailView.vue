<script setup lang="ts">
import { mdiAlertCircle, mdiCheckCircle, mdiInformation } from '@mdi/js';
import { useRoute, useRouter } from 'vue-router';
import { useNotice, useUser } from '../store';
import { onMounted, ref } from 'vue';
import axios from '../axios';

const route = useRoute();
const router = useRouter();
const userData = useUser();
const notice = useNotice();
const loading = ref(false);
const getStarted = () => {
	router.push('/');
};
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

onMounted(() => {
	const currentDate = new Date().toISOString().split('T')[0];
	if (route.query.at === currentDate) {
		userData.setAndSave('email_verified', true);
	}
});
</script>

<template>
	<AppBar />
	<VMain>
		<VContainer>
			<VEmptyState
				v-if="route.params.status === 'no'"
				:icon="mdiAlertCircle"
				headline="Uh-oh!"
				title="Verification Failed"
				text="Something went wrong. Please try verifying your email again."
				action-text="Resend Verification Email"
				@click:action="resend"
			/>
			<VEmptyState
				v-if="route.params.status === 'has'"
				:icon="mdiInformation"
				headline="Oops!"
				title="Email Already Verified"
				text="This email has already been verified. You're all set to explore all the features."
				action-text="Create Something"
				@click:action="getStarted"
			/>
			<VEmptyState
				v-else
				:icon="mdiCheckCircle"
				headline="You're All Set!"
				title="Email Verified Successfully!"
				text="Your email has been confirmed. You're now ready to explore all the features."
				action-text="Get Started"
				@click:action="getStarted"
			/>
		</VContainer>
	</VMain>
</template>

<style scoped lang="scss">
.v-container,
.v-row {
	height: 100%;
}
</style>
