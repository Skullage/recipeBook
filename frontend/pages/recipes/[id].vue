<template>
	<div class="container mx-auto flex min-h-full items-center justify-center">
		<div class="w-full border py-6 px-4">
			<h2 class="mb-6 text-center text-2xl">{{ title }}</h2>
			<div v-if="isRecipeExists">
				<div class="mb-4 flex gap-4">
					<div class="basis-1/2">
						<img
							:src="`${API_URL}/recipes_images/${previewImg}`"
							alt="Фото к рецепту"
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
						<p>
							Рейтинг:
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

				<p v-html="content" class="mb-3 border p-2"></p>
				<div class="flex gap-2">
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
				<div>
					Лайкнули:
					<p v-for="(item, index) in postLikes" :key="index">
						<NuxtLink :to="`/profile/${item._user._id}`" class="text-sky-700">{{
							item._user.login
						}}</NuxtLink>
					</p>
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

const checkLike = () => {
	console.log(postLikes);
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
