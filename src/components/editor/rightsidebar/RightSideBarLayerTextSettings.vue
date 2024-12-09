<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('transform');
</script>

<template>
	<VTabs v-model="tab">
		<VTab value="transform" v-tooltip:top="'Transform'">
			<VIcon icon="mdi-tune" />
		</VTab>
		<VTab value="text" v-tooltip:top="'Text'">
			<VIcon icon="mdi-format-text" />
		</VTab>
		<VTab value="appearance" v-tooltip:top="'Appearance'">
			<VIcon icon="mdi-brush-variant" />
		</VTab>
		<VTab value="compositing" v-tooltip:top="'Compositing'">
			<VIcon icon="mdi-water-opacity" />
		</VTab>
	</VTabs>
	<TabItem>
		<RightSideBarTabTransformSettings v-if="tab === 'transform'" />
		<RightSideBarTabTextSettings v-else-if="tab === 'text'" />
		<RightSideBarTabAppearanceSettings v-else-if="tab === 'appearance'" />
		<RightSideBarTabCompositingSettings v-else-if="tab === 'compositing'" />
	</TabItem>
</template>

<style scoped lang="scss"></style>
