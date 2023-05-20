<template>
	<button
		class="flex gap-2 rounded-full bg-gray-300 py-1 px-4 hover:bg-gray-200"
		@click="toggleLike"
	>
		<Icon
			:icon="isLikeSetted ? 'icon-park-outline:like' : 'flat-color-icons:like'"
			width="24"
			height="24"
		/>
		{{ props.likeCount }}
	</button>
</template>

<script setup>
import { useAuthStore } from '~~/store';
import { Icon } from '@iconify/vue';
import * as recipes from '@/services/recipes';

const authStore = useAuthStore();
const props = defineProps({
	postId: String,
	likeCount: Number,
	likes: Array
});
const emits = defineEmits(['update']);

const isLikeSetted = computed(
	() => props.likes.findIndex(el => el._user._id === authStore.user.id) === -1
);

const toggleLike = async () => {
	if (!authStore.isLogged) {
		return;
	}
	console.log(isLikeSetted.value);
	if (isLikeSetted.value) {
		await recipes.setLike({
			postId: props.postId,
			userId: authStore.user.id
		});
	} else {
		await recipes.deleteLike({
			likeId: props.likes.find(el => el._user._id === authStore.user.id)._id
		});
	}
	emits('update');
};
</script>
