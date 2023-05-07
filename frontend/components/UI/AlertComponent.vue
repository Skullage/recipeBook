<template>
	<teleport to="body">
		<div
			class="fixed top-0 left-0 z-50 flex h-20 w-full items-center gap-2"
			:style="store.getStyles"
			v-if="store.msg != ''"
		>
			<Icon :icon="store.icon" width="32" height="32" class="ml-8 basis-8" />
			<p class="flex-1">{{ store.msg }}</p>
			<button>
				<Icon
					icon="material-symbols:close-rounded"
					width="32"
					height="32"
					class="mr-8 text-gray-600/60"
					@click="store.closeAlert"
				/>
			</button>
		</div>
	</teleport>
</template>

<script setup>
import { useAlertStore } from '@/store/index';
import { Icon } from '@iconify/vue';

const store = useAlertStore();
</script>
