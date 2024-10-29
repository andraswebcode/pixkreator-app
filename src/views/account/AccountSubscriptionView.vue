<script setup lang="ts">
import { mdiStar } from '@mdi/js';
</script>

<template>
	<VCard>
		<VCardItem>
			<VRow justify="space-between" align="center">
				<VCol>
					<span class="text-no-wrap">Your Current Plan:</span>
				</VCol>
				<VCol>
					<VChip>Free</VChip>
				</VCol>
				<VCol>
					<VBtn :prepend-icon="mdiStar" variant="tonal">Upgrade</VBtn>
				</VCol>
			</VRow>
		</VCardItem>
	</VCard>
</template>

<style scoped lang="scss"></style>
