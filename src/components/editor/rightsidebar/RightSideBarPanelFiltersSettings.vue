<script setup lang="ts">
import useProps from '../../../hooks/props';

const { filters } = useProps(['filters']);
console.log(filters);
</script>

<template>
	<VExpansionPanel title="Filters" value="filters">
		<VExpansionPanelText> {{ filters }} </VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
