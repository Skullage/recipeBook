<template>
	<div class="flex min-h-screen flex-col">
		<NavBar class="flex-0 mb-5" />
		<main class="mb-5 flex">
			<NuxtPage />
		</main>
		<footer class="footer bg-gray-200 dark:bg-black dark:text-white">
			<div
				class="container mx-auto flex min-h-full items-center justify-center px-4"
			>
				<p class="py-4">{{ $t('copy') }}</p>
			</div>
		</footer>
		<alert-component />
	</div>
</template>
<script setup>
import NavBar from '@/components/NavBar.vue';
import { useThemeStore, useAuthStore } from '@/store/index';
import AlertComponent from '@/components/UI/AlertComponent.vue';
import api from '@/services/api';

const store = useThemeStore();
const authStore = useAuthStore();

if (
	localStorage.theme === 'dark' ||
	(!('theme' in localStorage) &&
		window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
	store.toggleTheme('dark');
}

if (authStore.token) {
	api.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
}
</script>
<style>
main {
	flex: 1 0 auto;
}
footer {
	flex: 0 0 auto;
}
</style>
