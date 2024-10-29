<script setup lang="ts">
import { ref } from 'vue';

const newsletter = ref(true);
const staikey = ref('');
</script>

<template>
	<VCard>
		<VCardItem>
			<VSwitch label="Subscribe to Newsletter" v-model="newsletter" />
			<VTextField label="Stability AI API Key" v-model="staikey" />
		</VCardItem>
	</VCard>
</template>

<style scoped lang="scss"></style>
