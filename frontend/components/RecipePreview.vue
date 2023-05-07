<template>
	<div class="border">
		<div>
			<img :src="getPreview" alt="Preview" />
		</div>
		<div>
			<h3 class="text-center text-3xl">{{ props.title }}</h3>
			<p>{{ props.desc }}</p>
			<div>
				<p class="flex">
					<span class="basis-1/2 text-center">Ингредиент</span>
					<span class="flex-1 text-center">Количество</span>
				</p>
				<p v-for="(item, index) in props.ingredients" :key="index" class="flex">
					<span class="basis-1/2 text-center">{{ item.title }}</span>
					<span class="flex-1 text-center">{{ item.amount }}</span>
				</p>
			</div>
			<p>
				Автор:
				<NuxtLink :to="`/profile/${props.author._id}`">{{
					props.author.login
				}}</NuxtLink>
			</p>
			<p v-html="props.content"></p>
			<NuxtLink :to="`/recipes/${props.id}`">Открыть </NuxtLink>
		</div>
	</div>
</template>

<script setup>
import API_URL from '@/config/config';

const props = defineProps({
	id: { type: String, required: true },
	title: { type: String, required: true },
	desc: { type: String, required: true },
	author: { type: Object, required: true },
	ingredients: { type: Array, required: true },
	previewImg: { type: String, required: true },
	content: { type: String, required: true },
	likeCount: { type: Number, required: true }
});

const getPreview = computed(
	() => `${API_URL}/recipes_images/${props.previewImg}`
);
</script>
