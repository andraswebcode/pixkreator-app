<script setup lang="ts">
import { computed, ref, toRaw, watch } from 'vue';
import { useEditor, useNotice, useProject } from '../../../store';
import { jsonToBlob } from '../../../utils/json-to-blob';
import {
	mdiContentCopy,
	mdiFacebook,
	mdiInformation,
	mdiInstagram,
	mdiLinkedin,
	mdiPinterest,
	mdiTwitter
} from '@mdi/js';
import { useRequest } from '../../../hooks';
import { useRoute, useRouter } from 'vue-router';
import { SocialMedia } from '../../../types/common';

const route = useRoute();
const router = useRouter();
const editor = useEditor();
const project = useProject();
const { save, patch } = useRequest();
const notice = useNotice();
const blob = ref<Blob>();
const src = ref('');
const loading = ref(false);
const socialMedia = ref<SocialMedia>('pinterest');
const linkBtnLabel = computed(() =>
	project.status === 'public' ? 'Remove Public View Link' : 'Create Public View Link'
);
const disabled = computed(() => project.status !== 'public');
const createLink = () => {
	loading.value = true;

	const { id } = route.params;

	if (project.status === 'public') {
		if (id) {
			patch(
				id as string,
				'designs',
				{
					status: 'private'
				},
				({ link, status }) => {
					project.$patch({ link, status });
					loading.value = false;
					console.log(link, status);
				}
			);
		}
	} else {
		const data = new FormData();

		data.append('file', blob.value as Blob);
		data.append('source', 'design');

		save('', 'uploads', data, (response) => {
			console.log(response);

			if (id) {
				patch(
					id as string,
					'designs',
					{
						status: 'public',
						upload_id: response.id
					},
					({ link, status, ...resp }) => {
						project.$patch({ link, status });
						loading.value = false;
						console.log(link, status, resp);
					}
				);
			} else {
				const { title, description, width, height, background, byIds, ids } = project;
				save(
					'',
					'designs',
					{
						title,
						description,
						status: 'public',
						width,
						height,
						background,
						layers: toRaw(byIds),
						layer_ids: toRaw(ids),
						upload_id: response.id
					},
					({ id, link, status, ...resp }) => {
						router.push({
							params: { id }
						});
						project.$patch({ link, status });
						loading.value = false;
						console.log(link, status, resp);
					}
				);
			}
		});
	}
};
const copyLink = () => {
	navigator.clipboard
		.writeText(project.link)
		.then(() => {
			notice.send('Link copied to clipboard!', 'success');
		})
		.catch(() => {
			notice.send('Failed to copy link!', 'error');
		});
};
const shareImage = () => {};

watch(
	() => editor.openShareDialog,
	(open) => {
		if (!open) {
			return;
		}

		jsonToBlob(
			{
				width: project.width,
				height: project.height,
				background: project.background,
				objects: project.ids.map((id) => toRaw(project.byIds[id]))
			},
			'image/webp',
			1
		).then((response) => {
			blob.value = response;
			src.value = URL.createObjectURL(response);
		});
	}
);
</script>

<template>
	<PersistentHeaderDialog
		title="Share Image"
		v-model="editor.openShareDialog"
		@close="editor.openShareDialog = false"
	>
		<VContainer>
			<VRow>
				<VCol cols="8" align-self="center">
					<VImg aspect-ratio="1.5" :src="src" />
				</VCol>
				<VCol cols="4">
					<VBtn
						class="mb-5"
						variant="tonal"
						block
						size="large"
						:loading="loading"
						@click="createLink"
					>
						{{ linkBtnLabel }}
					</VBtn>
					<VAlert
						v-if="project.status !== 'public'"
						class="mb-5"
						type="info"
						:icon="mdiInformation"
					>
						This link can be deleted at any time.
					</VAlert>
					<VTextField
						v-else
						readonly
						:model-value="project.link"
						:append-inner-icon="mdiContentCopy"
						@click:append-inner="copyLink"
					/>
					<VDivider class="my-8" />
					<VRow class="mb-5">
						<VCol>
							<VBtn
								:icon="mdiPinterest"
								:color="!disabled && socialMedia === 'pinterest' ? 'primary' : ''"
								:disabled="disabled"
								@click="socialMedia = 'pinterest'"
							/>
						</VCol>
						<VCol>
							<VBtn
								:icon="mdiInstagram"
								:color="!disabled && socialMedia === 'instagram' ? 'primary' : ''"
								:disabled="disabled"
								@click="socialMedia = 'instagram'"
							/>
						</VCol>
						<VCol>
							<VBtn
								:icon="mdiFacebook"
								:color="!disabled && socialMedia === 'facebook' ? 'primary' : ''"
								:disabled="disabled"
								@click="socialMedia = 'facebook'"
							/>
						</VCol>
						<VCol>
							<VBtn
								:icon="mdiTwitter"
								:color="!disabled && socialMedia === 'x' ? 'primary' : ''"
								:disabled="disabled"
								@click="socialMedia = 'x'"
							/>
						</VCol>
						<VCol>
							<VBtn
								:icon="mdiLinkedin"
								:color="!disabled && socialMedia === 'linkedin' ? 'primary' : ''"
								:disabled="disabled"
								@click="socialMedia = 'linkedin'"
							/>
						</VCol>
					</VRow>
					<VTextField label="Title" v-model="project.title" :disabled="disabled" />
					<VTextarea
						label="Caption (Description)"
						v-model="project.description"
						:disabled="disabled"
					/>
				</VCol>
			</VRow>
		</VContainer>
		<template v-slot:actions>
			<VBtn :disabled="disabled" @click="shareImage">Share</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
