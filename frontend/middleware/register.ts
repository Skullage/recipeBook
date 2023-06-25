import { useAuthStore } from '@/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
	if (authStore.token !== null) {
		return navigateTo('/');
	}
});
