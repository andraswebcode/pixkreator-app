<script setup>
import { ref } from 'vue';
import FormContainer from '../components/common/FormContainer.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const loading = ref(false);
const register = () => {
	loading.value = true;
};
</script>

<template>
	<FormContainer label="Regsiter" :loading="loading" @submit="register">
		<template v-slot:title>Create an Account</template>
		<template v-slot:subtitle>
			Already have an account?
			<RouterLink to="/login">Login</RouterLink>
		</template>
		<VTextField label="Name" required v-model="name" />
		<VTextField label="Email" type="email" required v-model="email" />
		<VTextField label="Password" type="password" required v-model="password" />
		<VTextField label="Confirm Password" type="password" required v-model="passwordConfirm" />
	</FormContainer>
</template>

<style scoped></style>
