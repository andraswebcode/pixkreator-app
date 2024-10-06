<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	cols: string | number;
	count: number;
	responsive?: boolean;
}>();
const cols = computed(() => (props.responsive ? 12 : props.cols));
const md = computed(() => (props.responsive ? parseInt(props.cols as string) * 2 : props.cols));
</script>

<template>
	<VCol v-for="i in props.count" :key="i" :cols="cols" :md="md" :lg="props.cols">
		<VCard>
			<VResponsive aspect-ratio="1">
				<VSkeletonLoader height="100%" />
			</VResponsive>
		</VCard>
	</VCol>
</template>

<style scoped lang="scss"></style>
