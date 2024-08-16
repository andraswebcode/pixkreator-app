<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useRequest from '../../hooks/request';

const recentProjects = ref([]);
const editorsChoice = ref([]);
const { list } = useRequest();

onMounted(() => {
	list(
		{
			per_page: 6
		},
		'designs',
		(data) => {
			recentProjects.value = data.items;
		}
	);
	list({}, 'templates/editorschoice', (data) => {
		editorsChoice.value = data;
		console.log(data);
	});
});
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
			<GridItem v-for="item of recentProjects" cols="2" />
		</VRow>
		<VRow>
			<VCol>
				<h2>Editor's Choice</h2>
			</VCol>
		</VRow>
		<VRow v-for="item of editorsChoice" :key="item.value">
			<VCol cols="12">
				<VRow justify="space-between" align="center">
					<VCol cols="auto">
						<VChip>{{ item.label }}</VChip>
					</VCol>
					<VCol cols="auto">
						<VBtn
							variant="plain"
							:to="{
								name: 'templates',
								params: {
									category: item.value
								}
							}"
						>
							View All
						</VBtn>
					</VCol>
				</VRow>
			</VCol>
			<GridItem v-for="tmpl of item.templates" :key="tmpl.id" cols="2" />
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss"></style>
