<script setup lang="ts">
const items = Array(6).fill('');
</script>

<template>
	<VContainer>
		<VRow>
			<VCol>
				<VCard :to="{ name: 'editor', query: { start: 'blank' } }">
					<VCardItem>
						<VCardTitle>Blank Canvas</VCardTitle>
						<VCardSubtitle
							>Create a black canvas, and start design images from
							scratch.</VCardSubtitle
						>
					</VCardItem>
				</VCard>
			</VCol>
			<VCol>
				<VCard :to="{ name: 'editor', query: { start: 'template' } }">
					<VCardItem>
						<VCardTitle>Templates</VCardTitle>
						<VCardSubtitle>SubTitle</VCardSubtitle>
					</VCardItem>
				</VCard>
			</VCol>
			<VCol>
				<VCard :to="{ name: 'editor', query: { start: 'photo' } }">
					<VCardItem>
						<VCardTitle>Photos</VCardTitle>
						<VCardSubtitle>SubTitle</VCardSubtitle>
					</VCardItem>
				</VCard>
			</VCol>
		</VRow>
		<VRow>
			<VCol cols="12">
				<VRow justify="space-between" align="center">
					<VCol cols="auto">
						<h2>Recent Projects</h2>
					</VCol>
					<VCol cols="auto">
						<VBtn variant="plain" to="dashboard/projects">View All</VBtn>
					</VCol>
				</VRow>
			</VCol>
			<GridItem v-for="item of items" cols="2" />
		</VRow>
		<VRow>
			<VCol>
				<h2>Editor's Choice</h2>
			</VCol>
		</VRow>
		<VRow>
			<VCol cols="12">
				<VRow justify="space-between" align="center">
					<VCol cols="auto">
						<VChip>Instagram Story</VChip>
					</VCol>
					<VCol cols="auto">
						<VBtn
							variant="plain"
							:to="{
								path: 'dashboard/templates',
								query: {}
							}"
						>
							View All
						</VBtn>
					</VCol>
				</VRow>
			</VCol>
			<GridItem v-for="item of items" cols="2" />
		</VRow>
		<VRow>
			<VCol cols="12">
				<VRow justify="space-between" align="center">
					<VCol cols="auto">
						<VChip>Instagram Story</VChip>
					</VCol>
					<VCol cols="auto">
						<VBtn
							variant="plain"
							:to="{
								path: 'dashboard/templates',
								query: {}
							}"
						>
							View All
						</VBtn>
					</VCol>
				</VRow>
			</VCol>
			<GridItem v-for="item of items" cols="2" />
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
