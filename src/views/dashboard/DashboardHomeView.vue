<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import useRequest from '../../hooks/request';
import { useRouter } from 'vue-router';
import { DETAILS_DIALOG_WIDTH } from '../../utils/constants';
import { useDisplay } from 'vuetify';
import { useUser } from '../../store';

const { list } = useRequest();
const router = useRouter();
const userData = useUser();
const { mdAndUp } = useDisplay();
const recentProjects = ref<any[]>([]);
const editorsChoice = ref<any[]>([]);
const loadingProjects = ref(true);
const showDetails = ref(false);
const index = ref(0);
const category = ref('');
const items = computed(
	() => editorsChoice.value.find((cat) => cat.value === category.value)?.templates
);

const editProject = (i: number) => {
	router.push({
		name: 'editor',
		params: {
			id: recentProjects.value[i].id
		}
	});
};
const openDetails = (i: number, c: string) => {
	showDetails.value = true;
	index.value = i;
	category.value = c;
};
const addTemplate = () => {
	const id = editorsChoice.value.find((cat) => cat.value === category.value)?.templates[
		index.value
	]?.id;
	router.push({
		name: 'editor',
		query: {
			template: id
		}
	});
};

onMounted(() => {
	list(
		{
			per_page: 6
		},
		'designs',
		(data) => {
			recentProjects.value = data.items;
			loadingProjects.value = false;
		}
	);
	list({}, 'templates/editorschoice', (data) => {
		editorsChoice.value = data;
	});
});
</script>

<template>
	<VContainer>
		<VRow class="header">
			<VCol cols="12" md="4">
				<VCard :to="{ name: 'editor', query: { start: 'blank' } }">
					<VCardItem>
						<VCardTitle>Blank Canvas</VCardTitle>
						<VCardSubtitle v-if="mdAndUp">
							Create a black canvas, and start design images from scratch.
						</VCardSubtitle>
					</VCardItem>
				</VCard>
			</VCol>
			<VCol cols="12" md="4">
				<VCard :to="{ name: 'editor', query: { start: 'template' } }">
					<VCardItem>
						<VCardTitle>Templates</VCardTitle>
						<VCardSubtitle v-if="mdAndUp">
							Explore a variety of pre-made design templates to kickstart your
							project.
						</VCardSubtitle>
					</VCardItem>
				</VCard>
			</VCol>
			<VCol cols="12" md="4">
				<VCard :to="{ name: 'editor', query: { start: 'photo' } }">
					<VCardItem>
						<VCardTitle>Photos</VCardTitle>
						<VCardSubtitle v-if="mdAndUp">
							Browse a rich library of high-quality stock photos to enhance your
							designs.
						</VCardSubtitle>
					</VCardItem>
				</VCard>
			</VCol>
		</VRow>
	</VContainer>
	<div class="items">
		<VContainer>
			<VerifyEmailAlert v-if="!userData.user.email_verified" class="mb-5" />
			<VRow v-else>
				<VCol cols="12">
					<VRow justify="space-between" align="center">
						<VCol cols="auto">
							<h2>Recent Projects</h2>
						</VCol>
						<VCol cols="auto">
							<VBtn
								variant="plain"
								to="dashboard/projects"
								:disabled="loadingProjects || !recentProjects.length"
							>
								View All
							</VBtn>
						</VCol>
					</VRow>
				</VCol>
				<GridLoader v-if="loadingProjects" :cols="2" :count="6" responsive />
				<GridItem
					v-else-if="!loadingProjects && recentProjects.length"
					v-for="(item, i) of recentProjects"
					:key="item.id"
					:label="item.title"
					cols="2"
					:json="{
						...item,
						layers: item.layer_ids.map((id) => {
							const layer = item.layers[id];

							if (layer.type === 'Group') {
								layer.objects = layer.childIds.map((id) => item.layers[id]);
							}

							return layer;
						})
					}"
					responsive
					@click="editProject(i)"
				/>
				<VAlert v-else class="mx-3 mt-3" type="warning" icon="mdi-alert-circle">
					No items found
				</VAlert>
			</VRow>
			<VRow>
				<VCol>
					<h2>Editor's Choice</h2>
				</VCol>
			</VRow>
			<VRow v-if="editorsChoice.length" v-for="item of editorsChoice" :key="item.slug">
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
										category: item.slug
									}
								}"
								:disabled="!item.templates?.length"
							>
								View All
							</VBtn>
						</VCol>
					</VRow>
				</VCol>
				<GridItem
					v-if="item.templates?.length"
					v-for="(tmpl, i) of item.templates"
					:key="tmpl.id"
					cols="2"
					:src="tmpl.thumbnail"
					responsive
					@click="openDetails(i, tmpl.category)"
				/>
				<VAlert v-else class="mx-3 mt-3" type="warning" :icon="mdiAlertCircle">
					No items found
				</VAlert>
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
				<GridLoader :cols="2" :count="6" responsive />
			</VRow>
		</VContainer>
	</div>
	<PersistentHeaderDialog
		v-model="showDetails"
		@close="showDetails = false"
		:max-width="DETAILS_DIALOG_WIDTH"
	>
		<DetailsCarousel v-model="index">
			<TemplateDetails v-for="item of items" :key="item.id" v-bind="item" />
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn @click="addTemplate">Customize This Template</VBtn>
		</template>
	</PersistentHeaderDialog>
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
