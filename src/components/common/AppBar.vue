<script setup lang="ts">
import { LOGO_SRC } from '../../utils/constants';
</script>

<template>
	<VAppBar>
		<template v-slot:prepend>
			<VImg :src="LOGO_SRC" class="logo ml-3" />
		</template>
		<template v-slot:append>
			<UserMenu />
		</template>
	</VAppBar>
</template>

<style scoped lang="scss">
.logo {
	width: 80px;
}
</style>
