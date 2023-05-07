<template>
	<div class="flex items-center gap-8">
		<select
			v-model="modelValue.title"
			class="flex-1 cursor-pointer appearance-none border px-3 py-2 text-center outline-none"
			required
		>
			<option value="" disabled>Выберите ингредиент</option>
			<option
				v-for="(item, index) in existingTags"
				:key="index"
				:value="item.title"
			>
				{{ item.title }}
			</option>
		</select>
		<input-group
			class="flex-1"
			v-model.number="modelValue.amount"
			type="text"
			label="Количество"
			required
		/>
		<button class="border px-3 py-2" @click.prevent="removeFromArray">
			Удалить
		</button>
	</div>
</template>

<script>
import InputGroup from './InputGroup.vue';
export default {
	components: { InputGroup },
	props: {
		id: Number,
		modelValue: Object,
		existingTags: Array
	},
	data() {
		return {};
	},
	methods: {
		removeFromArray() {
			this.$emit('remove', this.id);
		}
	}
};
</script>
