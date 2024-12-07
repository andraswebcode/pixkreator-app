<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const success = () => {
	if (localStorage.getItem('design')) {
		router.push('/');
	} else {
		router.push('/dashboard');
	}
};
</script>

<template>
	<VMain>
		<VContainer>
			<VRow justify="center" align="center">
				<VCol cols="12" sm="10" md="8" lg="6">
					<LoginCard @success="success">
						<template v-slot:title>Login</template>
						<template v-slot:subtitle>
							New to PixKreator?
							<RouterLink to="/register">Create an account</RouterLink>
						</template>
						<small class="d-block my-2">
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
