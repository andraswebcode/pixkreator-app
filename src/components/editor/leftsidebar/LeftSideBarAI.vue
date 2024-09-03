<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '../../../store';

const tab = ref('generate');
const userData = useUser();
</script>

<template>
	<TabsWrapper v-if="userData.loggedIn">
		<VTabs v-model="tab" fixed-tabs>
			<VTab value="generate">Generate</VTab>
			<VTab value="archive">Archive</VTab>
		</VTabs>
		<VDivider />
		<LeftSideBarTabAIGenerate v-if="tab === 'generate'" />
		<LeftSideBarTabAIArchive v-if="tab === 'archive'" />
	</TabsWrapper>
	<LoginNotice v-else />
</template>

<style scoped lang="scss"></style>
