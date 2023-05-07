<template>
	<div class="relative cursor-pointer rounded-full border">
		<button
			class="absolute left-10 top-10 z-10 cursor-pointer rounded-full border border-gray-200 bg-white p-1 hover:border-sky-400 hover:bg-sky-400"
			@click="deleteAvatar(props.src)"
			v-if="props.canBeChange && props.src != ''"
		>
			<icon icon="mdi:delete" height="32" width="32" />
		</button>
		<img
			:src="
				(props.src == '') & props.showPlaceholder
					? `${API_URL}/avatars/placeholder.png`
					: `${API_URL}/avatars/${props.src}`
			"
			class="avatar__img mx-auto h-full w-full rounded-full object-cover"
			:class="{ 'hover:opacity-80': props.canBeChange }"
			alt="Аватар"
			@click="$refs.avatarChange.click"
		/>
		<div
			class="avatar__upload pointer-events-none absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-200"
			v-if="props.canBeChange"
			:class="{ '!block': authStore.user.avatar == '' }"
		>
			<icon
				icon="mdi:tray-arrow-up"
				class="pointer-events-none mx-auto"
				height="32"
				width="32"
			/>
			<p class="pointer-events-none">загрузить</p>
		</div>
		<input
			type="file"
			class="hidden"
			ref="avatarChange"
			accept="image/*"
			@change="uploadAvatar"
			v-if="props.canBeChange"
		/>
	</div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/store/index';
import API_URL from '@/config/config';
import * as users from '@/services/users';

const authStore = useAuthStore();

const props = defineProps({
	src: String,
	canBeChange: Boolean,
	showPlaceholder: { type: Boolean, default: false }
});

const emits = defineEmits(['uploadAvatar', 'deleteAvatar']);

const uploadAvatar = async event => {
	const file = event.target.files[0];
	const data = new FormData();
	data.append('file', file, authStore.user.id);
	await users.uploadAvatar(data, localStorage.getItem('jwt')).then(response => {
		if (props.src != '') {
			deleteAvatar(props.src);
		}
		authStore.setAvatar(response.data.avatar);
		emits('uploadAvatar');
	});
};
const deleteAvatar = async src => {
	await users.deleteAvatar(authStore.user.id, src).then(response => {
		authStore.setAvatar('');
		emits('deleteAvatar');
	});
};
</script>

<style lang="scss" scoped>
.avatar__img:hover ~ .avatar__upload {
	display: block;
}
</style>
