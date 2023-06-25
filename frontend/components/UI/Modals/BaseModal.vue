<template>
	<teleport to="body">
		<div
			class="fixed top-0 left-0 z-40 flex h-full w-full items-end justify-center backdrop-blur-lg duration-500 lg:items-center"
			role="dialog"
			:class="[{ '-translate-y-full opacity-0': !props.show }]"
		>
			<div
				class="flex h-auto max-h-full w-full flex-col rounded border bg-white dark:bg-dark dark:text-white lg:max-h-[80%] lg:w-1/4"
			>
				<h3
					class="modal-title relative mb-4 border-b py-8 text-center text-2xl"
				>
					<slot name="title">Заголовок</slot>
					<button
						class="absolute right-0 top-0 mr-3 mt-3 h-6 w-6"
						@click="closeModalWindow"
					>
						<Icon
							icon="material-symbols:close"
							width="24"
							height="24"
							class="text-black"
						/>
					</button>
				</h3>

				<div class="modal-content flex-1 overflow-y-auto px-4">
					<slot name="body">Дефолтный контент модального окна</slot>
				</div>

				<div
					class="modal-footer relative bottom-0 left-0 flex flex-wrap justify-center gap-2 py-2 lg:gap-10"
				>
					<slot name="footer"> </slot>
				</div>
			</div>
		</div>
	</teleport>
</template>
<script setup>
import { Icon } from '@iconify/vue';
const props = defineProps({
	show: Boolean
});
const emits = defineEmits(['close']);
const open = () => {
	show.value = true;
};
const close = () => {
	show.value = false;
};
const closeModalWindow = () => {
	emits('close');
};
</script>
