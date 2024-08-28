<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
	loading: boolean;
	label: string;
}>();
defineEmits(['submit']);

const isValid = ref(false);
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
						<VForm v-model="isValid" @submit.prevent="$emit('submit')">
							<VCardText>
								<slot />
							</VCardText>
							<VDivider />
							<VCardActions>
								<VBtn type="submit" :disabled="!isValid" :loading="props.loading">
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
