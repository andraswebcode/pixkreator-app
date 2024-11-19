<script setup lang="ts">
import { useEditor, useUser } from '../../store';

const editor = useEditor();
const userData = useUser();
</script>

<template>
	<VNavigationDrawer width="56" permanent>
		<ToolBarList v-model="editor.tool">
			<ToolBarItem
				value="templates"
				v-tooltip:end="'Templates'"
				icon="mdi-view-dashboard-edit"
			/>
			<ToolBarItem value="uploads" v-tooltip:end="'Uploads'" icon="mdi-cloud-upload" />
			<ToolBarItem value="photos" v-tooltip:end="'Photos'" icon="mdi-image-multiple" />
			<ToolBarItem value="graphics" v-tooltip:end="'Graphics'" icon="mdi-shape" />
			<ToolBarItem value="texts" v-tooltip:end="'Texts'" icon="mdi-format-text" />
			<ToolBarItem value="ai" v-tooltip:end="'Generate With AI'" icon="mdi-creation" />
			<ToolBarItem
				value="filters"
				v-tooltip:end="'Photo Effects'"
				:icon="mdiImageAutoAdjust"
			/>
			<ToolBarItem value="draw" v-tooltip:end="'Draw'" icon="mdi-brush" />
			<ToolBarItem value="apps" v-tooltip:end="'Apps'" icon="mdi-apps" />
			<ToolBarItem
				v-if="userData.isProPlan"
				value="brand"
				v-tooltip:end="'Brand'"
				icon="mdi-palette-swatch-variant"
			/>
		</ToolBarList>
	</VNavigationDrawer>
</template>

<style scoped lang="scss"></style>
