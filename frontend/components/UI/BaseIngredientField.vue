<template>
	<div class="flex items-center gap-8">
		<select
			v-model="props.modelValue.title"
			class="flex-1 cursor-pointer appearance-none border px-3 py-2 text-center outline-none"
			required
		>
			<option value="" disabled>Выберите ингредиент</option>
			<option
				v-for="(item, index) in props.existingTags"
				:key="index"
				:value="item.title"
			>
				{{ item.title }}
			</option>
		</select>
		<input-group
			class="flex-1"
			v-model="modelValue.amount"
			type="text"
			label="Количество"
			required
		/>
		<button @click.prevent="removeFromArray" class="btn">Удалить</button>
	</div>
</template>

<script setup>
import InputGroup from './InputGroup.vue';

const props = defineProps({
	id: Number,
	modelValue: Object,
	existingTags: Array
});

const emits = defineEmits(['remove']);

const removeFromArray = () => {
	emits('remove', props.id);
};
</script>
