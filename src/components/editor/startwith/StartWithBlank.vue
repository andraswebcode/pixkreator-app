<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useProject } from '../../../store';
import templateCategories from './../../../utils/template-categories';
import useFitToScreen from '../../../hooks/fittoscreen';
import { SMALL_DIALOG_WIDTH } from '../../../utils/constants';
import { ref } from 'vue';

const router = useRouter();
const project = useProject();
const width = ref(1280);
const height = ref(720);
const showCustomSize = ref(false);
const fitToScreen = useFitToScreen();
const setSize = ({ width, height }) => {
	localStorage.removeItem('design');
	router
		.replace({
			query: {},
			params: {
				id: ''
			}
		})
		.then(() => {
			project.$patch({
				width,
				height
			});
			fitToScreen();
		});
};
const openCustomSize = () => {
	showCustomSize.value = true;
};
const setCustomSize = () => {
	setSize({
		width: width.value,
		height: height.value
	});
};
</script>

<template>
	<LibraryWrapper>
		<LibraryItems :items-length="1" :count="24" :cols="2" responsive>
			<GridItem label="Custom" @click="openCustomSize" />
			<GridItem
				v-for="(item, i) of templateCategories"
				:key="i"
				:label="item.label"
				cols="2"
				responsive
				:json="{
					width: item.width,
					height: item.height,
					background: '#888'
				}"
				@click="setSize(item)"
			/>
		</LibraryItems>
	</LibraryWrapper>
	<PersistentHeaderDialog
		v-model="showCustomSize"
		@close="showCustomSize = false"
		:max-width="SMALL_DIALOG_WIDTH"
		auto-height
	>
		<InputGroup>
			<VTextField type="number" label="Width" flat variant="underlined" v-model="width" />
			<VTextField type="number" label="Height" flat variant="underlined" v-model="height" />
		</InputGroup>
		<template v-slot:actions>
			<VBtn @click="setCustomSize">Create Canvas</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss">
.library-wrapper {
	height: calc(90vh - 30px);
}
</style>
