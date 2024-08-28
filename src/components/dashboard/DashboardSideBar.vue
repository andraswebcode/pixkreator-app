<script setup lang="ts">
import {
	mdiChevronLeft,
	mdiCloudUpload,
	mdiCreation,
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
			<VListItem to="/dashboard/projects" v-tooltip:end="'All Projects'">
				<VIcon :icon="mdiFolderMultiple" />
			</VListItem>
			<VListItem to="/dashboard/uploads" v-tooltip:end="'Uploads'">
				<VIcon :icon="mdiCloudUpload" />
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
