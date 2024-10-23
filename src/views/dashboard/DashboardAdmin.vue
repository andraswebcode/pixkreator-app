<script setup lang="ts">
import { ref } from 'vue';
import useRequest from './../../hooks/request';
import { useNotice } from './../../store';

const { save } = useRequest();
const notice = useNotice();
const assets = ref('');
const loading = ref(false);

const saveAssets = () => {
	let data = null;

	try {
		data = JSON.parse(assets.value);
	} catch (e) {
		//
	}

	if (!data) {
		notice.send('JSON is not valid.', 'error');
		return;
	}

	loading.value = true;

	save(
		'',
		'assets',
		data,
		(response) => {
			console.log(response);
			loading.value = false;
			notice.send(`${response.count} assets added successfully.`, 'success');
		},
		(error) => {
			console.warn(error);
			loading.value = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		}
	);
};
</script>

<template>
	<VCard>
		<VCardItem>
			<VTextarea label="Asset JSON" v-model="assets" />
			<VBtn @click="saveAssets" :loading="loading">Save</VBtn>
		</VCardItem>
	</VCard>
</template>

<style scoped lang="scss"></style>
