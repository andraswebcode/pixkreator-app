<script setup lang="ts">
import { ref } from 'vue';
import { useUser } from '../../../store';
import { mdiTrashCan } from '@mdi/js';

const userData = useUser();
const panels = ref([]);
</script>

<template>
	<VExpansionPanels v-if="userData.loggedIn" v-model="panels">
		<VExpansionPanel title="Logos" value="logos"></VExpansionPanel>
		<VExpansionPanel title="Colors" value="colors">
			<VExpansionPanelText>
				<InputGroup v-for="i of 4" :key="i">
					<VTextField label="Name" />
					<ColorPicker label="Color" hide-brand />
					<VBtn :icon="mdiTrashCan" size="x-small" flat />
				</InputGroup>
			</VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Fonts" value="fonts"></VExpansionPanel>
	</VExpansionPanels>
	<LoginNotice v-else />
</template>

<style scoped lang="scss"></style>
