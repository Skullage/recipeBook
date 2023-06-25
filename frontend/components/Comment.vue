<template>
	<div class="relative flex items-center gap-3 rounded border px-2 py-1">
		<div class="h-16 w-16 rounded-full">
			<NuxtLink :to="`/profile/${props.user._id}`"
				><img
					:src="
						props.user.avatar !== ''
							? `${API_URL}/avatars/${props.user.avatar}`
							: `${API_URL}/avatars/placeholder.png`
					"
					class="h-full w-full rounded-full object-cover"
			/></NuxtLink>
		</div>
		<div class="flex-1">
			<NuxtLink :to="`/profile/${props.user._id}`"
				><b class="px-2">{{ props.user.login }}</b></NuxtLink
			>
			<textarea
				class="block w-full resize-none border px-2 py-1 outline-none"
				:readonly="!editable"
				:class="{ 'border-transparent': !editable }"
				v-model="content"
			></textarea>
		</div>
		<div class="absolute right-0 top-0 mr-2" v-if="!editable">
			<button
				class="mt-2 mr-2 cursor-pointer"
				@click="editComment"
				title="Редактировать"
				v-if="isMyComment"
			>
				<Icon icon="material-symbols:edit" width="16" height="16" />
			</button>
			<button
				@click="removeComment"
				class="cursor-pointer"
				title="Удалить"
				v-if="isMyComment"
			>
				<Icon icon="material-symbols:delete-outline" width="16" height="16" />
			</button>
		</div>
		<div v-if="editable" class="-translate-y-1/4 self-end">
			<button class="btn mr-2" @click="editComment">Сохранить</button>
			<button class="btn" @click="cancelEdit">Отмена</button>
		</div>
	</div>
</template>

<script setup>
import API_URL from '@/config/config';
import * as recipes from '@/services/recipes';
import { Icon } from '@iconify/vue';
import { useAuthStore, useModalStore } from '@/store';

const authStore = useAuthStore();
const modalStore = useModalStore();
const editable = ref(false);
const content = ref(props.content);
const bufferedContent = ref('');

const props = defineProps({
	id: { type: String, required: true },
	user: { type: Object, required: true },
	content: { type: String, required: true }
});

const emits = defineEmits(['update']);

const cancelEdit = () => {
	content.value = bufferedContent.value;
	editable.value = !editable.value;
};

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
	const ok = await modalStore.showModal({
		title: 'Подтвеждение удаления',
		message: 'Вы действительно хотите удалить комментарий?',
		confirmBtn: 'Да',
		cancelButton: 'Нет'
	});
	if (ok) {
		await recipes
			.deleteComment({
				commentId: props.id,
				token: authStore.token
			})
			.then()
			.catch(error => {
				console.log(error);
			});
		emits('update');
	}
};

const getEditBtnText = computed(() =>
	editable.value ? 'Сохранить' : 'Редактировать'
);

const isMyComment = computed(
	() =>
		props.user._id === authStore.user.id ||
		authStore.user.role === 'Администратор'
);
</script>
