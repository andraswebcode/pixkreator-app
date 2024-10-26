<script setup lang="ts">
import { mdiCheck, mdiClose, mdiPencil } from '@mdi/js';
import { ref } from 'vue';
import { useNotice, useUser } from '../../store';
import useRequest from '../../hooks/request';

const userData = useUser();
const notice = useNotice();
const { save } = useRequest();
const staiRef = ref<any>(null);
const fields = ref({
	stai_key: '',
	edit_stai_key: false,
	loading_stai_key: false
});
const edit = (field: string) => {
	fields.value['edit_' + field] = true;
	setTimeout(() => {
		if (field === 'stai_key') {
			staiRef.value?.$el.querySelector('input')?.focus();
		}
	}, 40);
};
const done = (field: string) => {
	fields.value['loading_' + field] = true;
	save(
		'',
		'usermeta',
		{
			key: field,
			value: fields.value[field]
		},
		(
			{
				/* meta_value */
			}
		) => {
			// userData.user.has_stai_key = !!meta_value;
			fields.value['edit_' + field] = false;
			fields.value['loading_' + field] = false;
			notice.send('Field: Stability AI API Key updated successfully.', 'success');
		},
		(error) => {
			fields.value['loading_' + field] = false;
			notice.send(error.response?.data.message || error.message, 'error');
		}
	);
};
const cancel = (field: string) => {
	fields.value['edit_' + field] = false;
	fields.value[field] = userData.user[field];
};
</script>

<template>
	<VCard>
		<VCardItem>
			<VTextField
				v-if="fields.edit_stai_key"
				ref="staiRef"
				label="Stability AI API Key"
				v-model="fields.stai_key"
				:loading="fields.loading_stai_key"
			>
				<template v-slot:append-inner>
					<VIcon :icon="mdiCheck" @click="done('stai_key')" />
					<VIcon :icon="mdiClose" @click="cancel('stai_key')" />
				</template>
			</VTextField>
			<VTextField
				v-else
				label="Stability AI API Key"
				readonly
				model-value="********"
				:append-inner-icon="mdiPencil"
				@click:append-inner="edit('stai_key')"
			/>
		</VCardItem>
	</VCard>
</template>

<style scoped lang="scss"></style>
