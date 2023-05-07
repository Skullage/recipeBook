<template>
	<div class="container mx-auto flex justify-center px-4">
		<form
			class="flex h-full flex-col gap-10 border px-3 py-6"
			@submit.prevent="createRecipe"
			enctype="multipart/form-data"
		>
			<h2 class="text-center text-2xl">Добавить рецепт</h2>
			<div class="flex items-center gap-2">
				<input-group
					label="Название блюда"
					v-model="title"
					required
					max="45"
					placeholder="Название блюда"
				/>
			</div>
			<div>
				<base-textarea
					v-model="desc"
					label="Описание"
					@update="desc = $event"
					required
				/>
			</div>
			<div>
				<rich-text-editor
					@input="content = $event"
					label="Рецепт"
					placeholder="Рецепт"
					v-model="content"
				/>
			</div>
			<div>
				<h3 class="mb-2 pl-4">Ингредиенты</h3>
				<div class="mb-4">
					<base-ingredient-field
						class="mb-2"
						v-for="(item, index) in ingredients"
						:key="index"
						:existingTags="getFreeIngredients(index)"
						v-model="ingredients[index]"
						:id="index"
						@remove="removeIngredient"
					/>
				</div>
				<div class="text-center">
					<button @click.prevent="addIngredient" class="border px-3 py-2">
						Добавить
					</button>
				</div>
			</div>
			<div>
				<tags-input
					:existingTags="existingTags"
					@addTag="tags = $event"
					placeholder="Введите тег"
					label="Теги"
					@keydown.enter.prevent
				/>
			</div>
			<div>
				<h3 class="mb-2 pl-4">Фото блюда</h3>
				<img
					:src="`${API_URL}/recipes_images/${previewImg}`"
					class="mx-auto h-48 w-48 cursor-pointer"
					alt="Превью"
					@click="$refs.previewChange.click"
				/>
				<input
					type="file"
					class="hidden"
					ref="previewChange"
					accept="image/*"
					@change="uploadPreview"
				/>
			</div>
			<div class="flex items-center gap-2">
				<label class="order-2">Скрытый рецепт?</label>
				<input type="checkbox" v-model="hidden" />
			</div>
			<input
				type="submit"
				value="Создать"
				class="w-full cursor-pointer rounded border py-2 font-bold duration-300 hover:bg-gray-300"
			/>
		</form>
	</div>
</template>

<script setup>
import InputGroup from '@/components/UI/InputGroup.vue';
import RichTextEditor from '@/components/UI/RichTextEditor.vue';
import TagsInput from '@/components/UI/TagsInput.vue';
import API_URL from '@/config/config';
import * as recipes from '@/services/recipes';
import { useAlertStore, useAuthStore } from '@/store/index';
import BaseTextarea from '@/components/UI/BaseTextarea.vue';
import BaseIngredientField from '@/components/UI/BaseIngredientField.vue';

const title = ref('123');
const desc = ref('123');
const content = ref('123');
const ingredients = reactive([{ title: '', amount: '0' }]);
const existingIngredients = ref([]);
const tags = ref([]);
const existingTags = ref([]);
const previewImg = ref(`placeholder.png`);
const hidden = ref(false);

const alert = useAlertStore();
const authStore = useAuthStore();

const createRecipe = async () => {
	const recipe = {
		title: title.value,
		desc: desc.value,
		content: content.value,
		previewImg: previewImg.value,
		author: authStore.user.id,
		ingredients: ingredients,
		private: hidden.value
	};
	await recipes.createRecipe(recipe).then(response => {
		reset();
		alert.printAlert('Ваш рецепт успешно добавлен на сайт', 'success');
	});
};

const reset = () => {
	title.value = '';
	desc.value = '';
	content.value = '';
	ingredients.value = [];
	tags.value = [];
	previewImg.value = `placeholder.png`;
};

const getIngredients = async () => {
	existingIngredients.value = await recipes.getIngredients();
};

const uploadPreview = async event => {
	const file = event.target.files[0];
	const data = new FormData();
	const fileName = getRandomName();
	data.append('file', file, fileName);
	await recipes
		.uploadPreview(data, localStorage.getItem('jwt'))
		.then(response => {
			previewImg.value = `${fileName}.jpg`;
		});
};

const getRandomName = () =>
	parseInt(Math.random() * 10000000000000000000).toString(36);

const addIngredient = () => {
	ingredients.push({ title: '', amount: 0 });
};

const removeIngredient = event => {
	ingredients.splice(event, 1);
};

const getFreeIngredients = index => {
	return existingIngredients.value.filter(el =>
		ingredients.every((u, i) => u.title !== el.title || i === index)
	);
};

getIngredients();
</script>
