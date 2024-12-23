<script setup lang="ts">
import { useUser } from '../../store';
import { AICreditFeeKey, aiCreditFees } from '../../utils/ai-credits';

const props = defineProps<{
	fee: AICreditFeeKey;
}>();
const userData = useUser();
</script>

<template>
	<VAlert class="mb-5" type="info">
		This action will cost {{ aiCreditFees[props.fee] }} credits. You have
		{{ userData.user.ai_credits }} credits available.
	</VAlert>
</template>

<style scoped lang="scss"></style>
