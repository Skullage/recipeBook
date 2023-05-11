<template>
	<div class="flex items-center gap-3 border px-2 py-1">
		<div class="h-16 w-16 rounded-full">
			<img
				:src="`${API_URL}/avatars/${props.user.avatar}`"
				class="h-full w-full rounded-full object-cover"
			/>
		</div>
		<div class="flex-1">
			<b class="px-2">{{ props.user.login }}</b>
			<textarea
				class="block w-full resize-none border px-2 py-1 outline-none"
				:readonly="!editable"
				:class="{ 'border-transparent': !editable }"
				v-model="content"
			></textarea>
		</div>
		<div class="self-end justify-self-end">
			<button class="mr-2" @click="editComment">{{ getEditBtnText }}</button>
			<button @click="removeComment">Удалить</button>
		</div>
	</div>
</template>

<script setup>
import API_URL from '@/config/config';
import * as recipes from '@/services/recipes';

const editable = ref(false);
const content = ref(props.content);
const bufferedContent = ref('');

const props = defineProps({
	id: { type: String, required: true },
	user: { type: Object, required: true },
	content: { type: String, required: true }
});

const emits = defineEmits(['update']);

const editComment = async () => {
	if (editable.value) {
		if (bufferedContent.value.localeCompare(content.value) !== 0) {
			await recipes.updateComment({
				commentId: props.id,
				content: content.value
			});
		}
		editable.value = !editable.value;
	} else {
		bufferedContent.value = content.value;
		editable.value = !editable.value;
	}
};

const removeComment = async () => {
	await recipes.deleteComment({
		commentId: props.id
	});
	emits('update');
};

const getEditBtnText = computed(() =>
	editable.value ? 'Сохранить' : 'Редактировать'
);
</script>
