<script setup lang="ts">
import { mdiTune } from '@mdi/js';

const properties = defineProps<{
	label: string;
	filterDisabled: boolean;
}>();
const search = defineModel();
const emit = defineEmits(['search']);
</script>

<template>
	<SearchInput :label="properties.label" v-model="search" @click:append-inner="emit('search')">
		<template v-slot:prepend-inner>
			<VMenu :close-on-content-click="false">
				<template v-slot:activator="{ props }">
					<VIcon
						:icon="mdiTune"
						:style="{ opacity: properties.filterDisabled ? 0.4 : 1 }"
						v-bind="props"
						:disabled="properties.filterDisabled"
					/>
				</template>
				<slot />
			</VMenu>
		</template>
	</SearchInput>
</template>

<style scoped lang="scss"></style>
