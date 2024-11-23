<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import { onMounted, ref } from 'vue';
import useRequest from '../../../hooks/request';

const { list, save } = useRequest();
const title = ref('');
const content = ref('');
const slug = ref('');
const category = ref('');
const image = ref('');
const excerpt = ref('');
const metaDesc = ref('');
const edit = ref(false);
const items = ref<any[]>([]);
const id = ref(0);
const html = ref(false);
const options = {
	modules: {
		toolbar: [{ header: [2, 3, false] }, 'bold', 'italic', 'underline', 'link']
	}
};
const editArticle = (_id: number) => {
	edit.value = true;
	id.value = _id;
};
const saveArticle = () => {
	save(
		id.value as any,
		'admin/blogs',
		{
			title: title.value,
			content: content.value,
			slug: slug.value,
			category: category.value,
			image: image.value,
			excerpt: excerpt.value,
			meta_description: metaDesc.value
		},
		(data) => {
			console.log(data);
			edit.value = false;
		}
	);
};
const filter = () => {
	list({}, 'blogs', (data) => {
		items.value = data.items;
	});
};

onMounted(filter);
</script>

<template>
	<div v-if="edit" class="editor">
		<VTextField label="Title" v-model="title" />
		<VTextField label="Slug" v-model="slug" />
		<VSwitch label="Edit HTML" v-model="html" />
		<VTextarea v-if="html" v-model="content" />
		<QuillEditor v-else content-type="html" v-model:content="content" :options="options" />
		<VTextField label="Category" v-model="category" />
		<VTextField label="Image" v-model="image" />
		<VTextarea label="Excerpt" v-model="excerpt" />
		<VTextarea label="Meta Description" v-model="metaDesc" />
		<VBtn @click="saveArticle">Save</VBtn>
		<VBtn @click="edit = false">Back</VBtn>
	</div>
	<div v-else>
		<VBtn class="mb-4" @click="edit = true">Add New</VBtn>
		<VRow>
			<VCol v-for="item in items" :key="item.id" cols="4">
				<VCard class="mb-4">
					<VCardTitle>{{ item.title }}</VCardTitle>
					<VCardActions>
						<VBtn @click="editArticle(item.id)">Edit</VBtn>
					</VCardActions>
				</VCard>
			</VCol>
		</VRow>
	</div>
</template>

<style scoped lang="scss">
.editor {
	overflow: auto;
}
</style>
