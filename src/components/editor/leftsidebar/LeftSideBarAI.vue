<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '../../../store';

const tab = ref('archive');
const userData = useUser();
</script>

<template>
	<TabsWrapper v-if="userData.loggedIn">
		<VTabs v-model="tab" fixed-tabs>
			<VTab value="archive">Archive</VTab>
			<VTab value="generate">Generate</VTab>
		</VTabs>
		<VDivider />
		<LeftSideBarTabAIArchive v-if="tab === 'archive'" />
		<LeftSideBarTabAIGenerate v-if="tab === 'generate'" />
	</TabsWrapper>
	<LoginNotice v-else />
</template>

<style scoped lang="scss"></style>
