<script setup lang="ts">
import { VImg } from 'vuetify/components';

const props = defineProps<{
	class?: string;
	src?: string;
	aspectRatio?: string;
}>();
</script>

<template>
	<VImg v-bind="props">
		<template v-slot:placeholder>
			<div class="d-flex align-center justify-center fill-height">
				<VProgressCircular color="grey-lighten-4" indeterminate />
			</div>
		</template>
	</VImg>
</template>

<style scoped lang="scss"></style>
