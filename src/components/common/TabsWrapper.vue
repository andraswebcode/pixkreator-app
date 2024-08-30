<script setup lang="ts"></script>

<template>
	<div>
		<slot />
	</div>
</template>

<style scoped lang="scss">
div {
	display: flex;
	flex-flow: column;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	& > * {
		flex: 0 0 auto;
	}
}
:deep(.v-window) {
	flex: 1 1 auto;
}
:deep(.v-window__container),
:deep(.v-window-item) {
	height: 100%;
}
</style>
