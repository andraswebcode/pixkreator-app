<script setup lang="ts">
import { useUser } from '../../../store';

const userData = useUser();
</script>

<template>
	<LoginNotice v-if="!userData.loggedIn" />
</template>

<style scoped lang="scss"></style>
