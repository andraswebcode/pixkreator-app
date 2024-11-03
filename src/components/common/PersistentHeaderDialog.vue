<script setup lang="ts">
const props = defineProps<{
	title?: string;
	maxWidth?: string | number;
	autoHeight?: boolean;
	scroll?: boolean;
}>();
const emit = defineEmits(['close']);
const model = defineModel<boolean | undefined>();
</script>

<template>
	<VDialog
		:class="{ autoheight: props.autoHeight }"
		v-model="model"
		:max-width="props.maxWidth"
		persistent
	>
		<VCard>
			<VCardTitle class="d-flex justify-space-between align-center">
				<span class="text-h5 text-medium-emphasis ps-2">{{ props.title }}</span>
				<CloseBtn @click="emit('close')" />
			</VCardTitle>
			<VCardSubtitle :class="{ scroll: props.scroll }">
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
.autoheight:deep(.v-overlay__content) {
	height: auto !important;
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
	opacity: 1;
}
.scroll {
	overflow: hidden auto;
}
</style>
