<script setup lang="ts">
import { ref } from 'vue';

const password = ref('');
const loading = ref(false);
const isValid = ref(false);
const pwRules = [
	(value) => (value && value.length > 7) || 'The password must be at least 8 characters.'
];
const resetPassword = () => {
	loading.value = true;
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
