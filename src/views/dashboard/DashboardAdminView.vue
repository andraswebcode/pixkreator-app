<script setup lang="ts"></script>

<template>
	<VBtnGroup>
		<VBtn :to="{ name: 'admin-blog' }">Blog</VBtn>
		<VBtn :to="{ name: 'admin-assets' }">Assets</VBtn>
	</VBtnGroup>
	<RouterView />
</template>

<style scoped lang="scss"></style>
