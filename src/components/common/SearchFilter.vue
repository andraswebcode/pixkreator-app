<script setup lang="ts">
import { mdiTune } from '@mdi/js';

const properties = defineProps<{
	label: string;
}>();
const search = defineModel();
const emit = defineEmits(['search']);
</script>

<template>
	<SearchInput :label="properties.label" v-model="search" @click:append-inner="emit('search')">
		<template v-slot:prepend-inner>
			<VMenu :close-on-content-click="false">
				<template v-slot:activator="{ props }">
					<VIcon :icon="mdiTune" v-bind="props" />
				</template>
				<slot />
			</VMenu>
		</template>
	</SearchInput>
</template>

<style scoped lang="scss"></style>
