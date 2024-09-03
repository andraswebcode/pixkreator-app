<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '../../../store';

const tab = ref('storage');
const userData = useUser();
</script>

<template>
	<TabsWrapper v-if="userData.loggedIn">
		<VTabs v-model="tab" fixed-tabs>
			<VTab value="storage">Storage</VTab>
			<VTab value="upload">Upload</VTab>
		</VTabs>
		<VDivider />
		<LeftSideBarTabUploadStorage v-if="tab === 'storage'" />
		<LeftSideBarTabUpload v-else-if="tab === 'upload'" />
	</TabsWrapper>
	<LoginNotice v-else />
</template>

<style scoped lang="scss"></style>
