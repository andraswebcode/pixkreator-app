<script setup lang="ts">
import { mdiLayers } from '@mdi/js';
import { useProject } from '../../../store';
import { ref } from 'vue';

const project = useProject();
const open = ref(false);
</script>

<template>
	<VMenu persistent :close-on-content-click="false" v-model="open">
		<template v-slot:activator="{ props }">
			<VBtn :icon="mdiLayers" v-tooltip:top="'Layers'" v-bind="props" />
		</template>
		<VCard width="300" max-height="500">{{ project.byIds }}</VCard>
	</VMenu>
</template>

<style scoped lang="scss"></style>
