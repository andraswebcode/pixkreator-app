<script setup lang="ts">
const props = defineProps<{
	itemsLength: number;
	cols: number;
	count: number;
	loading?: boolean;
	noItemsWarning?: string;
	responsive?: boolean;
}>();
const emit = defineEmits(['load']);
const onLoad = () => {
	if (props.itemsLength >= props.count) {
		emit('load');
	}
};
</script>

<template>
	<VContainer v-if="props.loading">
		<VRow>
			<GridLoader :cols="props.cols" :count="props.count" :responsive="props.responsive" />
		</VRow>
	</VContainer>
	<InfiniteScroll v-else @load="onLoad">
		<VContainer>
			<VRow>
				<slot v-if="props.itemsLength" />
				<VAlert v-else class="mx-3 mt-3" type="warning" icon="mdi-alert-circle">
					{{ props.noItemsWarning || 'No items found' }}
				</VAlert>
			</VRow>
		</VContainer>
		<VProgressLinear v-if="props.itemsLength >= props.count" indeterminate :height="12" />
	</InfiniteScroll>
</template>

<style scoped lang="scss"></style>
