<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('search');
</script>

<template>
	<TabsWrapper>
		<VTabs v-model="tab" fixed-tabs>
			<VTab value="search">Search</VTab>
			<VTab value="create">Create</VTab>
		</VTabs>
		<VDivider />
		<VTabsWindow v-model="tab">
			<VTabsWindowItem value="search">
				<LeftSideBarTabTextDesigns />
			</VTabsWindowItem>
			<VTabsWindowItem value="create">
				<LeftSideBarTabAddText />
			</VTabsWindowItem>
		</VTabsWindow>
	</TabsWrapper>
</template>

<style scoped lang="scss"></style>
