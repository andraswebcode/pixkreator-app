<script setup lang="ts">
import { mdiAccount, mdiCogs, mdiInvoice, mdiLifebuoy } from '@mdi/js';
</script>

<template>
	<AppBar />
	<VMain>
		<VContainer>
			<VTabs class="mb-5" align-tabs="center" stacked>
				<VTab to="/account">
					<VIcon :icon="mdiAccount" />
					Profile
				</VTab>
				<VTab to="/account/settings">
					<VIcon :icon="mdiCogs" />
					Settings
				</VTab>
				<VTab to="/account/subscription">
					<VIcon :icon="mdiInvoice" />
					Subscription
				</VTab>
				<VTab to="/account/support">
					<VIcon :icon="mdiLifebuoy" />
					Support
				</VTab>
			</VTabs>
			<VRow justify="center">
				<VCol cols="12" sm="10" md="8" lg="6">
					<VCard>
						<RouterView />
					</VCard>
				</VCol>
			</VRow>
		</VContainer>
	</VMain>
</template>

<style scoped lang="scss"></style>
