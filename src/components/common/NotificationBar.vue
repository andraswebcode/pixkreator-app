<script setup lang="ts">
import { useNotice } from '../../store';

const notice = useNotice();
</script>

<template>
	<VSnackbar v-model="notice.show" :color="notice.type" :timeout="5000" timer>
		{{ notice.message }}
	</VSnackbar>
</template>

<style scoped lang="scss"></style>
