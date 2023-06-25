<template>
	<div>
		<h2 class="mb-6 text-center text-2xl">Профиль</h2>
		<div>
			<div class="flex items-center">
				<div class="basis-1/2">
					<avatar-component
						:src="props.response.data.avatar"
						:canBeChange="props.isMyProfile"
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
					<div class="text-center">
						<button class="btn" @click="$emit('toggle')">
							{{ props.isMyProfile ? 'Мои посты' : 'Посты пользователя' }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import AvatarComponent from '@/components/AvatarComponent.vue';
import { formatDate } from '@/helpers/functions';

const props = defineProps({
	response: { Object },
	isMyProfile: { Boolean }
});

const emits = defineEmits(['toggle']);

const profileInfo = ref();

const updateInfo = async () => {
	let birthday = formatDate(props.response.data.birthday);
	profileInfo.value = [
		{ title: 'Логин', info: props.response.data.login },
		{ title: 'E-mail', info: props.response.data.email },
		{ title: 'Дата рождения', info: birthday },
		{ title: 'Страна', info: props.response.data.country },
		{ title: 'Рейтинг', info: props.response.data.rating },
		{ title: 'Количество постов', info: props.response.data.postsCount },
		{ title: 'Группа', info: props.response.data.role }
	];
};

await updateInfo();
</script>

<style lang="scss" scoped></style>
