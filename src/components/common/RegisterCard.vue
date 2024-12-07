<script setup lang="ts">
import { ref } from 'vue';
import axios from '../../axios';
import { useNotice, useUser } from '../../store';

const emit = defineEmits(['success']);
const userData = useUser();
const notice = useNotice();
const name = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);
const isValid = ref(false);
const nameRules = [(value) => (value && value.length) || 'Please provide your name.'];
const emailRules = [
	(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please provide a valid email address.'
];
const pwRules = [
	(value) => (value && value.length > 7) || 'The password must be at least 8 characters.'
];
const register = () => {
	loading.value = true;
	axios
		.post('register', {
			name: name.value,
			email: email.value,
			password: password.value
		})
		.then(({ data }) => {
			loading.value = false;
			userData.user = data.user;
			localStorage.setItem('userData', JSON.stringify(userData.user));
			emit('success');
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
			<VForm v-model="isValid" @submit.prevent="register">
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
				<VBtn type="submit" block size="large" :disabled="!isValid" :loading="loading">
					Register
				</VBtn>
			</VForm>
		</VCardItem>
		<VCardItem>
			<SocialLogin @success="emit('success')" />
		</VCardItem>
	</VCard>
</template>

<style scoped lang="scss"></style>
