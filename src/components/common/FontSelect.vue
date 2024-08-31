<script setup lang="ts">
import useGFonts from '../../hooks/gfonts';

const props = defineProps<{
	label: string;
}>();
const model = defineModel<string>();
const { items, search } = useGFonts();
</script>

<template>
	<VAutocomplete
		:label="props.label"
		v-model="model"
		:items="items"
		item-title="family"
		item-value="family"
		hide-no-data
		hide-details
		no-filter
		@update:search="search"
	>
		<template v-slot:item="{ item, props }">
			<VListItem v-bind="props" :style="{ fontFamily: item.raw.family }" />
		</template>
	</VAutocomplete>
</template>

<style scoped lang="scss"></style>
