<template>
	<div class="container mx-auto flex min-h-full items-center justify-center">
		<div class="w-full rounded bg-primary py-6 px-10">
			<h2 class="mb-6 text-center text-2xl font-bold">
				{{ title }}
			</h2>
			<div v-if="isRecipeExists">
				<div class="mb-4 flex gap-4">
					<div class="basis-1/4">
						<img
							:src="`${API_URL}/recipes_images/${previewImg}`"
							alt="Фото к рецепту"
							class="h-auto w-full rounded"
						/>
					</div>
					<div class="flex-1">
						<p>
							Автор:
							<NuxtLink :to="`/profile/${author._id}`" class="link">{{
								author.login
							}}</NuxtLink>
						</p>
						<p>
							Время приготовления:
							{{ author.login }}
						</p>
						<p>
							Количество порций:
							{{ author.login }}
						</p>
						<p class="mb-3 border-b pb-3">
							Дата публикации {{ formatDate(postDate) }}
						</p>
						<p>{{ desc }}</p>
					</div>
				</div>
				<div class="mb-4 bg-green-300 p-4">
					<h3 class="mb-2 text-xl">Продукты</h3>
					<ul>
						<li v-for="(item, index) in ingredients" :key="index">
							{{ `${item.title} - ${item.amount} гр.` }}
						</li>
					</ul>
				</div>
				<div class="mb-4">
					<h3 class="text-xl font-bold">Рецепт</h3>
					<p v-html="getNormalContent"></p>
				</div>

				<div class="mb-4 flex items-center gap-2">
					<button class="btn" v-if="authStore.isLogged">В избранное</button>
					<button
						class="btn"
						v-if="
							author._id === authStore.user.id ||
							authStore.user.role == 'Администратор'
						"
						@click="deleteRecipe"
					>
						Удалить
					</button>
					<like-button
						:postId="route.params.id"
						:likeCount="likeCount"
						:likes="postLikes"
						@update="getRecipe"
					/>
				</div>
				<div class="mb-4 hidden">
					Понравилось:
					<p v-for="(item, index) in postLikes" :key="index">
						<NuxtLink :to="`/profile/${item._user._id}`" class="link">{{
							item._user.login
						}}</NuxtLink>
					</p>
				</div>
				<div class="mb-6 flex items-center gap-4" v-if="authStore.isLogged">
					<div class="flex-0 h-16 basis-16 rounded-full">
						<img
							:src="
								authStore.user.avatar !== ''
									? `${API_URL}/avatars/${authStore.user.avatar}`
									: `${API_URL}/avatars/placeholder.png`
							"
							class="h-full min-w-full rounded-full object-cover"
						/>
					</div>
					<textarea
						class="w-full flex-1 resize-none border px-2 py-1 outline-none"
						placeholder="Написать комментарий"
						cols="30"
						rows="2"
						v-model="commentText"
					></textarea>
					<button class="btn" @click="createComment">Отправить</button>
				</div>
				<div>
					<comment
						v-for="item in postComments"
						:key="item._id"
						:id="item._id"
						:user="item._user"
						:content="item.content"
						@update="getRecipe"
						class="mb-4"
					/>
				</div>
			</div>
			<div class="text-center text-6xl" v-else>
				<h2>Рецепт не существует!</h2>
			</div>
		</div>
		<confirm-modal ref="confirmModal" />
	</div>
</template>

<script setup>
import * as recipes from '@/services/recipes';
import API_URL from '@/config/config';
import { useAuthStore, useModalStore } from '@/store';
import Comment from '@/components/Comment.vue';
import { formatDate } from '~~/helpers/functions';
import LikeButton from '~~/components/UI/Buttons/LikeButton.vue';
import ConfirmModal from '~~/components/UI/Modals/ConfirmModal.vue';

const confirmModal = ref(null);

const route = useRoute();

const authStore = useAuthStore();
const modalStore = useModalStore();

const id = ref('');
const title = ref('');
const previewImg = ref('');
const author = ref('');
const content = ref('');
const desc = ref('');
const likeCount = ref(0);
const postLikes = ref([]);
const ingredients = ref([]);
const commentText = ref('');
const postComments = ref([]);
const postDate = ref('');

const isRecipeExists = ref(false);

const getRecipe = async () => {
	await recipes
		.getRecipe(route.params.id)
		.then(response => {
			id.value = response.data._id;
			title.value = response.data.title;
			previewImg.value = response.data.previewImg;
			author.value = response.data.author;
			desc.value = response.data.desc;
			content.value = JSON.parse(response.data.content);
			ingredients.value = JSON.parse(response.data.ingredients);
			likeCount.value = response.data.likeCount;
			postLikes.value = response.data.likes;
			postComments.value = response.data.comments;
			postDate.value = response.data.created_at;
			isRecipeExists.value = true;
		})
		.catch(error => {
			console.log(error);
		});
};

const deleteRecipe = async () => {
	const ok = await modalStore.showModal({
		title: 'Подтвеждение удаления',
		message: 'Вы действительно хотите удалить эту статью?',
		confirmBtn: 'Да',
		cancelButton: 'Нет'
	});
	if (ok) {
		await recipes
			.deleteRecipe({
				recipeId: route.params.id,
				token: authStore.token
			})
			.then(navigateTo('/'))
			.catch(error => {
				console.log(error);
			});
	}
};

const reset = () => {
	commentText.value = '';
};

const createComment = async () => {
	await recipes.createComment({
		postId: route.params.id,
		userId: authStore.user.id,
		content: commentText.value
	});
	reset();
	getRecipe();
};

const getNormalContent = computed(() =>
	content.value.slice(1, content.value.length - 1)
);

await getRecipe();
</script>
