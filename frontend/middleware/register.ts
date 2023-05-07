export default defineNuxtRouteMiddleware((to, from) => {
	if (localStorage.getItem('jwt') !== null) {
		return navigateTo('/');
	}
});
