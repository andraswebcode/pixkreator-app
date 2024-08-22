<script setup lang="ts">
const props = defineProps<{
	label: string;
}>();
</script>

<template>
	<VTextField :label="props.label"></VTextField>
</template>

<style scoped lang="scss"></style>
