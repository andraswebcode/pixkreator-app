<script setup lang="ts">
import { ref } from 'vue';
import axios from '../../axios';
import { useNotice } from '../../store';

const notice = useNotice();
const subject = ref('');
const message = ref('');
const loading = ref(false);
const isValid = ref(false);
const rules = [(value) => !!value || 'This field is required.'];
const send = () => {
	loading.value = true;
	axios
		.post('message/support')
		.then(({ data }) => {
			loading.value = false;
			notice.send(data.message, 'success');
		})
		.catch((error) => {
			loading.value = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		});
};
</script>

<template>
	<VCard>
		<VCardItem>
			<VCardTitle>Contact us</VCardTitle>
			<VCardSubtitle>
				If you have any questions or issues regarding the app, please fill out the form
				below. We'll get back to you soon!
			</VCardSubtitle>
		</VCardItem>
		<VDivider class="mb-5" />
		<VForm v-model="isValid" @submit.prevent="send">
			<VCardItem>
				<VTextField
					label="Subject"
					:rules="rules"
					:hide-details="false"
					v-model="subject"
				/>
				<VTextarea label="Message" :rules="rules" :hide-details="false" v-model="message" />
			</VCardItem>
			<VCardActions>
				<VBtn type="submit" :disabled="!isValid" :loading="loading">Send</VBtn>
			</VCardActions>
		</VForm>
	</VCard>
</template>

<style scoped lang="scss"></style>
