<script setup>
import { mdiAccount, mdiAccountCog, mdiDraw, mdiLogin, mdiLogout, mdiViewDashboard } from '@mdi/js';
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
	<VBtn v-if="userData.loggedIn" id="user-menu" :icon="mdiAccount" />
	<VBtn v-else :icon="mdiLogin" to="/login" v-tooltip="'Login'" />
	<VMenu v-if="userData.loggedIn" activator="#user-menu">
		<VList>
			<VListItem class="mb-2">
				<template v-slot:prepend>
					<VAvatar>
						<VImg v-if="userData.user.avatar" :src="userData.user.avatar" />
						<VIcon v-else :icon="mdiAccount" />
					</VAvatar>
				</template>
				<VListItemTitle>{{ userData.user.name }}</VListItemTitle>
				<VListItemSubtitle>{{ userData.user.email }}</VListItemSubtitle>
			</VListItem>
			<VDivider :vertical="false" />
			<VListItem to="/">
				<template v-slot:prepend>
					<VIcon :icon="mdiDraw" />
				</template>
				<VListItemTitle>Editor</VListItemTitle>
			</VListItem>
			<VListItem to="/dashboard">
				<template v-slot:prepend>
					<VIcon :icon="mdiViewDashboard" />
				</template>
				<VListItemTitle>Dashboard</VListItemTitle>
			</VListItem>
			<VListItem to="/account">
				<template v-slot:prepend>
					<VIcon :icon="mdiAccountCog" />
				</template>
				<VListItemTitle>Account</VListItemTitle>
			</VListItem>

			<VListItem href="#" @click="logout">
				<template v-slot:prepend>
					<VIcon :icon="mdiLogout" />
				</template>
				<VListItemTitle>Logout</VListItemTitle>
			</VListItem>
		</VList>
	</VMenu>
</template>

<style scoped>
.v-divider {
	max-width: 100%;
}
</style>
