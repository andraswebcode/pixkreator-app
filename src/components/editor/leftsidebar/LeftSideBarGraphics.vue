<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('search');
</script>

<template>
	<TabsWrapper>
		<VTabs v-model="tab" fixed-tabs>
			<VTab value="search">Search</VTab>
			<VTab value="upload">Upload</VTab>
		</VTabs>
		<VDivider />
		<LeftSideBarTabGraphics v-if="tab === 'search'" />
		<LeftSideBarTabUploadSVG v-if="tab === 'upload'" />
	</TabsWrapper>
</template>

<style scoped lang="scss"></style>
