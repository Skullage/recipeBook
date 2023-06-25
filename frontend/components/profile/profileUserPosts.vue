<template>
	<div>
		<div v-if="props.response.data.myPosts.length > 0">
			<div
				class="mb-4 rounded border p-4 last:mb-0"
				v-for="(item, index) in props.response.data.myPosts"
				:key="index"
			>
				<div class="mb-2 flex items-center gap-2">
					<div>
						<img
							:src="`${API_URL}/avatars/${item.author.avatar}`"
							alt="User avatar"
							class="h-8 w-8 rounded-full border object-contain"
						/>
					</div>
					<p>{{ item.author.login }}</p>
					<p>{{ formatDate(item.created_at) }}</p>
				</div>
				<div class="mb-2 flex gap-4">
					<div class="mb-4 flex h-36 basis-36 justify-center">
						<img
							:src="`${API_URL}/recipes_images/${item.previewImg}`"
							alt="Preview"
							class="block h-auto max-w-full"
						/>
					</div>
					<div>
						<NuxtLink :to="`/recipe/${item.id}`">
							<h3 class="mb-4 text-3xl">
								{{ item.title }}
							</h3>
						</NuxtLink>
						<p class="mb-4">{{ item.desc }}</p>
					</div>
				</div>
				<ul Class="mb-4">
					<li v-for="(elem, index) in item.tags" :key="index">
						{{ elem }}
					</li>
				</ul>
				<div class="flex items-center gap-2">
					<button class="btn" v-if="authStore.isLogged">В избранное</button>
					<button
						class="btn"
						v-if="isMyProfile || authStore.user.role == 'Администратор'"
						@click="deleteRecipe(item._id)"
					>
						Удалить
					</button>
					<like-button
						:likeCount="item.likeCount"
						:likes="item.likes"
						:postId="item._id"
						@update="$emit('update')"
					/>
				</div>
			</div>
			<div class="text-center">
				<button class="btn" @click="$emit('toggle')">Профиль</button>
			</div>
		</div>
		<div class="text-center text-6xl" v-else>
			<h2>
				{{
					isMyProfile
						? 'Вы еще не написали не один пост :('
						: 'Пользователь еще не написал не один пост :('
				}}
			</h2>
		</div>
	</div>
</template>

<script setup>
import API_URL from '@/config/config';
import LikeButton from '@/components/UI/Buttons/LikeButton.vue';
import { formatDate } from '~~/helpers/functions';
import { useAuthStore, useModalStore } from '@/store/index';
import * as recipes from '@/services/recipes.js';

const authStore = useAuthStore();
const modalStore = useModalStore();

const props = defineProps({
	response: { Object },
	isMyProfile: { Boolean }
});

const emits = defineEmits(['update', 'toggle']);

const deleteRecipe = async id => {
	const ok = await modalStore.showModal({
		title: 'Подтвеждение удаления',
		message: 'Вы действительно хотите удалить комментарий?',
		confirmBtn: 'Да',
		cancelButton: 'Нет'
	});
	if (ok) {
		await recipes
			.deleteRecipe({
				recipeId: id,
				token: authStore.token
			})
			.then(response => {
				emits('update');
			})
			.catch(error => {
				console.log(error);
			});
	}
};
</script>

<style lang="scss" scoped></style>
