<template>
	<modal @close="closeModal" :show="authStore.showModal">
		<template v-slot:title>
			<h3 class="modal-title">Авторизация</h3>
		</template>
		<template v-slot:body>
			<form
				class="mb-1 flex w-full flex-col items-center gap-6 pt-3"
				@submit.prevent="auth"
			>
				<input-group
					label="Логин"
					v-model="username"
					icon="material-symbols:person"
					required
				/>
				<input-group label="Пароль" type="password" v-model="pass" required />
				<div class="flex w-full justify-around">
					<div class="form-group flex items-center gap-1">
						<input
							type="checkbox"
							name="remember"
							id="remember"
							class="h-4 w-4 cursor-pointer"
							v-model="remember"
						/>
						<label for="remember" class="cursor-pointer">Запомнить меня</label>
					</div>
					<NuxtLink href="#">Забыли пароль?</NuxtLink>
				</div>
				<button class="btn w-full">Войти</button>
			</form>
		</template>
		<template v-slot:footer>
			<p class="pb-3">
				Нет аккаунта?
				<NuxtLink href="/register" class="font-bold" @click="closeModal"
					>Зарегистрироваться</NuxtLink
				>
			</p>
		</template>
	</modal>
</template>

<script setup>
import Modal from '@/components/UI/Modal.vue';
import InputGroup from '@/components/UI/InputGroup.vue';
import { useAuthStore, useAlertStore } from '@/store/index';
import * as users from '@/services/users';

const authStore = useAuthStore();
const alert = useAlertStore();
const username = ref('');
const pass = ref('');
const remember = ref(false);

const closeModal = () => {
	authStore.toggleShow();
};
const auth = async () => {
	const user = {
		login: username.value,
		password: pass.value
	};
	await users.auth(user).then(response => {
		authStore.auth(response.data.user, response.data.token);
		alert.printAlert('Вы успешно авторизовались', 'success');
		closeModal();
		navigateTo('/');
	});
};
</script>
