<template>
	<input-group
		v-model="data"
		@input="setData"
		@delete="setData"
		placeholder="only numbers"
		:label="props.label"
		required
	/>
</template>

<script setup>
import InputGroup from './InputGroup.vue';
const props = defineProps({
	label: String,
	modelValue: [String, Number],
	required: Boolean
});

const emits = defineEmits(['update:modelValue']);

const data = ref(props.modelValue);

const setData = event => {
	const value = event.target.value.replace(/[^0-9]/g, '');
	if (value[0] == 0) {
		data.value = val.slice(1);
	} else if (value == '') {
		data.value = 0;
	} else {
		data.value = value;
	}
	emits('update:modelValue', data.value);
};
</script>
