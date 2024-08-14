<script setup lang="ts"></script>

<template>
	<VContainer>
		<VRow>
			<VCol>
				<VCard to="/?start=blank">
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
				<VCard to="/dashboard/templates">
					<VCardItem>
						<VCardTitle>Templates</VCardTitle>
						<VCardSubtitle>SubTitle</VCardSubtitle>
					</VCardItem>
				</VCard>
			</VCol>
			<VCol>
				<VCard to="/dashboard/photos">
					<VCardItem>
						<VCardTitle>Photos</VCardTitle>
						<VCardSubtitle>SubTitle</VCardSubtitle>
					</VCardItem>
				</VCard>
			</VCol>
		</VRow>
		<VRow>
			<VCol>
				<h2>Editor's Choice</h2>
			</VCol>
		</VRow>
		<VRow>
			<GridItem />
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
