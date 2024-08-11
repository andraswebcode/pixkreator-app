<script setup lang="ts">
const props = defineProps<{
	loading: boolean;
	label: string;
}>();
defineEmits(['submit']);
</script>

<template>
	<VMain>
		<VContainer>
			<VRow justify="center" align="center">
				<VCol cols="4">
					<VCard>
						<VCardItem>
							<VCardTitle>
								<slot name="title" />
							</VCardTitle>
							<VCardSubtitle>
								<slot name="subtitle" />
							</VCardSubtitle>
						</VCardItem>
						<VDivider />
						<VForm @submit.prevent="$emit('submit')">
							<VCardText>
								<slot />
							</VCardText>
							<VDivider />
							<VCardActions>
								<VBtn type="submit" :loading="props.loading">
									{{ props.label }}
								</VBtn>
							</VCardActions>
						</VForm>
					</VCard>
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
