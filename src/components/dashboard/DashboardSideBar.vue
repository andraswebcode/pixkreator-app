<script setup lang="ts">
import { useUser } from '../../store';
import { useRoute } from 'vue-router';

const userData = useUser();
const route = useRoute();
</script>

<template>
	<VNavigationDrawer width="56" permanent>
		<VList>
			<VListItem to="/dashboard" v-tooltip:end="'Home'" :active="route.name === 'home'">
				<VIcon icon="mdi-home" />
			</VListItem>
			<VListItem to="/dashboard/projects" v-tooltip:end="'Projects'">
				<VIcon icon="mdi-folder-multiple" />
			</VListItem>
			<VListItem to="/dashboard/files" v-tooltip:end="'Files'">
				<VIcon icon="mdi-file-document-multiple" />
			</VListItem>
			<VListItem to="/dashboard/templates" v-tooltip:end="'Templates'">
				<VIcon icon="mdi-view-dashboard-edit" />
			</VListItem>
			<VListItem to="/dashboard/photos" v-tooltip:end="'Photos'">
				<VIcon icon="mdi-image-multiple" />
			</VListItem>
			<VListItem v-if="userData.isProPlan" to="/dashboard/brand" v-tooltip:end="'Brand'">
				<VIcon icon="mdi-palette-swatch-variant" />
			</VListItem>
			<VDivider v-if="userData.user.admin" />
			<VListItem
				v-if="userData.user.admin"
				to="/dashboard/admin"
				v-tooltip:end="'Admin Tools'"
			>
				<VIcon icon="mdi-hammer-wrench" />
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
