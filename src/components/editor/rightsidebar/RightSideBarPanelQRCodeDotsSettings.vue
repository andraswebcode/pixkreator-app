<script setup lang="ts">
import useProps from '../../../hooks/props';
import { qrCodeDotTypes } from '../../../utils/apps';

const { dotsType, dotsColor } = useProps(['dotsType', 'dotsColor']);
</script>

<template>
	<VExpansionPanel title="Dots" value="qrcodedots">
		<VExpansionPanelText>
			<VSelect label="Dot Shape" :items="qrCodeDotTypes" v-model="dotsType" />
			<ColorPicker label="Dot Color" v-model="dotsColor" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
