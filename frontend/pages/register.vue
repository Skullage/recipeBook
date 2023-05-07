<template>
	<div
		class="container mx-auto flex min-h-full items-center justify-center px-4"
	>
		<form
			class="flex w-1/3 flex-col gap-4 border px-3 py-6"
			@submit.prevent="register"
		>
			<h2 class="text-center text-2xl">Регистрация</h2>
			<input-group
				label="Логин"
				v-model="login"
				required
				max="16"
				hint="Введите имя пользователя (максимум 16 символов)"
				:errorText="validation.login[0]"
			/>
			<input-group
				label="Пароль"
				type="password"
				v-model="password"
				min="8"
				max="45"
				pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
				hint="Введите пароль от 8 символов, используя хотя бы одно число, буквы в нижнем и верхнем регистрах."
				required
			/>
			<input-group
				label="Подтвердите пароль"
				type="password"
				v-model="password2"
				hint="Подтвердите пароль"
				:errorText="validation.password2[0]"
				required
			/>
			<input-group
				label="E-mail"
				type="email"
				v-model="email"
				:errorText="validation.email[0]"
				required
				hint="Введите электронную почту"
			/>
			<custom-select
				label="Страна"
				:options="countries[$i18n.locale]"
				v-model="selectedCountry"
			/>
			<phone-input
				:countryCodes="countries.en"
				v-model:phoneCode="phoneCode"
				v-model:phone="phone"
				required
			/>
			<date-picker v-model="birthday" label="День рождения" />
			<input type="text" class="hidden" v-model="guard" />
			<input
				type="submit"
				value="Зарегистрироваться"
				class="w-full cursor-pointer rounded border py-2 font-bold duration-300 hover:bg-gray-300"
			/>
		</form>
	</div>
</template>

<script setup>
import InputGroup from '@/components/UI/InputGroup.vue';
import { useAlertStore } from '@/store/index';
import * as users from '@/services/users';
import CustomSelect from '@/components/UI/CustomSelect.vue';
import DatePicker from '@/components/UI/DatePicker.vue';
import PhoneInput from '@/components/UI/PhoneInput.vue';
import countriesList from '@/assets/json/countries.json';

const alert = useAlertStore();
const login = ref('');
const password = ref('');
const password2 = ref('');
const email = ref('');
const birthday = ref(null);
const countries = reactive(countriesList);
const selectedCountry = ref('');
const validation = reactive({ login: [], password2: [], email: [] });
const phoneCode = ref('');
const phone = ref('');
const guard = ref('');
const clientIp = ref('');

definePageMeta({
	middleware: 'register'
});

const addToDatabase = async () => {
	const user = {
		login: login.value,
		password: password.value,
		email: email.value,
		role: 'Пользователь',
		birthday: birthday.value,
		country: selectedCountry.value,
		phone: getPhoneNumber.value,
		registration_IP: clientIp.value
	};
	await users.createUser(user).then(response => {
		reset();
		navigateTo('/');
		alert.printAlert('Вы успешно зарегистрировались', 'success');
	});
};

const reset = () => {
	login.value = '';
	password.value = '';
	password2.value = '';
	email.value = '';
	birthday.value = null;
	Object.assign(validation, { login: [], password2: [], email: [] });
	phone.value = '';
};

const checkConfirm = () => {
	validation.password2 = [];
	if (!password.value === password2.value) {
		validation.password2.push('Пароли различаются');
		return;
	}
};
const checkEmail = async () => {
	validation.email = [];
	const data = await users.getUserByEmail(email.value);
	if (!Object.keys(data).length == 0) {
		validation.email.push('E-mail уже занят!');
		return;
	}
};
const checkLogin = async () => {
	validation.login = [];
	const data = await users.getUserByLogin(login.value);
	if (!Object.keys(data).length == 0) {
		validation.login.push('Логин уже занят!');
		return;
	}
};
const getIp = async () => {
	clientIp.value = await users.getUserIp();
};
const getCountry = async () => {
	const country = await users.getUserCountry(clientIp.value);
	selectedCountry.value = countries.en.find(el => el.name == country).code;
	phoneCode.value = countries.en.find(el => el.name == country).dial_code;
};

const register = async () => {
	await checkLogin();
	checkConfirm();
	await checkEmail();

	if (validation.login.length > 0) {
		return;
	}
	if (validation.password2.length > 0) {
		return;
	}
	if (validation.email.length > 0) {
		return;
	}
	if (guard.value.length > 0) {
		alert.printAlert('Защитное поле должно быть пустым', 'error');
		return;
	}

	addToDatabase();
};

const getPhoneNumber = computed(() => phoneCode.value + phone.value);

await getIp();
await getCountry();
</script>
