<script setup lang="ts">
import useProps from '../../../hooks/props';
import { useUser } from '../../../store';

const userData = useUser();
const { src, width, height } = useProps(['src', 'width', 'height']);
</script>

<template>
	<div v-if="userData.user.admin">
		<VTextField label="Image Source (Admin Only)" v-model="src" />
		<VDivider class="my-8" />
	</div>
	<ImageSelect
		btn-label="Replace Image"
		v-model:src="src"
		v-model:width="width"
		v-model:height="height"
	/>
</template>

<style scoped lang="scss">
.library-wrapper {
	height: 90vh;
}
</style>
