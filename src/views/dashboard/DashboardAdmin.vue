<script setup lang="ts">
import { ref, toRaw } from 'vue';
import useRequest from '../../hooks/request';
import { uploadFile } from '../../utils/upload-file';
import { loadSVGFromString } from 'fabric';
import { toFixed } from '../../utils/functions';
import graphicCategories from '../../utils/graphic-categories';
import graphicStyles from '../../utils/graphic-styles';
import { useNotice } from '../../store';

const { save } = useRequest();
const notice = useNotice();
const items = ref<any>([]);
const loading = ref(false);
const props = [
	'type',
	'left',
	'top',
	'scaleX',
	'scaleY',
	'angle',
	'originX',
	'originY',
	'fill',
	'stroke',
	'strokeWidth',
	'width',
	'height',
	'radius',
	'path',
	'points'
];
const parseFiles = () => {
	uploadFile('image/svg+xml', true).then((files) => {
		if (!files) {
			return;
		}

		const promises: Promise<any>[] = Array.from(files).map((file) => {
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsText(file);
				reader.onload = () => {
					loadSVGFromString(reader.result as string, (_el, obj) => {
						// @ts-ignore
						const path = obj.path?.map((p) =>
							p.map((c) => (typeof c === 'number' ? toFixed(c) : c))
						);
						obj.set({
							path,
							left: toFixed(obj.left),
							top: toFixed(obj.top),
							width: toFixed(obj.width),
							height: toFixed(obj.height)
							//originX: 'center',
							//originY: 'center'
						});
					}).then(({ objects, options }) => {
						const { width, height } = options;
						resolve({
							category: '',
							style: '',
							keywords: [],
							resource: 'graphic',
							width,
							height,
							data: objects.map((obj) => {
								const layer: any = props.reduce((memo, prop) => {
									// @ts-ignore
									memo[prop] = obj[prop];
									return memo;
								}, {});
								layer.left = layer.left + (layer.width * layer.scaleX) / 2;
								layer.top = layer.top + (layer.height * layer.scaleY) / 2;
								return layer;
							})
						});
					});
				};
			});
		});

		Promise.all(promises).then((response) => {
			console.log(response);
			items.value = response;
		});
	});
};
const saveAssets = () => {
	loading.value = true;
	const graphics = toRaw(items.value).map((item) => ({
		...item,
		keywords: Array.isArray(item.keywords) ? item.keywords : item.keywords.split(', ')
	}));
	save(
		'',
		'assets',
		{
			assets: graphics
		},
		(response) => {
			console.log(response);
			loading.value = false;
			notice.send(`${response.count} assets added successfully.`, 'success');
			items.value = [];
		},
		(error) => {
			loading.value = false;
			notice.send(error.response.data.message || error.message, 'error');
		}
	);
};
</script>

<template>
	<div class="scroll">
		<VCard v-for="item of items">
			<VCardItem>
				<VRow>
					<VCol>
						<GridItem
							:json="{
								width: 800,
								height: 800,
								layers: item.data
							}"
						/>
					</VCol>
					<VCol>
						<VTextarea label="Keywords" v-model="item.keywords" />
					</VCol>
					<VCol>
						<VSelect
							label="Category"
							:items="graphicCategories"
							v-model="item.category"
						/>
						<VSelect label="Style" :items="graphicStyles" v-model="item.style" />
					</VCol>
					<VCol cols="auto">
						<VBtn icon="mdi-close" />
					</VCol>
				</VRow>
			</VCardItem>
		</VCard>
	</div>
	<div>
		<VBtn @click="parseFiles">Upload</VBtn>
		<VBtn @click="saveAssets" :loading="loading">Save</VBtn>
	</div>
</template>

<style scoped lang="scss">
.scroll {
	height: 100%;
	overflow: scroll;
}
</style>
