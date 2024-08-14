<script setup lang="ts">
import {
	mdiBrush,
	mdiCloudUpload,
	mdiCreation,
	mdiFormatText,
	mdiImageMultiple,
	mdiPaletteSwatchVariant,
	mdiShape,
	mdiViewDashboardEdit
} from '@mdi/js';
import { useEditor } from '../../store';
const editor = useEditor();
</script>

<template>
	<VNavigationDrawer width="56" permanent>
		<ToolBarList v-model="editor.tool">
			<ToolBarItem
				value="templates"
				v-tooltip:end="'Templates'"
				:icon="mdiViewDashboardEdit"
			/>
			<ToolBarItem value="uploads" v-tooltip:end="'Uploads'" :icon="mdiCloudUpload" />
			<ToolBarItem value="photos" v-tooltip:end="'Photos'" :icon="mdiImageMultiple" />
			<ToolBarItem value="graphics" v-tooltip:end="'Graphics'" :icon="mdiShape" />
			<ToolBarItem value="ai" v-tooltip:end="'Generate With AI'" :icon="mdiCreation" />
			<ToolBarItem value="texts" v-tooltip:end="'Texts'" :icon="mdiFormatText" />
			<ToolBarItem value="draw" v-tooltip:end="'Draw'" :icon="mdiBrush" />
			<ToolBarItem value="brand" v-tooltip:end="'Brand'" :icon="mdiPaletteSwatchVariant" />
		</ToolBarList>
	</VNavigationDrawer>
</template>

<style scoped lang="scss"></style>
