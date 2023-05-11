<template>
	<div class="container mx-auto flex min-h-full items-center justify-center">
		<div class="w-full border py-6 px-4">
			<h2 class="mb-6 text-center text-2xl font-bold">{{ title }}</h2>
			<div v-if="isRecipeExists">
				<div class="mb-4 flex gap-4">
					<div class="basis-1/4">
						<img
							:src="`${API_URL}/recipes_images/${previewImg}`"
							alt="Фото к рецепту"
							class="h-auto w-full rounded"
						/>
					</div>
					<div>
						<p>
							Автор:
							<NuxtLink :to="`/profile/${author._id}`" class="text-sky-700">{{
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
					<p v-html="content" class=""></p>
				</div>

				<div class="mb-4 flex gap-2">
					<button>В избранное</button>

					<button
						class="flex gap-2 rounded-full bg-gray-300 py-1 px-4"
						@click="toggleLike"
					>
						<Icon
							:icon="
								userLikeId == null
									? 'icon-park-outline:like'
									: 'flat-color-icons:like'
							"
							width="24"
							height="24"
						/>
						{{ likeCount }}
					</button>
				</div>
				<div class="mb-4 hidden">
					Понравилось:
					<p v-for="(item, index) in postLikes" :key="index">
						<NuxtLink :to="`/profile/${item._user._id}`" class="text-sky-700">{{
							item._user.login
						}}</NuxtLink>
					</p>
				</div>
				<div class="mb-6 flex items-center gap-4">
					<div class="flex-0 h-16 basis-16 rounded-full">
						<img
							:src="`${API_URL}/avatars/${authStore.user.avatar}`"
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
					/>
				</div>
			</div>
			<div class="text-center text-6xl" v-else>
				<h2>Рецепт не существует!</h2>
			</div>
		</div>
	</div>
</template>

<script setup>
import * as recipes from '@/services/recipes';
import API_URL from '@/config/config';
import { useAuthStore } from '@/store';
import { Icon } from '@iconify/vue';
import Comment from '@/components/Comment.vue';

const route = useRoute();

const authStore = useAuthStore();

const title = ref('');
const previewImg = ref('');
const author = ref('');
const content = ref('');
const desc = ref('');
const likeCount = ref(0);
let postLikes = reactive([]);
const userLikeId = ref(null);
let ingredients = reactive([]);
const commentText = ref('');
let postComments = reactive('');

const isRecipeExists = ref(false);

const getRecipe = async () => {
	await recipes
		.getRecipe(route.params.id)
		.then(response => {
			title.value = response.data.title;
			previewImg.value = response.data.previewImg;
			author.value = response.data.author;
			desc.value = response.data.desc;
			content.value = JSON.parse(response.data.content);
			ingredients = JSON.parse(response.data.ingredients);
			likeCount.value = response.data.likeCount;
			isRecipeExists.value = true;
			postLikes = response.data.likes;
			postComments = response.data.comments;
		})
		.catch(error => {
			console.log(error);
		});
};

const toggleLike = async () => {
	if (userLikeId.value == null) {
		await recipes.setLike({
			postId: route.params.id,
			userId: authStore.user.id
		});
	} else {
		await recipes.deleteLike({
			likeId: userLikeId.value
		});
	}
	await getRecipe();
	checkLike();
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

const checkLike = () => {
	userLikeId.value = null;
	postLikes.forEach(el => {
		if (el._user._id == authStore.user.id) {
			userLikeId.value = el._id;
		}
	});
};

await getRecipe();
checkLike();
</script>
