<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useProject } from '../../../store';
import sizePresets from './../../../utils/size-presets';
import useFitToScreen from '../../../hooks/fittoscreen';

const router = useRouter();
const project = useProject();
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
</script>

<template>
	<VContainer class="wrapper">
		<VRow>
			<VCol class="sidebar" cols="auto"></VCol>
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
