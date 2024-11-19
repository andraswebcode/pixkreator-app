<script setup lang="ts">
import { useNotice, useUser } from '../../store';
import { ref } from 'vue';
import axios from '../../axios';
const props = defineProps<{
	class: string;
}>();
const userData = useUser();
const notice = useNotice();
const loading = ref(false);
const sendEmail = () => {
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
	<VAlert v-if="loading" :class="props.class" type="info" icon="mdi-email-sync">
		Email is being sent...
	</VAlert>
	<VAlert v-else :class="props.class" type="warning" icon="mdi-alert-circle">
		Your email is not verified. Please
		<a href="#" @click.prevent="sendEmail">verify your email</a> to access all the features.
	</VAlert>
</template>

<style scoped></style>
