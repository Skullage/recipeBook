<template>
	<div class="flex min-h-screen flex-col">
		<NavBar class="mb-5" />
		<NuxtPage class="mb-5 flex-1" />
		<footer class="footer bg-gray-200 dark:bg-black dark:text-white">
			<div class="container mx-auto px-4">
				<p class="py-4 text-center">{{ $t('copy') }}</p>
			</div>
		</footer>
		<alert-component />
	</div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import { useThemeStore, useAuthStore } from '@/store/index';
import AlertComponent from '@/components/UI/AlertComponent.vue';

export default {
	components: {
		NavBar,
		AlertComponent
	},
	setup() {
		return { store: useThemeStore(), authStore: useAuthStore() };
	},
	mounted() {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			this.store.toggleTheme('dark');
		}
	}
};
</script>
