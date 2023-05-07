<template>
	<div class="relative">
		<label
			class="pointer-events-none absolute left-[10px] -top-[10px] bg-white px-1 leading-none"
			>Телефон</label
		>
		<div class="flex w-full gap-1 border px-3">
			<select
				class="cursor-pointer appearance-none border-r py-2 pr-5 outline-none"
				title="Код страны"
				@change="updatePhoneCode"
				:value="phoneCode"
				required
			>
				<option
					:value="code.dial_code"
					v-for="(code, index) in countryCodes"
					:key="index"
				>
					{{ code.dial_code }}
				</option>
			</select>
			<input
				type="tel"
				maxlength="10"
				minlength="10"
				title="Номер без кода страны"
				class="flex-1 outline-none"
				@input="updatePhone"
				:value="phone"
				:pattern="pattern"
				required
			/>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		countryCodes: Array,
		phoneCode: String,
		phone: String,
		required: String,
		pattern: String
	},
	methods: {
		updatePhone(event) {
			this.$emit('update:phone', event.target.value);
		},
		updatePhoneCode(event) {
			this.$emit('update:phoneCode', event.target.value);
		}
	}
};
</script>

<style lang="scss" scoped>
select {
	background-image: url(/img/components/select-arrow.svg);
	background-position: center right;
	background-repeat: no-repeat;
}
</style>
