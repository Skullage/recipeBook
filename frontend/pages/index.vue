<template>
	<main class="scrollbar">
		<div class="container mx-auto px-4">
			<section class="flex columns-3 gap-5">
				<recipe-preview
					v-for="item in posts"
					:key="item._id"
					:id="item._id"
					:title="item.title"
					:desc="item.desc"
					:ingredients="JSON.parse(item.ingredients)"
					:author="item.author"
					:previewImg="item.previewImg"
					:content="JSON.parse(item.content)"
					:likeCount="item.likeCount"
					class="basis-1/3"
				/>
			</section>
		</div>
	</main>
</template>

<script setup>
import RecipePreview from '@/components/RecipePreview.vue';
import * as recipes from '@/services/recipes';

const posts = ref({});

const getPosts = async () => {
	posts.value = await recipes.getRecipes();
};

getPosts();
</script>
