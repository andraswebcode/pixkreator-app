<script setup lang="ts">
const props = defineProps<{
	title?: string;
	maxWidth?: string | number;
	scroll?: boolean;
}>();
const emit = defineEmits(['close']);
const model = defineModel<boolean | undefined>();
</script>

<template>
	<VDialog v-model="model" :max-width="props.maxWidth" persistent>
		<VCard>
			<VCardTitle class="d-flex justify-space-between align-center">
				<span class="text-h5 text-medium-emphasis ps-2">{{ props.title }}</span>
				<CloseBtn @click="emit('close')" />
			</VCardTitle>
			<VCardSubtitle :class="{ scroll }">
				<slot />
			</VCardSubtitle>
			<VCardActions v-if="$slots.actions">
				<slot name="actions" />
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<style scoped lang="scss">
:deep(.v-overlay__content) {
	height: calc(100% - 48px);
}
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
	height: 100%;
	overflow: hidden;
	opacity: 1;
}
.scroll {
	overflow: hidden scroll;
}
</style>
