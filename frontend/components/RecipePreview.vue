<template>
	<div class="border p-4">
		<div>
			<img :src="getPreview" alt="Preview" class="m-auto mb-4" />
		</div>
		<div>
			<h3 class="mb-4 text-center text-3xl">{{ props.title }}</h3>
			<p class="mb-4">{{ props.desc }}</p>
			<div class="mb-4">
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
				<NuxtLink :to="`/recipes/${props.id}`">Открыть</NuxtLink>
			</div>
			<div class="flex justify-between">
				<p>
					Автор:
					<NuxtLink :to="`/profile/${props.author._id}`">{{
						props.author.login
					}}</NuxtLink>
				</p>
				<p>
					{{ formattedDate }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import API_URL from '@/config/config';
import { formatDate } from '@/helpers/functions';

const formattedDate = ref('');

const props = defineProps({
	id: { type: String, required: true },
	title: { type: String, required: true },
	desc: { type: String, required: true },
	author: { type: Object, required: true },
	ingredients: { type: Array, required: true },
	previewImg: { type: String, required: true },
	content: { type: String, required: true },
	likeCount: { type: Number, required: true },
	postDate: String
});

const getPreview = computed(
	() => `${API_URL}/recipes_images/${props.previewImg}`
);

const getDate = async () => {
	formattedDate.value = await formatDate(props.postDate);
};

getDate();
</script>
