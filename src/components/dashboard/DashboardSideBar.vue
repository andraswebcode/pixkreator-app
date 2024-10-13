<script setup lang="ts">
import {
	mdiFileDocumentMultiple,
	mdiFolderMultiple,
	mdiHammerWrench,
	mdiHome,
	mdiImageMultiple,
	mdiPaletteSwatchVariant,
	mdiViewDashboardEdit
} from '@mdi/js';
import { useUser } from '../../store';

const userData = useUser();
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
			<VDivider v-if="userData.user.admin" />
			<VListItem
				v-if="userData.user.admin"
				to="/dashboard/admin"
				v-tooltip:end="'Admin Tools'"
			>
				<VIcon :icon="mdiHammerWrench" />
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
