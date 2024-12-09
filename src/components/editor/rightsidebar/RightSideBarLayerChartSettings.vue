<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('transform');
</script>

<template>
	<VTabs v-model="tab">
		<VTab value="transform" v-tooltip:top="'Transform'">
			<VIcon icon="mdi-tune" />
		</VTab>
		<VTab value="compositing" v-tooltip:top="'Compositing'">
			<VIcon icon="mdi-water-opacity" />
		</VTab>
	</VTabs>
	<TabItem>
		<RightSideBarTabTransformSettings />
		<RightSideBarTabShadowSettings />
		<RightSideBarTabCompositingSettings />
	</TabItem>
</template>

<style scoped lang="scss"></style>
