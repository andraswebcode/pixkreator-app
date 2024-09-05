<script setup lang="ts"></script>

<template>
	<VMain>
		<VContainer>
			<VRow justify="center" align="center">
				<VCol cols="4">
					<ForgotPWCard>
						<template v-slot:title>Forgot Your Password?</template>
						<template v-slot:subtitle>
							Enter your email, and we'll send a link to reset your password.
						</template>
						<small class="d-block mb-2">
							<RouterLink to="/login">&larr; Back to Login</RouterLink>
						</small>
					</ForgotPWCard>
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
