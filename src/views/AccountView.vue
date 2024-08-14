<script setup lang="ts">
import { mdiAccount, mdiInformation, mdiInvoice } from '@mdi/js';
</script>

<template>
	<AppBar />
	<VMain>
		<VContainer>
			<VTabs align-tabs="center" stacked>
				<VTab to="/account">
					<VIcon :icon="mdiAccount" />
					Profile
				</VTab>
				<VTab to="/account/notification">
					<VIcon :icon="mdiInformation" />
					Notification
				</VTab>
				<VTab to="/account/subscription">
					<VIcon :icon="mdiInvoice" />
					Subscription
				</VTab>
				<VTab to="/account/support">
					<VIcon :icon="mdiAccount" />
					Support
				</VTab>
			</VTabs>
			<VRow justify="center">
				<VCol cols="4">
					<VCard>
						<RouterView />
					</VCard>
				</VCol>
			</VRow>
		</VContainer>
	</VMain>
</template>

<style scoped lang="scss"></style>
