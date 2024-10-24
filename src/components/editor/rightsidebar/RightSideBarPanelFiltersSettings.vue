<script setup lang="ts">
import useProps from '../../../hooks/props';

const { filters } = useProps(['filters']);
</script>

<template>
	<VExpansionPanel title="Filters" value="filters">
		<VExpansionPanelText>
			<FilterSettings show-header v-model="filters" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
