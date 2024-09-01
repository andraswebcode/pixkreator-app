<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('generate');
</script>

<template>
	<TabsWrapper>
		<VTabs v-model="tab" fixed-tabs>
			<VTab value="generate">Generate</VTab>
			<VTab value="archive">Archive</VTab>
		</VTabs>
		<VDivider />
		<LeftSideBarTabAIGenerate v-if="tab === 'generate'" />
		<LeftSideBarTabAIArchive v-if="tab === 'archive'" />
	</TabsWrapper>
</template>

<style scoped lang="scss"></style>
