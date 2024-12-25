<script setup lang="ts">
import { useNotice, useProject, useUser } from '../../../store';
import { parseSVG } from '../../../utils/parse-svg';

const userData = useUser();
const notice = useNotice();
const project = useProject();
const addImage = ({ image, mime_type }) => {
	if (mime_type === 'image/svg+xml') {
		parseSVG(image).then(({ layers, group }) => {
			if (layers.length === 0) {
				notice.send('SVG parse failed.', 'error');
			} else if (layers.length === 1) {
				project.addLayer(layers[0]);
			} else {
				project.addLayer(group);
			}
		});
	} else {
		project.addLayer({
			type: 'image',
			src: image,
			left: project.width / 2,
			top: project.height / 2
		});
	}
};
</script>

<template>
	<VerifyEmailAlert v-if="!userData.user.email_verified" class="mx-3 mt-3" />
	<LibraryWrapper v-else>
		<div class="pa-4">
			<FileUploader @add="addImage" />
		</div>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
