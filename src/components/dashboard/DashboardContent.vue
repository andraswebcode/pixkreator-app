<script setup lang="ts"></script>

<template>
	<VMain>
		<VContainer>
			<RouterView />
		</VContainer>
	</VMain>
</template>

<style scoped lang="scss">
.v-main {
	height: 100vh;
}
.v-container {
	display: flex;
	flex-direction: column;
	flex-flow: column;
	height: 100%;
}
</style>
