<script setup lang="ts">
import { computed } from 'vue';
import { ImageFilter } from '../../types/image-filter';
import imageFilters from '../../utils/image-filters';

const props = defineProps<ImageFilter>();
const filter = computed<any>(() => imageFilters.find((f) => f.name === props.type));
</script>

<template>
	<div>
		<VRow>
			<VCol>
				<h4 class="mb-2">{{ filter?.label }}</h4>
				<div v-for="c of filter?.controls" :key="c.name">
					<VSelect v-if="c.type === 'select'" :label="c.label" :items="c.options" />
					<RangeSlider v-else-if="c.type === 'range'" :label="c.label" />
					<ColorPicker v-else-if="c.type === 'color'" :label="c.label" />
				</div>
			</VCol>
		</VRow>
		<VDivider class="mb-2" />
	</div>
</template>

<style scoped lang="scss"></style>
