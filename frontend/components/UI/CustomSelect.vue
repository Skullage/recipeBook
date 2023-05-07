<template>
	<div class="relative w-full">
		<select
			class="w-full cursor-pointer appearance-none border border-b py-2 text-center outline-none"
			@change="updateValue"
			required
			:value="modelValue"
		>
			<option disabled value="">Выберите пункт списка</option>
			<option
				v-for="(option, index) in options"
				:value="option.code"
				:key="index"
			>
				{{ option.name }}
			</option>
		</select>
		<label
			class="pointer-events-none absolute left-[10px] top-1/2 -translate-y-1/2 bg-white px-1"
			>{{ label }}</label
		>
	</div>
</template>

<script>
export default {
	props: {
		options: Array,
		value: String,
		text: String,
		label: String,
		modelValue: String
	},
	methods: {
		updateValue(event) {
			this.$emit('update:modelValue', event.target.value);
		}
	}
};
</script>

<style lang="scss" scoped>
select:focus ~ label,
select:valid ~ label {
	top: -2px;
}
select {
	background-image: url(/img/components/select-arrow.svg);
	background-position: center right;
	background-repeat: no-repeat;
}
</style>
