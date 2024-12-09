<script setup lang="ts">
import useProps from '../../../hooks/props';
import { qrCodeDotTypes } from '../../../utils/apps';

const { dotsType, dotsColor } = useProps(['dotsType', 'dotsColor']);
</script>

<template>
	<VSelect label="Dot Shape" :items="qrCodeDotTypes" v-model="dotsType" />
	<ColorPicker label="Dot Color" v-model="dotsColor" />
</template>

<style scoped lang="scss"></style>
