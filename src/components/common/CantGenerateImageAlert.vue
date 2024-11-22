<script setup lang="ts">
import { PRICING_URL } from '../../utils/constants';

const props = defineProps<{
	class: string;
}>();
</script>

<template>
	<VAlert :class="props.class" type="warning" icon="mdi-alert-circle">
		AI credits for image generation have run out. Please
		<RouterLink to="account/settings" target="_blank">add your own API key</RouterLink>
		or
		<a :href="PRICING_URL" target="_blank">upgrade to a paid plans</a>
		to continue.
	</VAlert>
</template>

<style scoped lang="scss"></style>
