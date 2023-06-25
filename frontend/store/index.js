import API_URL from '@/config/config';
import * as users from '@/services/users';
import api from '@/services/api';

export const useThemeStore = defineStore('theme', {
	state: () => ({
		themeMode: 'light'
	}),
	getters: {},
	actions: {
		toggleTheme(mode) {
			this.themeMode = mode;
			localStorage.setItem('theme', mode);
			if (mode == 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}
});

export const useAlertStore = defineStore('alert', {
	state: () => ({
		msg: '',
		bgColor: '',
		textColor: '',
		borderColor: '',
		icon: ''
	}),
	getters: {
		getStyles() {
			return `background-color: ${this.bgColor}; color: ${this.textColor}; border-color: ${this.borderColor};`;
		}
	},
	actions: {
		printAlert(text, type) {
			this.msg = text;
			switch (type) {
				case 'success':
					this.bgColor = '#d1e7dd';
					this.textColor = '#0f5132';
					this.borderColor = '#badbcc';
					this.icon = 'mdi:check-circle';
					break;
				case 'error':
					this.bgColor = '#f8d7da';
					this.textColor = '#842029';
					this.borderColor = '#f5c2c7';
					this.icon = 'mdi:alert-circle';
					break;
				case 'warning':
					this.bgColor = '#fff3cd';
					this.textColor = '#664d03';
					this.borderColor = '#ffecb5';
					this.icon = 'mdi:warning';
					break;
				case 'info':
					this.bgColor = '#cff4fc';
					this.textColor = '#055160';
					this.borderColor = '#b6effb';
					this.icon = 'mdi:information-outline';
					break;
			}
		},
		closeAlert() {
			this.msg = '';
		}
	}
});

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user:
			JSON.parse(localStorage.getItem('user')) ||
			JSON.parse(sessionStorage.getItem('user')) ||
			{},
		showModal: false,
		token: localStorage.getItem('jwt') || sessionStorage.getItem('jwt') || '',
		status: ''
	}),
	getters: {
		getAvatar() {
			return `${API_URL}/avatars/${this.user.avatar}`;
		},
		isLogged() {
			return !!this.token;
		},
		authStatus() {
			return this.status;
		}
	},
	actions: {
		async auth(login, password, isAnotherComputer) {
			await users
				.auth({ login, password })
				.then(response => {
					this.token = response.data.token;
					this.user = response.data.user;
					if (isAnotherComputer) {
						sessionStorage.setItem('jwt', this.token);
						sessionStorage.setItem('user', JSON.stringify(this.user));
					} else {
						localStorage.setItem('jwt', this.token);
						localStorage.setItem('user', JSON.stringify(this.user));
					}
					this.status = 'success';
					api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
					this.closeModal();
				})
				.catch(error => {
					this.status = error;
					console.log(error);
				});
		},
		setAvatar(file) {
			this.user.avatar = file;
			localStorage.setItem('user', JSON.stringify(this.user));
		},
		logout() {
			this.user = {};
			this.token = '';
			localStorage.removeItem('jwt');
			localStorage.removeItem('user');
			delete api.defaults.headers.common['Authorization'];
		},
		openModal() {
			this.showModal = true;
		},
		closeModal() {
			this.showModal = false;
		}
	}
});

export const useModalStore = defineStore('modal', {
	state: () => ({
		confirmModal: {
			title: '',
			message: '',
			confirmBtn: 'Да',
			cancelBtn: 'Нет',
			isShow: false,
			resolvePromise: undefined,
			rejectPromise: undefined
		}
	}),
	actions: {
		async showModal(options = {}) {
			this.confirmModal.title = options.title;
			this.confirmModal.message = options.message;
			this.confirmModal.confirmBtn = options.confirmBtn;
			this.confirmModal.cancelButton = options.cancelBtn;
			this.confirmModal.isShow = true;
			return new Promise((resolve, reject) => {
				this.confirmModal.resolvePromise = resolve;
				this.confirmModal.rejectPromise = reject;
			});
		},
		closeModal() {
			this.confirmModal.isShow = false;
		}
	}
});
