import { useAuthStore } from '@/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore();
	if (authStore.token === null) {
		return authStore.openModal(), navigateTo('/');
	}
});
