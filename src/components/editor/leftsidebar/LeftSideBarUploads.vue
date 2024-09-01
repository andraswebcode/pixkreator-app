<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('storage');
</script>

<template>
	<TabsWrapper>
		<VTabs v-model="tab" fixed-tabs>
			<VTab value="storage">Storage</VTab>
			<VTab value="upload">Upload</VTab>
		</VTabs>
		<VDivider />
		<LeftSideBarTabUploadStorage v-if="tab === 'storage'" />
		<LeftSideBarTabUpload v-else-if="tab === 'upload'" />
	</TabsWrapper>
</template>

<style scoped lang="scss"></style>
