<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useProject } from '../../../store';
import sizePresets from './../../../utils/size-presets';
import useFitToScreen from '../../../hooks/fittoscreen';
import { ref } from 'vue';

const router = useRouter();
const project = useProject();
const width = ref(1280);
const height = ref(720);
const fitToScreen = useFitToScreen();
const setSize = ({ width, height }) => {
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
const setCustomSize = () => {
	setSize({
		width: width.value,
		height: height.value
	});
};
</script>

<template>
	<VContainer class="wrapper">
		<VRow>
			<VCol class="sidebar" cols="auto">
				<p class="mb-2">Custom Size</p>
				<InputGroup>
					<VTextField
						type="number"
						label="Width"
						flat
						variant="underlined"
						v-model="width"
					/>
					<VTextField
						type="number"
						label="Height"
						flat
						variant="underlined"
						v-model="height"
					/>
				</InputGroup>
				<VBtn block @click="setCustomSize">Create Canvas</VBtn>
			</VCol>
			<VCol>
				<LibraryWrapper>
					<LibraryItems :items-length="1" :count="24" :cols="2">
						<GridItem
							v-for="(item, i) of sizePresets"
							:key="i"
							:label="item.label"
							cols="2"
							:json="{
								width: item.width,
								height: item.height,
								background: '#888'
							}"
							@click="setSize(item)"
						/>
					</LibraryItems>
				</LibraryWrapper>
			</VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss">
.wrapper {
	height: 90vh;
}
.v-row {
	height: 100%;
	.v-col {
		height: 100%;
	}
}
.sidebar {
	width: 256px;
}
</style>
