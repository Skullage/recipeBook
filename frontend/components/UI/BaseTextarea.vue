<template>
	<div class="relative">
		<label
			class="pointer-events-none absolute left-[10px] -top-[10px] bg-white px-1 leading-none"
			>{{ props.label }}</label
		>
		<textarea
			class="min-h-[200px] w-full resize-none border px-3 py-2 outline-none"
			:required="props.required"
			@input="updateValue"
			:value="props.modelValue"
			:placeholder="props.placeholder"
		></textarea>
	</div>
</template>

<script setup>
const props = defineProps({
	label: String,
	modelValue: String,
	required: Boolean,
	placeholder: String
});

const emits = defineEmits(['update']);

const updateValue = event => {
	emits('update', event.target.value);
};
</script>
