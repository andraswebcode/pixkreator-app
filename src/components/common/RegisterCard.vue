<script setup lang="ts">
import { ref } from 'vue';
import axios from '../../axios';
import { useNotice, useUser } from '../../store';
import { useRouter } from 'vue-router';

const userData = useUser();
const router = useRouter();
const notice = useNotice();
const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const loading = ref(false);
const isValid = ref(false);
const nameRules = [(value) => (value && value.length) || 'Please provide your name.'];
const emailRules = [
	(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please provide a valid email address.'
];
const pwRules = [
	(value) => (value && value.length > 7) || 'The password must be at least 8 characters.'
];
const pwcRules = [
	(value) => (value && value === password.value) || 'The password confirmation does not match.'
];
const register = () => {
	loading.value = true;
	axios
		.post('register', {
			name: name.value,
			email: email.value,
			password: password.value,
			password_confirmation: passwordConfirm.value
		})
		.then(({ data }) => {
			userData.user = data.user;
			localStorage.setItem('userData', JSON.stringify(userData.user));
			router.push('/dashboard');
		})
		.catch((error) => {
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
		<VDivider v-if="$slots.title || $slots.subtitle" class="mb-5" />
		<VCardItem>
			<SocialLogin />
		</VCardItem>
		<VDivider class="my-5" />
		<VForm v-model="isValid" @submit.prevent="register">
			<VCardItem>
				<VTextField
					label="Name"
					required
					v-model="name"
					:rules="nameRules"
					:hide-details="false"
					autocomplete="off"
				/>
				<VTextField
					label="Email"
					type="email"
					required
					v-model="email"
					:rules="emailRules"
					:hide-details="false"
					autocomplete="off"
				/>
				<VTextField
					label="Password"
					type="password"
					required
					v-model="password"
					:rules="pwRules"
					:hide-details="false"
					autocomplete="new-password"
				/>
				<VTextField
					label="Confirm Password"
					type="password"
					required
					v-model="passwordConfirm"
					:rules="pwcRules"
					:hide-details="false"
					autocomplete="new-password"
				/>
			</VCardItem>
			<VDivider />
			<VCardActions>
				<VBtn type="submit" :disabled="!isValid" :loading="loading">Register</VBtn>
			</VCardActions>
		</VForm>
	</VCard>
</template>

<style scoped lang="scss"></style>
