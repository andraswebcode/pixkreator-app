<script setup lang="ts">
const props = defineProps<{
	showHeader: boolean;
}>();
const model = defineModel<any[]>();
</script>

<template>
	<div v-for="(item, index) in model" :key="item.type">
		<FilterItemSettings
			:type="item.type"
			:show-header="props.showHeader"
			:index="index"
			v-model="model"
		/>
	</div>
</template>

<style scoped lang="scss"></style>
