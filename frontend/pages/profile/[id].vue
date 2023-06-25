<template>
	<div class="container mx-auto flex items-center justify-between bg-primary">
		<div class="min-w-full py-6 px-4">
			<component
				:is="showPosts ? profileUserComponent : profileInfoComponent"
				@toggle="toggle"
				:isMyProfile="isMyProfile"
				:isProfileExists="isProfileExists"
				:response="response"
				v-if="isProfileExists"
				@update="getProfile"
			/>
			<div class="text-center text-6xl" v-else>
				<h2>Профиль не существует!</h2>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/store/index';
import * as users from '@/services/users';

const route = useRoute();
const authStore = useAuthStore();

let profileInfoComponent = resolveComponent('profile-info-component');
let profileUserComponent = resolveComponent('profile-user-posts');

const showPosts = ref(false);

const toggle = () => {
	showPosts.value = !showPosts.value;
};

const response = ref();

const isProfileExists = ref(false);
const isMyProfile = ref(authStore.user.id == route.params.id);

const getProfile = async () => {
	await users
		.getProfile(route.params.id)
		.then(res => {
			response.value = res;

			if (Object.keys(response.value.data).length > 0) {
				isProfileExists.value = true;
			}
		})
		.catch(error => {
			console.log(error);
		});
};

await getProfile();
</script>
<style></style>
