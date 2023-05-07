<template>
	<div class="relative w-full">
		<label
			class="pointer-events-none absolute left-[10px] -top-[10px] bg-white px-1 leading-none"
			>{{ getLabel }}</label
		>
		<input
			type="date"
			class="w-full cursor-pointer border px-3 py-2 outline-none"
			min="1920-01-01"
			:max="getNowDate"
			@change="updateValue"
			:required="required"
			:value="modelValue"
		/>
	</div>
</template>

<script>
export default {
	props: {
		label: String,
		required: Boolean,
		modelValue: String
	},
	methods: {
		updateValue(event) {
			this.$emit('update:modelValue', event.target.value);
		}
	},
	computed: {
		getLabel() {
			if (this.required) {
				return `${this.label}*`;
			} else {
				return this.label;
			}
		},
		getNowDate() {
			const today = new Date().toISOString().slice(0, 10);
			return today;
		}
	}
};
</script>

<style lang="scss" scoped></style>
