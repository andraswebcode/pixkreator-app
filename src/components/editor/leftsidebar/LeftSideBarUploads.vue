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
		<VTabsWindow v-model="tab">
			<VTabsWindowItem value="storage">
				<LeftSideBarTabUploadStorage />
			</VTabsWindowItem>
			<VTabsWindowItem value="upload">
				<LeftSideBarTabUpload />
			</VTabsWindowItem>
		</VTabsWindow>
	</TabsWrapper>
</template>

<style scoped lang="scss"></style>
