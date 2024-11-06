<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('create');
</script>

<template>
	<TabsWrapper>
		<VTabs v-model="tab" fixed-tabs>
			<VTab value="search">Search</VTab>
			<VTab value="create">Create</VTab>
		</VTabs>
		<VDivider />
		<LeftSideBarTabTextDesigns v-if="tab === 'search'" />
		<LeftSideBarTabAddText v-if="tab === 'create'" />
	</TabsWrapper>
</template>

<style scoped lang="scss"></style>
