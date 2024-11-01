<script setup lang="ts">
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { computed, useSlots } from 'vue';

const model = defineModel<number>({
	default: 0
});
const slots = useSlots();
const currentItem = computed(() => {
	const { children } = slots.default?.()[0] || {};

	if (!children) {
		return null;
	}

	return children[model.value];
});
const showPrev = computed(() => model.value !== 0);
const showNext = computed(() => {
	const { children } = slots.default?.()[0] || {};

	if (!children) {
		return false;
	}

	const len = children.length as number;
	return model.value !== len - 1;
});
const navigate = (dir: 'next' | 'prev') => {
	const { children } = slots.default?.()[0] || {};

	if (!children) {
		return null;
	}

	const len = children.length as number;

	if (dir === 'next') {
		model.value = Math.min(model.value + 1, len - 1);
	} else {
		model.value = Math.max(model.value - 1, 0);
	}
};
</script>

<template>
	<div class="details-carousel">
		<div v-if="currentItem" class="item">
			<component :is="currentItem" />
		</div>
		<div class="buttons">
			<VBtn
				v-if="showPrev"
				class="prev"
				:icon="mdiChevronLeft"
				variant="tonal"
				size="x-small"
				@click="navigate('prev')"
			/>
			<VBtn
				v-if="showNext"
				class="next"
				:icon="mdiChevronRight"
				variant="tonal"
				size="x-small"
				@click="navigate('next')"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
.details-carousel {
	position: relative;
	height: 100%;
}
.item {
	height: 100%;
	overflow: hidden auto;
}
.buttons {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}
.prev,
.next {
	position: absolute;
	top: 50%;
	pointer-events: auto;
}
.prev {
	left: 0;
}
.next {
	right: 0;
}
</style>
