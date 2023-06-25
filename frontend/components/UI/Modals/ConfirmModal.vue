<template>
	<modal :show="modalStore.confirmModal.isShow" @close="cancel">
		<template v-slot:title>
			<h3 class="modal-title">{{ modalStore.confirmModal.title }}</h3>
		</template>
		<template v-slot:body>
			<p class="text-center">{{ modalStore.confirmModal.message }}</p>
		</template>
		<template v-slot:footer>
			<button class="btn" @click="confirm">
				{{ modalStore.confirmModal.confirmBtn }}
			</button>
			<button class="btn" @click="cancel">
				{{ modalStore.confirmModal.cancelBtn }}
			</button>
		</template>
	</modal>
</template>

<script setup>
import Modal from '@/components/UI/Modals/BaseModal.vue';
import { useModalStore } from '~~/store';

const modalStore = useModalStore();

const confirm = () => {
	modalStore.confirmModal.resolvePromise(true);
	modalStore.closeModal();
};
const cancel = () => {
	modalStore.confirmModal.resolvePromise(false);
	modalStore.closeModal();
};
</script>
