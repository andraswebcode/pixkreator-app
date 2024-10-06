<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const success = () => {
	router.push('/dashboard');
};
</script>

<template>
	<VMain>
		<VContainer>
			<VRow justify="center" align="center">
				<VCol cols="12" sm="8" md="6" lg="4">
					<LoginCard @success="success">
						<template v-slot:title>Login</template>
						<template v-slot:subtitle>
							New to Image Designer Pro?
							<RouterLink to="/register">Create an account</RouterLink>
						</template>
						<small class="d-block mb-2">
							<RouterLink to="/forgotpw">Forgot your password?</RouterLink>
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
