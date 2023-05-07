<template>
	<div class="container mx-auto flex min-h-full items-center justify-center">
		<div class="w-full border py-6 px-4">
			<h2 class="mb-6 text-center text-2xl">Профиль</h2>
			<div v-if="isProfileExists">
				<div class="flex items-center">
					<div class="basis-1/2">
						<avatar-component
							:src="avatar"
							:canBeChange="isMyProfile"
							@uploadAvatar="getProfile()"
							class="mx-auto h-96 w-96"
							@deleteAvatar="getProfile()"
						/>
					</div>

					<div class="flex-1">
						<div class="mb-4">
							<div
								class="flex gap-6"
								v-for="(item, index) in profileInfo"
								:key="index"
							>
								<b class="w-1/2 text-right font-bold">{{ item.title }}</b>
								<p>
									{{ item.info }}
								</p>
							</div>
						</div>
						<div v-if="isMyProfile" class="text-center">
							<button class="rounded border px-4 py-2">Сменить аватар</button>
						</div>
					</div>
				</div>
			</div>
			<div class="text-center text-6xl" v-else>
				<h2>Профиль не существует!</h2>
			</div>
		</div>
	</div>
</template>

<script setup>
import AvatarComponent from '@/components/AvatarComponent.vue';
import { useAuthStore } from '@/store/index';
import * as users from '@/services/users';

const route = useRoute();
const authStore = useAuthStore();

let profileInfo = reactive(
	{ title: 'Логин', info: '' },
	{ title: 'E-mail', info: '' },
	{ title: 'День рождения', info: '' },
	{ title: 'Страна', info: '' },
	{ title: 'Рейтинг', info: '' },
	{ title: 'Количество постов', info: '' },
	{ title: 'Группа', info: '' }
);

const avatar = ref('');
const isProfileExists = ref(false);
const isMyProfile = ref(authStore.user.id == route.params.id);

const getProfile = async () => {
	await users.getProfile(route.params.id).then(response => {
		if (Object.keys(response.data).length > 0) {
			avatar.value = response.data.avatar;
			profileInfo = [
				{ title: 'Логин', info: response.data.login },
				{ title: 'E-mail', info: response.data.email },
				{ title: 'День рождения', info: response.data.birthday },
				{ title: 'Страна', info: response.data.country },
				{ title: 'Рейтинг', info: response.data.rating },
				{ title: 'Количество постов', info: response.data.postsCount },
				{ title: 'Группа', info: response.data.role }
			];
			isProfileExists.value = true;
		}
	});
};

getProfile();
</script>
