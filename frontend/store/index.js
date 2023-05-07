import API_URL from '@/config/config';

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
		user: JSON.parse(localStorage.getItem('user')) || {},
		isLogged: localStorage.getItem('jwt') != undefined,
		showModal: false
	}),
	getters: {
		getAvatar() {
			return `${API_URL}/avatars/${this.user.avatar}`;
		}
	},
	actions: {
		auth(user, jwt) {
			this.isLogged = true;
			this.user = user;
			localStorage.setItem('jwt', jwt);
			localStorage.setItem('user', JSON.stringify(this.user));
		},
		setAvatar(file) {
			this.user.avatar = file;
			localStorage.setItem('user', JSON.stringify(this.user));
		},
		logout() {
			this.isLogged = false;
			this.user = {};
			localStorage.removeItem('jwt');
			localStorage.removeItem('user');
		},
		toggleShow() {
			this.showModal = !this.showModal;
		}
	}
});
