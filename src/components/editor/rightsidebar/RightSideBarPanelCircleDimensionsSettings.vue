<script setup lang="ts">
import useProps from '../../../hooks/props';

const { radius } = useProps(['radius']);
</script>

<template>
	<VExpansionPanel title="Dimensions" value="dimensions">
		<VExpansionPanelText>
			<VTextField type="number" label="Radius" v-model="radius" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
