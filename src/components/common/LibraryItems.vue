<script setup lang="ts">
const props = defineProps<{
	itemsLength: number;
	cols: number;
	count: number;
}>();
const emit = defineEmits(['load']);
</script>

<template>
	<InfiniteScroll v-if="props.itemsLength" @load="emit('load')">
		<VContainer>
			<VRow>
				<slot />
			</VRow>
		</VContainer>
		<VProgressLinear indeterminate :height="12" />
	</InfiniteScroll>
	<VContainer v-else>
		<VRow>
			<GridLoader :cols="props.cols" :count="props.count" />
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
