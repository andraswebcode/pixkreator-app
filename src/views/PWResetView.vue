<script setup lang="ts">
import { ref } from 'vue';
import axios from '../axios';
import { useNotice } from '../store';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const notice = useNotice();
const password = ref('');
const passwordConfirm = ref('');
const loading = ref(false);
const isValid = ref(false);
const pwRules = [
	(value) => (value && value.length > 7) || 'The password must be at least 8 characters.'
];
const pwcRules = [
	(value) => (value && value === password.value) || 'The password confirmation does not match.'
];
const resetPassword = () => {
	loading.value = true;
	axios
		.post('password/reset', {
			email: route.query.email,
			token: route.params.token,
			password: password.value,
			password_confirmation: passwordConfirm.value
		})
		.then((response: any) => {
			notice.send(response.data?.message, 'success');
			loading.value = false;
			router.push('login');
		})
		.catch((error) => {
			console.log(error);
			loading.value = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		});
};
</script>

<template>
	<VMain>
		<VContainer>
			<VRow justify="center" align="center">
				<VCol cols="4">
					<VCard>
						<VCardItem>
							<VCardTitle>Reset Password</VCardTitle>
							<VCardSubtitle>Enter your new password</VCardSubtitle>
						</VCardItem>
						<VDivider v-if="$slots.title || $slots.subtitle" class="mb-5" />
						<VForm v-model="isValid" @submit.prevent="resetPassword">
							<VCardItem>
								<VTextField
									label="New Password"
									type="password"
									autocomplete="new-password"
									:rules="pwRules"
									:hide-details="false"
									v-model="password"
								/>
								<VTextField
									label="Confirm Password"
									type="password"
									autocomplete="new-password"
									:rules="pwcRules"
									:hide-details="false"
									v-model="passwordConfirm"
								/>
								<small class="d-block mb-2">
									<RouterLink to="/login">&larr; Back to Login</RouterLink>
								</small>
							</VCardItem>
							<VCardActions>
								<VBtn type="submit" :disabled="!isValid" :loading="loading">
									Set Password
								</VBtn>
							</VCardActions>
						</VForm>
					</VCard>
				</VCol>
			</VRow>
		</VContainer>
	</VMain>
</template>

<style scoped lang="scss">
.v-container,
.v-row {
	height: 100%;
}
</style>
