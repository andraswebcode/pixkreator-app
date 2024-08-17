<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const open = ref(false);
const startWith = computed(() => {
	const start = route.query.start;
	const labelMap = {
		blank: 'a Blank Canvas',
		template: 'a Template',
		photo: 'a Photo'
	};
	return labelMap[start];
});
const close = () => {
	open.value = false;
	router.replace({ query: {} });
};

onMounted(() => {
	if (route.query.start) {
		open.value = true;
	}
});
</script>

<template>
	<PersistentHeaderDialog :title="`Start With ${startWith}`" v-model="open" @close="close">
		<StartWithBlank v-if="route.query.start === 'blank'" />
		<StartWithTemplate v-else-if="route.query.start === 'template'" />
		<StartWithPhoto v-else-if="route.query.start === 'photo'" />
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
