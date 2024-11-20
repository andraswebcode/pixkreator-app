<script setup lang="ts">
import { IMAGES_FOLDER } from '../../utils/constants';

const props = defineProps<{
	id: AppID;
	title: string;
	description: string;
	class?: string;
	to?: any;
}>();
const emit = defineEmits(['click']);
</script>

<template>
	<VCard :class="props.class" :to="props.to" hover link @click.prevent="emit('click')">
		<div class="d-flex flex-no-wrap justify-space-between">
			<VAvatar class="ma-2" rounded="lg" size="100">
				<VImg aspect-ratio="1" :src="IMAGES_FOLDER + 'apps/' + props.id + '.webp'" />
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
