<script setup lang="ts">
import useProps from '../../../hooks/props';

const { radius } = useProps(['radius']);
</script>

<template>
	<VTextField type="number" label="Radius" v-model="radius" />
</template>

<style scoped lang="scss"></style>
