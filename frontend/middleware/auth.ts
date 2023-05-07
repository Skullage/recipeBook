import { useAuthStore } from '@/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore();
	if (localStorage.getItem('jwt') === null) {
		return authStore.toggleShow(), navigateTo('/');
	}
});
