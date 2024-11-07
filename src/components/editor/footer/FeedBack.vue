<script setup lang="ts">
import { mdiMessageText } from '@mdi/js';
import { computed, ref } from 'vue';
import axios from '../../../axios';
import { useNotice } from '../../../store';

const notice = useNotice();
const open = ref(false);
const loading = ref(false);
const rating = ref(0);
const message = ref('');
const disabled = computed(() => !rating.value || message.value.length > 500);
const send = () => {
	loading.value = true;
	axios
		.post('message/feedback', {
			rating: rating.value,
			message: message.value
		})
		.then(({ data }) => {
			loading.value = false;
			open.value = false;
			notice.send(data.message, 'success');
		})
		.catch((error) => {
			loading.value = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		});
};
</script>

<template>
	<VMenu persistent :close-on-content-click="false" v-model="open">
		<template v-slot:activator="{ props }">
			<VBtn :icon="mdiMessageText" v-tooltip:top="'Feedback'" v-bind="props" />
		</template>
		<VCard>
			<VCardItem>
				<VRating v-model="rating" />
				<VTextarea
					label="Message"
					class="mb-2"
					:counter="500"
					persistent-counter
					no-resize
					v-model="message"
				/>
				<VBtn block :disabled="disabled" :loading="loading" @click="send">Send</VBtn>
			</VCardItem>
		</VCard>
	</VMenu>
</template>

<style scoped lang="scss"></style>
