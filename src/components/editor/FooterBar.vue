<script setup lang="ts">
import { mdiFitToScreen, mdiMagnifyMinus, mdiMagnifyPlus } from '@mdi/js';
</script>

<template>
	<VFooter app height="56px">
		<VContainer>
			<VRow no-gutters justify="center" align="center">
				<VCol cols="auto">
					<VBtn :icon="mdiFitToScreen" />
				</VCol>
				<VCol cols="4">
					<VSlider hide-details>
						<template v-slot:prepend>
							<VBtn :icon="mdiMagnifyMinus" />
						</template>
						<template v-slot:append>
							<VBtn :icon="mdiMagnifyPlus" />
						</template>
					</VSlider>
				</VCol>
			</VRow>
		</VContainer>
	</VFooter>
</template>

<style scoped lang="scss"></style>
