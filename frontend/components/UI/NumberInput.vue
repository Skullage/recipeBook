<template>
	<input-group
		v-model="tel"
		@input="setTel"
		@delete="setTel"
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

const tel = ref(props.modelValue);

const setTel = v => {
	const val = v.target.value.replace(/[^0-9]/g, '');
	if (val[0] == 0) {
		tel.value = val.slice(1);
	} else if (val == '') {
		tel.value = 0;
	} else {
		tel.value = val;
	}
	emits('update:modelValue', tel.value);
};
</script>
