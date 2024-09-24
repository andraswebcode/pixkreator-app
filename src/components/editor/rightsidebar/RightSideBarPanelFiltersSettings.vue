<script setup lang="ts">
import useProps from '../../../hooks/props';

const { filters } = useProps(['filters']);
</script>

<template>
	<VExpansionPanel title="Filters" value="filters">
		<VExpansionPanelText>
			<FilterSettings v-for="filter of filters" :key="filter.type" v-bind="filter" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
