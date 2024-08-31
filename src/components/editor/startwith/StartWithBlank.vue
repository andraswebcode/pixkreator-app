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
	<VContainer>
		<VRow>
			<VCol class="sidebar" cols="auto"></VCol>
			<VCol class="overflow-x-hidden overflow-y-auto">
				<VRow>
					<GridItem
						v-for="(item, i) of sizePresets"
						:key="i"
						cols="2"
						:json="{
							width: item.width,
							height: item.height,
							background: '#888'
						}"
						@click="setSize(item)"
					/>
				</VRow>
			</VCol>
		</VRow>
	</VContainer>
</template>

<style scoped lang="scss">
.sidebar {
	width: 256px;
}
</style>
