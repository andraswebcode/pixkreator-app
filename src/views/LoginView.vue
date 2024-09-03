<script setup lang="ts"></script>

<template>
	<VMain>
		<VContainer>
			<VRow justify="center" align="center">
				<VCol cols="4">
					<LoginCard>
						<template v-slot:title>Login</template>
						<template v-slot:subtitle>
							New to Image Designer Pro?
							<RouterLink to="/register">Create an account</RouterLink>
						</template>
						<small class="d-block mb-2">
							<RouterLink to="/pwreset">Forgot your password?</RouterLink>
						</small>
					</LoginCard>
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
