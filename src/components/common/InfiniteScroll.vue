<script setup lang="ts">
import { debounce } from '../../utils/functions';

const emit = defineEmits(['load']);
const loadMore = debounce((e) => {
	const { scrollTop, clientHeight, scrollHeight } = e.target;
	if (scrollTop + clientHeight >= scrollHeight * 0.9) {
		emit('load');
	}
}, 200);
</script>

<template>
	<div class="infinite-scroll" @scroll="loadMore">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.infinite-scroll {
	overflow-x: hidden;
	overflow-y: scroll;
}
</style>
