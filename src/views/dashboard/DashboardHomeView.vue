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
		<VRow class="header">
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
	</VContainer>
	<div class="items">
		<VContainer>
			<VRow>
				<VCol cols="12">
					<VRow justify="space-between" align="center">
						<VCol cols="auto">
							<h2>Recent Projects</h2>
						</VCol>
						<VCol cols="auto">
							<VBtn
								variant="plain"
								to="dashboard/projects"
								:disabled="!recentProjects.length"
							>
								View All
							</VBtn>
						</VCol>
					</VRow>
				</VCol>
				<GridItem v-if="recentProjects.length" v-for="item of recentProjects" cols="2" />
				<GridLoader v-else :cols="2" :count="6" />
			</VRow>
			<VRow>
				<VCol>
					<h2>Editor's Choice</h2>
				</VCol>
			</VRow>
			<VRow v-if="editorsChoice.length" v-for="item of editorsChoice" :key="item.value">
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
				<GridItem
					v-for="tmpl of item.templates"
					:key="tmpl.id"
					cols="2"
					:src="tmpl.thumbnail"
				/>
			</VRow>
			<VRow v-else v-for="i in 3" :key="i">
				<VCol cols="12">
					<VRow justify="space-between" align="center">
						<VCol cols="auto">
							<VChip>Loading...</VChip>
						</VCol>
						<VCol cols="auto">
							<VBtn variant="plain" disabled>View All</VBtn>
						</VCol>
					</VRow>
				</VCol>
				<GridLoader :cols="2" :count="6" />
			</VRow>
		</VContainer>
	</div>
</template>

<style scoped lang="scss">
.header {
	flex: 0 !important;
}
.items {
	margin-top: 12px;
	flex: 1 0 auto;
	height: 1px;
	overflow-y: scroll;
}
</style>
