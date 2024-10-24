<script setup lang="ts">
const model = defineModel<any[]>();
</script>

<template>
	<div v-for="(item, index) in model" :key="item.type">
		<FilterItemSettings :type="item.type" :index="index" v-model="model" />
	</div>
</template>

<style scoped lang="scss"></style>
