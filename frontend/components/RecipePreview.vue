<template>
	<div class="border bg-white p-4">
		<div class="relative mb-4 border-b pb-2 text-center">
			<NuxtLink :to="`/recipe/${props.id}`">
				<h3 class="inline-block text-3xl underline">
					{{ props.title }}
				</h3>
			</NuxtLink>
		</div>

		<div class="mb-4 flex gap-4 indent-4">
			<div class="basis-36">
				<img :src="getPreview" alt="Preview" class="block h-auto w-full" />
			</div>
			<p class="flex-1 text-justify">{{ props.desc }}</p>
		</div>
		<div>
			<div class="mb-4 bg-green-300 py-2">
				<p class="flex">
					<span class="basis-1/2 text-center">Ингредиент</span>
					<span class="flex-1 text-center">Количество</span>
				</p>
				<p v-for="(item, index) in props.ingredients" :key="index" class="flex">
					<span class="basis-1/2 text-center">{{ item.title }}</span>
					<span class="flex-1 text-center">{{ item.amount }}</span>
				</p>
			</div>
			<div class="btn relative left-1/2 mb-4 -translate-x-1/2">
				<NuxtLink :to="`/recipe/${props.id}`">Открыть</NuxtLink>
			</div>
			<div class="mb-2 flex justify-between border-b pb-2">
				<p>
					Автор:
					<NuxtLink :to="`/profile/${props.author._id}`" class="link">{{
						props.author.login
					}}</NuxtLink>
				</p>
				<p>
					{{ formatDate(props.postDate) }}
				</p>
			</div>
			<div>
				<like-button :postId="id" :likes="likes" :likeCount="likeCount" />
			</div>
		</div>
	</div>
</template>

<script setup>
import API_URL from '@/config/config';
import { formatDate } from '@/helpers/functions';
import LikeButton from './UI/Buttons/LikeButton.vue';

const props = defineProps({
	id: { type: String, required: true },
	title: { type: String, required: true },
	desc: { type: String, required: true },
	author: { type: Object, required: true },
	ingredients: { type: Array, required: true },
	previewImg: { type: String, required: true },
	content: { type: String, required: true },
	likes: { type: Array, required: true },
	likeCount: { type: Number, required: true },
	postDate: String
});

const getPreview = computed(
	() => `${API_URL}/recipes_images/${props.previewImg}`
);
</script>
