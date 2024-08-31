<script setup lang="ts">
const props = defineProps<{
	label: string;
}>();
const model = defineModel();
</script>

<template>
	<VLabel class="v-field-label--floating mb-2">{{ props.label }}</VLabel>
	<VBtnToggle v-model="model">
		<slot />
	</VBtnToggle>
</template>

<style scoped lang="scss">
.v-label {
	display: block;
	visibility: visible;
	position: static;
}
</style>
