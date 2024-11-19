<script setup lang="ts"></script>

<template>
	<AppBar />
	<VMain>
		<VContainer>
			<VTabs class="mb-5" align-tabs="center" stacked>
				<VTab to="/account">
					<VIcon icon="mdi-account" />
					Profile
				</VTab>
				<VTab to="/account/settings">
					<VIcon icon="mdi-cogs" />
					Settings
				</VTab>
				<VTab to="/account/subscription">
					<VIcon icon="mdi-invoice" />
					Subscription
				</VTab>
				<VTab to="/account/support">
					<VIcon icon="mdi-lifebuoy" />
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
