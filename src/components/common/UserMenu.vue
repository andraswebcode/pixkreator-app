<script setup>
import { useUser } from '../../store';
import { useRouter } from 'vue-router';
import axios from '../../axios';

const userData = useUser();
const router = useRouter();
const logout = () => {
	axios
		.post(
			'logout',
			{},
			{
				headers: {
					Authorization: userData.bearerToken
				}
			}
		)
		.then(({ data }) => {
			userData.user = {};
			localStorage.removeItem('userData');
			router.push('/login');
		})
		.catch((error) => {
			userData.user = {};
			localStorage.removeItem('userData');
			router.push('/login');
		});
};
</script>

<template>
	<VBtn v-if="userData.loggedIn" id="user-menu" icon="mdi-account" />
	<VBtn v-else icon="mdi-login" to="/login" v-tooltip="'Login'" />
	<VMenu v-if="userData.loggedIn" activator="#user-menu">
		<VList>
			<VListItem class="mb-2">
				<template v-slot:prepend>
					<VAvatar>
						<VImg v-if="userData.user.avatar" :src="userData.user.avatar" />
						<VIcon v-else icon="mdi-account" />
					</VAvatar>
				</template>
				<VListItemTitle>{{ userData.user.name }}</VListItemTitle>
				<VListItemSubtitle>{{ userData.user.email }}</VListItemSubtitle>
			</VListItem>
			<VDivider :vertical="false" />
			<VerifyEmailAlert v-if="!userData.user.email_verified" class="ma-5" />
			<VDivider v-if="!userData.user.email_verified" :vertical="false" />
			<VListItem to="/">
				<template v-slot:prepend>
					<VIcon icon="mdi-draw" />
				</template>
				<VListItemTitle>Editor</VListItemTitle>
			</VListItem>
			<VListItem to="/dashboard">
				<template v-slot:prepend>
					<VIcon icon="mdi-view-dashboard" />
				</template>
				<VListItemTitle>Dashboard</VListItemTitle>
			</VListItem>
			<VListItem to="/account">
				<template v-slot:prepend>
					<VIcon icon="mdi-account-cog" />
				</template>
				<VListItemTitle>Account</VListItemTitle>
			</VListItem>

			<VListItem href="#" @click="logout">
				<template v-slot:prepend>
					<VIcon icon="mdi-logout" />
				</template>
				<VListItemTitle>Logout</VListItemTitle>
			</VListItem>
		</VList>
	</VMenu>
</template>

<style scoped>
.v-list {
	min-width: 256px;
	max-width: 356px;
}
.v-divider {
	max-width: 100%;
}
</style>
