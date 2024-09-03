<script setup lang="ts"></script>

<template>
	<VMain>
		<VContainer>
			<VRow justify="center" align="center">
				<VCol cols="4">
					<RegisterCard>
						<template v-slot:title>Create an Account</template>
						<template v-slot:subtitle>
							Already have an account?
							<RouterLink to="/login">Login</RouterLink>
						</template>
					</RegisterCard>
				</VCol>
			</VRow>
		</VContainer>
	</VMain>
</template>

<style scoped>
.v-container,
.v-row {
	height: 100%;
}
</style>
