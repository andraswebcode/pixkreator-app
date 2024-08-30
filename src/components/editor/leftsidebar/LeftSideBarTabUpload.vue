<script setup lang="ts"></script>

<template>
	<LibraryWrapper>
		<div class="pa-4">
			<VBtn block>Upload From Computer</VBtn>
		</div>
		<LibraryItems :items-length="4" :count="24" :cols="6">
			<GridItem v-for="i of 4" :key="i" cols="6" />
		</LibraryItems>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
