<script setup lang="ts">
import { ref } from 'vue';
import useRequest from '../../hooks/request';
import { debounce } from '../../utils/functions';
import { useNotice, useUser } from '../../store';
import { PATCH_DEBOUNCE_TIMEOUT } from '../../utils/constants';

const { save } = useRequest();
const notice = useNotice();
const userData = useUser();
const sub_news = ref(userData.user.sub_news || 'yes');
const stai_key = ref('');
const openai_key = ref('');
const loading = ref({
	sub_news: false,
	stai_key: false,
	openai_key: false
});
const updateSetting = debounce((key, value) => {
	save(
		'',
		'usermeta',
		{
			key,
			value
		},
		({ meta_key, meta_value, openai_credits, stai_credits }) => {
			loading.value[key] = false;
			if (typeof stai_credits !== 'undefined') {
				notice.send(
					`API key updated successfully. You have ${stai_credits} credits.`,
					'success'
				);
				userData.setAndSave('stai_credits', stai_credits);
			} else if (typeof openai_credits !== 'undefined') {
				notice.send(
					`API key updated successfully. You have ${openai_credits} credits.`,
					'success'
				);
				userData.setAndSave('openai_credits', openai_credits);
			} else {
				notice.send('Setting updated successfully.', 'success');
				userData.setAndSave(meta_key, meta_value);
			}
		},
		(error) => {
			loading.value[key] = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		}
	);
}, PATCH_DEBOUNCE_TIMEOUT);
</script>

<template>
	<VCard>
		<VCardItem>
			<VSwitch
				label="Subscribe to Newsletter"
				true-value="yes"
				false-value="no"
				:loading="loading.sub_news"
				v-model="sub_news"
				@update:model-value="
					loading.sub_news = true;
					updateSetting('sub_news', $event);
				"
			/>
			<VTextField
				label="Stability AI API Key"
				:loading="loading.stai_key"
				v-model="stai_key"
				@update:model-value="
					loading.stai_key = true;
					updateSetting('stai_key', $event);
				"
			/>
			<VTextField
				label="Open AI API Key"
				:loading="loading.openai_key"
				v-model="openai_key"
				@update:model-value="
					loading.openai_key = true;
					updateSetting('openai_key', $event);
				"
			/>
		</VCardItem>
	</VCard>
</template>

<style scoped lang="scss"></style>
