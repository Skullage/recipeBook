<template>
	<div>
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
				<div>
					<img
						:src="`${API_URL}/recipes_images/${item.previewImg}`"
						alt="Preview"
						class="m-auto mb-4"
					/>
				</div>
				<div class="relative">
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
			<div>
				<like-button
					:likeCount="item.likeCount"
					:likes="item.likes"
					:postId="item._id"
					@update="$emit('update')"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import API_URL from '@/config/config';
import LikeButton from '@/components/UI/Buttons/LikeButton.vue';
import { formatDate } from '~~/helpers/functions';

const props = defineProps({
	response: { Object },
	isMyProfile: { Boolean }
});

const emits = defineEmits(['update']);

console.log(props.response.data.myPosts);
</script>

<style lang="scss" scoped></style>
