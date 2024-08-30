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
import { debounce } from '../../../utils/functions';

const TEXTS_MAP = {
	title: 'Title',
	description: 'Caption'
};
const route = useRoute();
const router = useRouter();
const editor = useEditor();
const project = useProject();
const { save, patch, updateFile } = useRequest();
const notice = useNotice();
const blob = ref<Blob>();
const src = ref('');
const loading = ref(false);
const loadingTextField = ref<'title' | 'description' | false>(false);
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
				},
				(error) => {
					notice.send(error.response?.data?.message || error.message, 'error');
					loading.value = false;
				}
			);
		}
	} else {
		const data = new FormData();
		const then = (response) => {
			if (id) {
				patch(
					id as string,
					'designs',
					{
						status: 'public',
						upload_id: response.id
					},
					({ link, status, upload_id }) => {
						project.$patch({ link, status, upload_id });
						loading.value = false;
					},
					(error) => {
						notice.send(error.response?.data?.message || error.message, 'error');
						loading.value = false;
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
						upload_id: response.id,
						width,
						height,
						background,
						layers: toRaw(byIds),
						layer_ids: toRaw(ids)
					},
					({ id, link, status, upload_id }) => {
						router.push({
							params: { id }
						});
						project.$patch({ link, status, upload_id });
						loading.value = false;
					},
					(error) => {
						notice.send(error.response?.data?.message || error.message, 'error');
						loading.value = false;
					}
				);
			}
		};
		const catchFn = (error) => {
			notice.send(error.response?.data?.message || error.message, 'error');
			loading.value = false;
		};

		data.append('file', blob.value as Blob);

		if (project.upload_id) {
			updateFile(project.upload_id as any, data, then, catchFn);
		} else {
			data.append('source', 'design');
			save('', 'uploads', data, then, catchFn);
		}
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
const saveTexts = debounce((prop: 'title' | 'description') => {
	const data = new FormData();
	const { id } = route.params;

	data.append('file', blob.value as Blob);

	loadingTextField.value = prop;

	updateFile(
		project.upload_id as any,
		data,
		() => {
			if (id) {
				patch(
					id as string,
					'designs',
					{
						[prop]: project[prop],
						status: 'public'
					},
					() => {
						loadingTextField.value = false;
						notice.send(TEXTS_MAP[prop] + ' updated succesfully.', 'success');
					},
					(error) => {
						notice.send(error.response?.data?.message || error.message, 'error');
						loadingTextField.value = false;
					}
				);
			}
		},
		(error) => {
			notice.send(error.response?.data?.message || error.message, 'error');
			loadingTextField.value = false;
		}
	);
}, 800);
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
			0.98
		)
			.then((response) => {
				blob.value = response;
				src.value = URL.createObjectURL(response);
			})
			.catch(() => {
				notice.send('Can not create image file.', 'error');
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
					<VTextField
						label="Title"
						v-model="project.title"
						:disabled="disabled"
						:loading="loadingTextField === 'title'"
						@update:model-value="saveTexts('title')"
					/>
					<VTextarea
						label="Caption (Description)"
						v-model="project.description"
						:disabled="disabled"
						:loading="loadingTextField === 'description'"
						@update:model-value="saveTexts('description')"
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
