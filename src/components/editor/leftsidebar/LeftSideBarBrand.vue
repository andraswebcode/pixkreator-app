<script setup lang="ts">
import { ref } from 'vue';
import { useNotice, useUser } from '../../../store';
import { PATCH_DEBOUNCE_TIMEOUT } from '../../../utils/constants';
import { debounce } from '../../../utils/functions';
import useRequest from '../../../hooks/request';

const userData = useUser();
const notice = useNotice();
const tab = ref('intro');
const loading = ref(false);
const { save } = useRequest();
const saveBrandValue = debounce((key: string, value: any) => {
	save(
		'',
		'usermeta',
		{
			key,
			value
		},
		({ meta_key, meta_value }) => {
			notice.send('Setting updated successfully.', 'success');
			userData.setAndSave(
				meta_key,
				meta_key === 'brand_colors' ? JSON.parse(meta_value) : meta_value
			);
			loading.value = false;
		},
		(error) => {
			notice.send(error.response?.data?.message || error.message, 'error');
			loading.value = false;
		}
	);
}, PATCH_DEBOUNCE_TIMEOUT);
const addColor = () => {
	const colors = (userData.user.brand_colors || []).concat([
		{
			name: '',
			color: '#000000'
		}
	]);
	saveBrandValue('brand_colors', JSON.stringify(colors));
};
const updateColor = (index: number, key: string, value: any) => {
	const colors = (userData.user.brand_colors || []).concat();
	colors[index] = {
		...colors[index],
		[key]: value
	};
	saveBrandValue('brand_colors', JSON.stringify(colors));
};
const removeColor = (index: number) => {
	const colors = (userData.user.brand_colors || []).filter((_, _index) => _index !== index);
	saveBrandValue('brand_colors', JSON.stringify(colors));
};
</script>

<template>
	<VTabs v-model="tab">
		<VTab value="intro" v-tooltip:top="'Introduction'">
			<VIcon icon="mdi-account-tie" />
		</VTab>
		<VTab value="colors" v-tooltip:top="'Colors'">
			<VIcon icon="mdi-palette" />
		</VTab>
		<VTab value="logo" v-tooltip:top="'Logo'">
			<VIcon icon="mdi-alpha-l-box" />
		</VTab>
		<VTab value="fonts" v-tooltip:top="'Fonts'">
			<VIcon icon="mdi-format-font" />
		</VTab>
	</VTabs>
	<TabItem v-if="tab === 'intro'" class="pa-4">
		<VTextarea
			label="Introduction"
			v-model="userData.user.brand_introduction"
			:loading="loading"
			@update:model-value="
				loading = true;
				saveBrandValue('brand_introduction', $event);
			"
		/>
	</TabItem>
	<TabItem v-if="tab === 'colors'" class="pa-4">
		<InputGroup v-for="(object, i) in userData.user.brand_colors" :key="i">
			<VTextField
				label="Name"
				v-model="object.name"
				@update:model-value="updateColor(i, 'name', $event)"
			/>
			<ColorPicker
				label="Color"
				hide-brand
				v-model="object.color"
				@update:model-value="updateColor(i, 'color', $event)"
			/>
			<VBtn icon="mdi-trash-can" size="x-small" @click="removeColor(i)" />
		</InputGroup>
		<VBtn block @click="addColor">Add Color</VBtn>
	</TabItem>
	<TabItem v-if="tab === 'logo'" class="pa-4"></TabItem>
	<TabItem v-if="tab === 'fonts'" class="pa-4"></TabItem>
</template>

<style scoped lang="scss"></style>
