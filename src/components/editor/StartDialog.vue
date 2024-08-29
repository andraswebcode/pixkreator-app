<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEditor } from '../../store';

const route = useRoute();
const router = useRouter();
const editor = useEditor();
const startWith = computed(() => {
	const start = route.query.start as string;
	const labelMap = {
		blank: 'a Blank Canvas',
		template: 'a Template',
		photo: 'a Photo'
	};
	return labelMap[start];
});
const close = () => {
	editor.openStartDialog = false;
	router.replace({ query: {} });
};

onMounted(() => {
	if (route.query.start) {
		editor.openStartDialog = true;
	}
});
</script>

<template>
	<PersistentHeaderDialog
		:title="`Start With ${startWith}`"
		v-model="editor.openStartDialog"
		@close="close"
	>
		<StartWithBlank v-if="route.query.start === 'blank'" />
		<StartWithTemplate v-else-if="route.query.start === 'template'" />
		<StartWithPhoto v-else-if="route.query.start === 'photo'" />
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
