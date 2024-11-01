<script setup lang="ts">
import useProps from '../../../hooks/props';

const { width, height } = useProps(['width', 'height']);
</script>

<template>
	<VExpansionPanel title="Dimensions" value="dimensions">
		<VExpansionPanelText>
			<InputGroup>
				<VTextField type="number" label="Width" v-model="width" />
				<VTextField type="number" label="Height" v-model="height" />
			</InputGroup>
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
