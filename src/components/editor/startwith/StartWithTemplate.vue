<script setup lang="ts">
import { ref } from 'vue';
import templateCategories from '../../../utils/template-categories';
import { DETAILS_DIALOG_WIDTH } from '../../../utils/constants';

const showDetails = ref(false);
const openDetails = (item: any) => {
	showDetails.value = true;
};
</script>

<template>
	<VContainer>
		<VRow>
			<VCol class="sidebar" cols="auto">
				<SearchInput label="Search Templates" />
				<VList>
					<VListItem link>
						<VListItemTitle>Editor's Choice</VListItemTitle>
					</VListItem>
					<VListItem link>
						<VListItemTitle>All Templates</VListItemTitle>
					</VListItem>
					<VDivider />
					<VListItem v-for="cat of templateCategories" link>
						<VListItemTitle>{{ cat.label }}</VListItemTitle>
					</VListItem>
				</VList>
			</VCol>
			<VCol class="overflow-x-hidden overflow-y-auto">
				<VRow>
					<GridItem v-for="i of 24" :key="i" cols="2" @click="openDetails({})" />
				</VRow>
			</VCol>
		</VRow>
	</VContainer>
	<PersistentHeaderDialog
		v-model="showDetails"
		@close="showDetails = false"
		:max-width="DETAILS_DIALOG_WIDTH"
	>
		<DetailsCarousel>
			<VCarouselItem v-for="i of 12" :key="i">
				<TemplateDetails />
			</VCarouselItem>
		</DetailsCarousel>
		<template v-slot:actions>
			<VBtn>Customize This Template</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss">
.sidebar {
	width: 256px;
}
</style>
