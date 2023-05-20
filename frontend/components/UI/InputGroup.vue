<template>
	<div class="relative">
		<Icon
			:icon="icon"
			width="24"
			height="24"
			class="pointer-events-none absolute right-0 top-0 mt-2 mr-1"
			v-if="icon != null"
		/>
		<Icon
			:icon="showPass ? 'mdi:eye-off' : 'mdi:eye'"
			width="18"
			height="18"
			class="absolute right-0 top-0 mt-3 mr-2 cursor-pointer text-gray-500"
			@click="togglePassword"
			v-if="isPasswordInput"
		/>
		<div>
			<input
				:type="isPasswordInput ? getInputType : type"
				class="w-full rounded border px-3 py-2 outline-none"
				:class="[
					{ border: modelValue.length > 0 },
					{ 'border-red-500': errorText != '' }
				]"
				:placeholder="placeholder"
				@input="updateValue"
				:required="required"
				:max="max"
				:maxlength="max"
				:min="min"
				:minlength="min"
				:pattern="pattern"
				:title="hint"
				:value="modelValue"
			/>
			<label
				class="pointer-events-none absolute left-4 top-1/2 -translate-y-[200%] bg-white px-1 leading-none duration-200"
			>
				{{ getLabel }}</label
			>
			<p v-if="errorText != ''" class="pl-3 text-xs text-red-600">
				{{ errorText }}
			</p>
		</div>
	</div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
	components: {
		Icon
	},
	data() {
		return {
			showPass: false
		};
	},
	props: {
		type: {
			type: String,
			default: 'text'
		},
		hint: String,
		icon: String,
		label: String,
		required: Boolean,
		iconColor: String,
		min: String,
		max: String,
		pattern: String,
		modelValue: [Number, String],
		placeholder: String,
		errorText: { type: String, default: '' }
	},
	methods: {
		updateValue(event) {
			this.$emit('update:modelValue', event.target.value);
		},
		togglePassword() {
			this.showPass = !this.showPass;
		}
	},
	computed: {
		getInputType() {
			if (this.showPass) {
				return 'text';
			} else {
				return 'password';
			}
		},
		getLabel() {
			if (this.required) {
				return `${this.label}*`;
			} else {
				return this.label;
			}
		},
		isPasswordInput() {
			return this.type == 'password';
		}
	}
};
</script>
