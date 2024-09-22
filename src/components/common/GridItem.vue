<script setup lang="ts">
import { ref, toRaw, watch } from 'vue';
import { jsonToBlob } from '../../utils/json-to-blob';
import { mdiDotsVertical } from '@mdi/js';
import { util } from 'fabric';
import { THUMBNAIL_MAX_SIZE } from '../../utils/constants';

const properties = defineProps<{
	id?: number;
	label?: string;
	cols: string | number;
	src?: string;
	json?: any;
	actions?: any;
	selectable?: boolean;
}>();
const select = defineModel('select');
const emit = defineEmits(['click']);
const srcFromJson = ref('');
watch(
	() => properties.json,
	(newJson) => {
		if (!newJson) {
			return;
		}
		const multiplier = util.findScaleToFit(
			{
				width: newJson.width,
				height: newJson.height
			},
			{
				width: THUMBNAIL_MAX_SIZE,
				height: THUMBNAIL_MAX_SIZE
			}
		);
		jsonToBlob(
			{
				width: newJson.width,
				height: newJson.height,
				background: newJson.background,
				objects: toRaw(newJson.layers)
			},
			'image/webp',
			0.98,
			multiplier
		).then((blob) => {
			srcFromJson.value = URL.createObjectURL(blob);
		});
	},
	{
		immediate: true
	}
);
</script>

<template>
	<VCol :cols="properties.cols">
		<VCard hover link @click.prevent="emit('click')">
			<VImg
				:class="properties.label ? 'align-end' : ''"
				aspect-ratio="1"
				color="blue-grey-darken-4"
				:src="properties.src || srcFromJson"
			>
				<VCardSubtitle v-if="properties.label" class="mb-2">
					{{ properties.label }}
				</VCardSubtitle>
			</VImg>
			<VRow class="actions" no-gutters justify="space-between" align="center">
				<VCol cols="auto" @click.stop>
					<VCheckbox
						v-if="properties.selectable"
						:value="properties.id"
						v-model="select"
					/>
				</VCol>
				<VCol cols="auto" @click.stop>
					<VMenu v-if="properties.actions" max-width="200">
						<template v-slot:activator="{ props }">
							<VBtn
								:icon="mdiDotsVertical"
								:class="['mr-2', { 'mt-3': !properties.selectable }]"
								density="comfortable"
								size="small"
								v-bind="props"
							/>
						</template>
						<VList density="compact">
							<VListItem
								v-for="(action, i) of properties.actions"
								:key="i"
								v-bind="action"
								density="compact"
								@click="action.onClick"
							>
								<VListItemTitle>
									{{ action.label }}
								</VListItemTitle>
							</VListItem>
						</VList>
					</VMenu>
				</VCol>
			</VRow>
		</VCard>
	</VCol>
</template>

<style scoped lang="scss">
.actions {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
}
</style>
