<template>
	<header
		class="header sticky top-0 z-10 mb-10 bg-white py-2 shadow-[0_5px_5px_-5px_rgba(34,60,80,0.6)] dark:bg-black"
	>
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between gap-8">
				<div class="logo flex-initial">
					<a href="/" class="logo__link"
						><img src="/img/logo.svg" alt="Logo" class="logo__img dark:invert"
					/></a>
				</div>
				<nav class="menu hidden flex-1 md:block">
					<ul class="menu__list flex justify-end gap-2.5">
						<li
							class="menu__item dark:invert"
							v-for="(item, index) in menuLinks"
							:key="index"
						>
							<NuxtLink
								:to="item.link"
								class="menu__link relative cursor-pointer p-2 font-bold uppercase tracking-widest"
								>{{ item.title }}</NuxtLink
							>
						</li>
					</ul>
				</nav>
				<div class="flex items-center gap-4">
					<button
						class="border px-6 py-2"
						@click="showModal()"
						v-if="!authStore.isLogged"
					>
						Войти
					</button>
					<div class="dropdown relative z-50 px-8 text-center" v-else>
						<button class="h-12 w-12">
							<avatar-component
								:src="authStore.user.avatar"
								:canBeChange="false"
								class="h-full w-full"
								:showPlaceholder="true"
							/>
						</button>
						<ul
							class="dropdown-content profile-menu absolute left-0 hidden w-full overflow-auto border bg-white"
						>
							<li class="profile-menu__link">
								<NuxtLink :to="`/profile/${this.authStore.user.id}`"
									>Профиль</NuxtLink
								>
							</li>
							<li class="profile-menu__link" @click="authStore.logout">
								Выйти
							</li>
						</ul>
					</div>

					<div>
						<Icon
							v-if="$i18n.locale != 'ru'"
							icon="flagpack:ru"
							width="30"
							height="30"
							@click="$i18n.locale = 'ru'"
							class="cursor-pointer"
						/>
						<Icon
							v-else
							icon="flagpack:gb-nir"
							width="30"
							height="30"
							@click="$i18n.locale = 'en'"
							class="cursor-pointer"
						/>
					</div>
					<div>
						<Icon
							v-if="store.themeMode != 'dark'"
							icon="fluent:dark-theme-24-regular"
							width="30"
							height="30"
							class="cursor-pointer"
							@click="store.toggleTheme('dark')"
						/>
						<Icon
							v-else
							icon="fluent:dark-theme-24-regular"
							width="30"
							height="30"
							class="cursor-pointer text-white"
							@click="store.toggleTheme('light')"
						/>
					</div>
					<button
						class="menu__mobile-button relative z-50 md:hidden"
						@click="isMobileMenuActive = !isMobileMenuActive"
					>
						<Icon
							icon="uil:bars"
							:class="{ hidden: isMobileMenuActive }"
							height="30"
							width="30"
							class="dark:invert"
						/>
						<Icon
							icon="fa6-solid:xmark"
							:class="{ hidden: !isMobileMenuActive }"
							height="30"
							width="30"
						/>
					</button>
				</div>
			</div>
			<div
				class="mobile-menu absolute top-0 left-0 h-screen w-screen -translate-y-full duration-700"
				:class="{ menu__list_active: isMobileMenuActive }"
			>
				<nav class="menu h-full">
					<ul
						class="menu__list flex h-full flex-col items-center justify-center gap-2.5 bg-blue-400"
					>
						<li
							class="menu__item"
							v-for="(item, index) in menuLinks"
							:key="index"
						>
							<NuxtLink
								:to="item.link"
								class="menu__link relative cursor-pointer p-2 font-bold uppercase"
								@click="isMobileMenuActive = false"
								>{{ item.title }}</NuxtLink
							>
						</li>
					</ul>
				</nav>
			</div>
			<auth-form />
		</div>
	</header>
</template>

<script>
import { useThemeStore, useAuthStore } from '@/store/index';
import { Icon } from '@iconify/vue';
import AuthForm from '@/components/AuthForm.vue';
import AvatarComponent from '@/components/AvatarComponent.vue';

export default {
	components: {
		Icon,
		AuthForm,
		AvatarComponent
	},
	setup() {
		return {
			store: useThemeStore(),
			authStore: useAuthStore()
		};
	},
	data() {
		return {
			menuLinks: [
				{ title: this.$t('about'), link: '#about' },
				{ title: this.$t('skills'), link: '#skills' },
				{ title: this.$t('projects'), link: '#projects' },
				{ title: 'Добавить рецепт', link: '/add-recipe' }
			],
			isMobileMenuActive: false
		};
	},
	methods: {
		showModal() {
			this.authStore.toggleShow();
		}
	},
	watch: {
		'$i18n.locale'(newVal, oldVal) {
			this.menuLinks = [
				{ title: this.$t('about'), link: '#about' },
				{ title: this.$t('skills'), link: '#skills' },
				{ title: this.$t('projects'), link: '#projects' }
			];
		}
	}
};
</script>

<style lang="scss" scoped>
.menu__link {
	&::after {
		content: '';
		background-color: black;
		position: absolute;
		z-index: -1;
		inset: 90% 0 0 0;
		transition: 0.3s;
		border-radius: 5px;
	}
	&:hover {
		font: 500 3rem;
		color: white;

		&::after {
			inset: 0 0 0 0;
		}
	}
}
.dropdown:hover .dropdown-content {
	display: block;
}
.menu__list_active {
	@apply translate-y-0 opacity-100;
}

.profile-menu__link {
	@apply cursor-pointer border-b py-2 last:border-b-0 hover:bg-gray-100;
}
</style>
