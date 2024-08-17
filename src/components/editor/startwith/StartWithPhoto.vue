<script setup lang="ts"></script>

<template>
	<VContainer>
		<VRow>
			<VCol class="sidebar" cols="auto">
				<SearchInput label="Search Photos" />
			</VCol>
			<VCol class="overflow-x-hidden overflow-y-auto">
				<VRow>
					<GridItem v-for="i of 24" cols="2" />
				</VRow>
			</VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss">
.sidebar {
	width: 256px;
}
</style>
