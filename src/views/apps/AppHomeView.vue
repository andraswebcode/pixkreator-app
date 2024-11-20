<script setup lang="ts">
import { apps } from '../../utils/apps';
</script>

<template>
	<VRow>
		<VCol v-for="app in apps" :key="app.id" cols="12" sm="6" md="4">
			<AppCard class="mb-4 bg-blue-grey-darken-4" :to="{ name: app.id }" v-bind="app" />
		</VCol>
	</VRow>
</template>

<style scoped lang="scss"></style>
