<script setup lang="ts">
import useProps from '../../../hooks/props';

const { imageSrc, imageSize, imageMargin } = useProps(['imageSrc', 'imageSize', 'imageMargin']);
</script>

<template>
	<VExpansionPanel title="Logo" value="qrcodeimage">
		<VExpansionPanelText>
			<ImageSelect btn-label="Add Logo" v-model:src="imageSrc" />
			<RangeSlider label="Size (%)" v-model="imageSize" />
			<RangeSlider label="Margin" v-model="imageMargin" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
