<script setup lang="ts">
import {
	mdiFileDocumentMultiple,
	mdiFolderMultiple,
	mdiHome,
	mdiImageMultiple,
	mdiPaletteSwatchVariant,
	mdiViewDashboardEdit
} from '@mdi/js';
</script>

<template>
	<VNavigationDrawer width="56" permanent>
		<VList>
			<VListItem to="/dashboard" v-tooltip:end="'Home'">
				<VIcon :icon="mdiHome" />
			</VListItem>
			<VListItem to="/dashboard/projects" v-tooltip:end="'Projects'">
				<VIcon :icon="mdiFolderMultiple" />
			</VListItem>
			<VListItem to="/dashboard/files" v-tooltip:end="'Files'">
				<VIcon :icon="mdiFileDocumentMultiple" />
			</VListItem>
			<VListItem to="/dashboard/templates" v-tooltip:end="'Templates'">
				<VIcon :icon="mdiViewDashboardEdit" />
			</VListItem>
			<VListItem to="/dashboard/photos" v-tooltip:end="'Photos'">
				<VIcon :icon="mdiImageMultiple" />
			</VListItem>
			<VListItem to="/dashboard/brand" v-tooltip:end="'Brand'">
				<VIcon :icon="mdiPaletteSwatchVariant" />
			</VListItem>
		</VList>
	</VNavigationDrawer>
</template>

<style scoped lang="scss">
.sidebar-toggler {
	top: calc(50% - 14px);
	left: calc(100% + 1px);
}
</style>
