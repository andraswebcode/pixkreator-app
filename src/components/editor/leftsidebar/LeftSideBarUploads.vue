<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '../../../store';

const tab = ref('upload');
const userData = useUser();
</script>

<template>
	<TabsWrapper v-if="userData.loggedIn">
		<VTabs v-model="tab" fixed-tabs>
			<VTab value="upload">Upload</VTab>
			<VTab value="storage">Storage</VTab>
		</VTabs>
		<VDivider />
		<LeftSideBarTabUpload v-if="tab === 'upload'" />
		<LeftSideBarTabUploadStorage v-else-if="tab === 'storage'" />
	</TabsWrapper>
	<LoginNotice v-else />
</template>

<style scoped lang="scss"></style>
