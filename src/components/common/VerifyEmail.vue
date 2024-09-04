<script setup lang="ts">
import { mdiEmailCheck } from '@mdi/js';
</script>

<template>
	<VEmptyState
		:icon="mdiEmailCheck"
		headline="Almost There!"
		title="Check Your Inbox"
		text="We’ve sent you a confirmation email. Please click the link to verify your account."
		action-text="Resend Verification Email"
		@click:action=""
	/>
</template>

<style scoped lang="scss"></style>
