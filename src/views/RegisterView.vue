<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const success = () => {
	router.push('/verify');
};
</script>

<template>
	<VMain>
		<VContainer>
			<VRow justify="center" align="center">
				<VCol cols="12" sm="10" md="8" lg="6">
					<RegisterCard @success="success">
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
