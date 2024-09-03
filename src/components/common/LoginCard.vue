<script setup lang="ts">
import { ref } from 'vue';
import axios from '../../axios';
import { useNotice, useUser } from '../../store';
import { useRouter } from 'vue-router';

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
			loading.value = false;
			router.push('/dashboard');
		})
		.catch((error) => {
			console.log(error);
			loading.value = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		});
};
</script>

<template>
	<VCard>
		<VCardItem v-if="$slots.title || $slots.subtitle">
			<VCardTitle v-if="$slots.title">
				<slot name="title" />
			</VCardTitle>
			<VCardSubtitle v-if="$slots.subtitle">
				<slot name="subtitle" />
			</VCardSubtitle>
		</VCardItem>
		<VDivider v-if="$slots.title || $slots.subtitle" />
		<VCardItem>
			<SocialLogin />
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
				<slot />
			</VCardItem>
			<VDivider />
			<VCardActions>
				<VBtn type="submit" :disabled="!isValid" :loading="loading">Login</VBtn>
			</VCardActions>
		</VForm>
	</VCard>
</template>

<style scoped lang="scss"></style>
