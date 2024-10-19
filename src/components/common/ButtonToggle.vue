<script setup lang="ts">
const props = defineProps<{
	label: string;
	multiple: boolean;
	mandatory: boolean;
}>();
const model = defineModel();
</script>

<template>
	<VLabel class="v-field-label--floating mb-2">{{ props.label }}</VLabel>
	<VBtnToggle
		class="mb-5"
		v-model="model"
		:multiple="props.multiple"
		:mandatory="props.mandatory"
	>
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
