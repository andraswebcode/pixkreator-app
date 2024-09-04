<script setup lang="ts">
import { mdiAlertCircle, mdiCheckCircle, mdiInformation } from '@mdi/js';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
	<AppBar />
	<VMain>
		<VContainer>
			<VEmptyState
				v-if="route.params.status === 'no'"
				:icon="mdiAlertCircle"
				headline="Uh-oh!"
				title="Verification Failed"
				text="Something went wrong. Please try verifying your email again."
				action-text="Resend Verification Email"
				@click:action=""
			/>
			<VEmptyState
				v-if="route.params.status === 'has'"
				:icon="mdiInformation"
				headline="Oops!"
				title="Email Already Verified"
				text="This email has already been verified. You're all set to explore all the features."
				action-text="Create Something"
				@click:action=""
			/>
			<VEmptyState
				v-else
				:icon="mdiCheckCircle"
				headline="You're All Set!"
				title="Email Verified Successfully!"
				text="Your email has been confirmed. You're now ready to explore all the features."
				action-text="Getting Started"
				@click:action=""
			/>
		</VContainer>
	</VMain>
</template>

<style scoped lang="scss">
.v-container,
.v-row {
	height: 100%;
}
</style>
