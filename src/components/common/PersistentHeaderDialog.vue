<script setup lang="ts">
const props = defineProps<{
	title?: string;
	maxWidth?: string | number;
}>();
const emit = defineEmits(['close']);
const model = defineModel<boolean | undefined>();
</script>

<template>
	<VDialog v-model="model" @after-leave="emit('close')" :max-width="props.maxWidth">
		<VCard>
			<VCardTitle class="d-flex justify-space-between align-center">
				<span class="text-h5 text-medium-emphasis ps-2">{{ props.title }}</span>
				<CloseBtn @click="emit('close')" />
			</VCardTitle>
			<VCardSubtitle>
				<slot />
			</VCardSubtitle>
			<VCardActions v-if="$slots.actions">
				<slot name="actions" />
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<style scoped lang="scss">
.v-card {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.v-card-title {
	flex-shrink: 0;
}

.v-card-subtitle {
	flex: 1;
	overflow: auto;
}
</style>
