<script setup lang="ts">
import useProps from '../../../hooks/props';

const { shadow } = useProps(['shadow']);
</script>

<template>
	<VExpansionPanel title="Shadow" value="shadow">
		<VExpansionPanelText>
			<ShadowPicker v-model="shadow" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
