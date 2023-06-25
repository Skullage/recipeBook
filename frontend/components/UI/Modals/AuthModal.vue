<template>
	<modal @close="authStore.closeModal" :show="authStore.showModal">
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
					class="w-full"
					required
				/>
				<input-group
					label="Пароль"
					class="w-full"
					type="password"
					v-model="pass"
					required
				/>
				<div class="flex w-full justify-around">
					<div class="form-group flex items-center gap-1">
						<input
							type="checkbox"
							name="remember"
							id="remember"
							class="h-4 w-4 cursor-pointer"
							v-model="isAnoutherComputer"
						/>
						<label for="remember" class="cursor-pointer">Чужой компьютер</label>
					</div>
					<NuxtLink href="#">Забыли пароль?</NuxtLink>
				</div>
				<button class="btn w-full">Войти</button>
			</form>
		</template>
		<template v-slot:footer>
			<p class="pb-3">
				Нет аккаунта?
				<NuxtLink
					href="/register"
					class="font-bold"
					@click="authStore.closeModal"
					>Зарегистрироваться</NuxtLink
				>
			</p>
		</template>
	</modal>
</template>

<script setup>
import Modal from '@/components/UI/Modals/BaseModal.vue';
import InputGroup from '@/components/UI/InputGroup.vue';
import { useAuthStore } from '@/store/index';

const authStore = useAuthStore();
const username = ref('');
const pass = ref('');
const isAnoutherComputer = ref(false);

const auth = async () => {
	await authStore
		.auth(username.value, pass.value, isAnoutherComputer.value)
		.then(() => {
			navigateTo('/');
		});
};
</script>
