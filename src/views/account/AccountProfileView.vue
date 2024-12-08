<script setup lang="ts">
import { ref } from 'vue';
import { useNotice, useUser } from '../../store';
import useRequest from '../../hooks/request';

type TField = 'name' | 'password';

const userData = useUser();
const notice = useNotice();
const { patch } = useRequest();
const nameRef = ref<any>(null);
const pwRef = ref<any>(null);
const fields = ref({
	name: userData.user.name,
	password: '',
	edit_name: false,
	edit_password: false,
	loading_name: false,
	loading_password: false,
	confirm_password_name: '',
	confirm_password_password: ''
});
const edit = (field: TField) => {
	fields.value['edit_' + field] = true;
	fields.value['confirm_password_' + field] = '';
	setTimeout(() => {
		if (field === 'name') {
			nameRef.value?.$el.querySelector('input')?.focus();
		} else {
			pwRef.value?.$el.querySelector('input')?.focus();
		}
	}, 40);
};
const done = (field: TField) => {
	fields.value['loading_' + field] = true;
	patch(
		userData.user.id as any,
		'users',
		{
			[field]: fields.value[field],
			confirm_password: fields.value['confirm_password_' + field]
		},
		(user) => {
			if (field !== 'password') {
				userData.user[field] = user[field];
			}
			localStorage.setItem('userData', JSON.stringify(userData.user));
			fields.value['edit_' + field] = false;
			fields.value['loading_' + field] = false;
			notice.send('Field: ' + field + ' updated successfully.', 'success');
		},
		(error) => {
			console.warn(error);
			fields.value['loading_' + field] = false;
			notice.send(error.response?.data.message || error.message, 'error');
		}
	);
};
const cancel = (field: TField) => {
	fields.value['edit_' + field] = false;
	fields.value[field] = userData.user[field];
};
</script>

<template>
	<VCard>
		<VCardItem>
			<VTextField label="Email" :model-value="userData.user.email" disabled />
			<InputGroup v-if="fields.edit_name" ref="nameRef">
				<VTextField label="Name" v-model="fields.name" :loading="fields.loading_name" />
				<VTextField
					type="password"
					label="Confirm Password"
					autocomplete="new-password"
					v-model="fields.confirm_password_name"
				>
					<template v-slot:append-inner>
						<VIcon icon="mdi-check" @click="done('name')" />
						<VIcon icon="mdi-close" @click="cancel('name')" />
					</template>
				</VTextField>
			</InputGroup>
			<VTextField
				v-else
				label="Name"
				readonly
				:model-value="fields.name"
				append-inner-icon="mdi-pencil"
				@click:append-inner="edit('name')"
			/>
			<InputGroup v-if="fields.edit_password" ref="pwRef">
				<VTextField
					type="password"
					label="Password"
					autocomplete="new-password"
					v-model="fields.password"
					:loading="fields.loading_password"
				/>
				<VTextField
					type="password"
					label="Confirm Password"
					autocomplete="new-password"
					v-model="fields.confirm_password_password"
				>
					<template v-slot:append-inner>
						<VIcon icon="mdi-check" @click="done('password')" />
						<VIcon icon="mdi-close" @click="cancel('password')" />
					</template>
				</VTextField>
			</InputGroup>
			<VTextField
				v-else
				label="Password"
				readonly
				model-value="********"
				append-inner-icon="mdi-pencil"
				@click:append-inner="edit('password')"
			/>
			<VDivider class="mb-5" />
			<VRow justify="space-between" align="center">
				<VCol>
					<VCard flat>
						<VCardTitle>Delete Account</VCardTitle>
						<VCardSubtitle>
							Please note that once you delete your account, there is no going back!
						</VCardSubtitle>
					</VCard>
				</VCol>
				<VCol cols="auto">
					<VBtn to="deleteuser" prepend-icon="mdi-account-remove"> Delete Account </VBtn>
				</VCol>
			</VRow>
		</VCardItem>
	</VCard>
</template>

<style scoped lang="scss"></style>
