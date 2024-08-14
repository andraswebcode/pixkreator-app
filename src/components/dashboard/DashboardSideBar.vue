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
import { ref } from 'vue';

const rail = ref(true);
</script>

<template>
	<VNavigationDrawer :rail="rail" @click="rail = false">
		<VList>
			<VListItem to="/dashboard">
				<template v-slot:prepend>
					<VIcon :icon="mdiHome" />
				</template>
				<VListItemTitle>Home</VListItemTitle>
			</VListItem>
			<VListItem to="/dashboard/templates">
				<template v-slot:prepend>
					<VIcon :icon="mdiViewDashboardEdit" />
				</template>
				<VListItemTitle>Templates</VListItemTitle>
			</VListItem>
			<VListItem to="/dashboard/projects">
				<template v-slot:prepend>
					<VIcon :icon="mdiFolderMultiple" />
				</template>
				<VListItemTitle>All Projects</VListItemTitle>
			</VListItem>
			<VListItem to="/dashboard/uploads">
				<template v-slot:prepend>
					<VIcon :icon="mdiCloudUpload" />
				</template>
				<VListItemTitle>Uploads</VListItemTitle>
			</VListItem>
			<VListItem to="/dashboard/photos">
				<template v-slot:prepend>
					<VIcon :icon="mdiImageMultiple" />
				</template>
				<VListItemTitle>Photos</VListItemTitle>
			</VListItem>
			<VListItem to="/dashboard/ai-images">
				<template v-slot:prepend>
					<VIcon :icon="mdiCreation" />
				</template>
				<VListItemTitle>AI Images</VListItemTitle>
			</VListItem>
			<VListItem to="/dashboard/brand">
				<template v-slot:prepend>
					<VIcon :icon="mdiPaletteSwatchVariant" />
				</template>
				<VListItemTitle>Brand</VListItemTitle>
			</VListItem>
		</VList>
		<template v-slot:append>
			<SideBarToggler v-if="!rail" @click.stop="rail = true" :icon="mdiChevronLeft" />
		</template>
	</VNavigationDrawer>
</template>

<style scoped lang="scss">
.sidebar-toggler {
	top: calc(50% - 14px);
	left: calc(100% + 1px);
}
</style>
