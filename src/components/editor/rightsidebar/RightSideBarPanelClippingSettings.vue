<script setup lang="ts">
import useProps from '../../../hooks/props';

const { width, height, cropX, cropY } = useProps(['width', 'height', 'cropX', 'cropY']);
</script>

<template>
	<VExpansionPanel title="Clipping" value="clipping">
		<VExpansionPanelText>
			<InputGroup>
				<VTextField type="number" label="Image Width" v-model="width" :min="0" />
				<VTextField type="number" label="Image Height" v-model="height" :min="0" />
			</InputGroup>
			<InputGroup>
				<VTextField type="number" label="Image Crop X" v-model="cropX" :min="0" />
				<VTextField type="number" label="Image Crop Y" v-model="cropY" :min="0" />
			</InputGroup>
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
