<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('transform');
</script>

<template>
	<VTabs v-model="tab">
		<VTab value="transform" v-tooltip:top="'Transform'">
			<VIcon icon="mdi-tune" />
		</VTab>
		<VTab value="qrcode" v-tooltip:top="'QR Code'">
			<VIcon icon="mdi-qrcode-edit" />
		</VTab>
		<VTab value="background" v-tooltip:top="'Background'">
			<VIcon icon="mdi-format-color-fill" />
		</VTab>
		<VTab value="image" v-tooltip:top="'Logo'">
			<VIcon icon="mdi-image" />
		</VTab>
		<VTab value="dots" v-tooltip:top="'Dots'">
			<VIcon icon="mdi-dots-grid" />
		</VTab>
		<VTab value="corners" v-tooltip:top="'Corners'">
			<VIcon icon="mdi-border-none-variant" />
		</VTab>
		<VTab value="shadow" v-tooltip:top="'Shadow'">
			<VIcon icon="mdi-box-shadow" />
		</VTab>
		<VTab value="compositing" v-tooltip:top="'Compositing'">
			<VIcon icon="mdi-water-opacity" />
		</VTab>
	</VTabs>
	<TabItem>
		<RightSideBarTabTransformSettings v-if="tab === 'transform'" />
		<RightSideBarTabQRCodeSettings v-else-if="tab === 'qrcode'" />
		<RightSideBarTabQRCodeBGSettings v-else-if="tab === 'background'" />
		<RightSideBarTabQRCodeImageSettings v-else-if="tab === 'image'" />
		<RightSideBarTabQRCodeDotsSettings v-else-if="tab === 'dots'" />
		<RightSideBarTabQRCodeCornerSettings v-else-if="tab === 'corners'" />
		<RightSideBarTabShadowSettings v-else-if="tab === 'shadow'" />
		<RightSideBarTabCompositingSettings v-else-if="tab === 'compositing'" />
	</TabItem>
</template>

<style scoped lang="scss"></style>
