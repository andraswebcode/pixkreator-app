<script setup lang="ts">
const props = defineProps<{
	title: string;
	description: string;
	img: string;
	class: string;
}>();
const emit = defineEmits(['click']);
</script>

<template>
	<VCard :class="props.class" hover link @click.prevent="emit('click')">
		<div class="d-flex flex-no-wrap justify-space-between">
			<VAvatar class="ma-2" rounded="lg" size="100">
				<VImg aspect-ratio="1" :src="props.img" />
			</VAvatar>
			<div>
				<VCardTitle class="text-body-1">
					{{ props.title }}
				</VCardTitle>
				<VCardSubtitle>
					{{ props.description }}
				</VCardSubtitle>
			</div>
		</div>
	</VCard>
</template>

<style scoped lang="scss"></style>
