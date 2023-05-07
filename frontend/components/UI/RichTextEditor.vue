<template>
	<div>
		<h3 class="mb-2 pl-4">{{ label }}</h3>
		<QuillEditor
			v-model:content="content"
			class="!h-40 max-h-40 overflow-auto border"
			@update:content="updateValue"
			:options="options"
			contentType="html"
		/>
	</div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const toolbarOptions = [
	['bold', 'italic', 'underline', 'strike'],
	['blockquote', 'code-block'],
	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ script: 'sub' }, { script: 'super' }],
	[{ indent: '-1' }, { indent: '+1' }],
	[{ size: ['small', false, 'large', 'huge'] }],
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ color: [] }, { background: [] }],
	[{ font: [] }],
	[{ align: [] }],
	['clean'],
	['link', 'image']
];
export default {
	components: { QuillEditor },
	props: {
		label: String,
		placeholder: String,
		modelValue: String
	},
	data() {
		return {
			options: {
				modules: {
					toolbar: {
						container: toolbarOptions
					}
				},
				placeholder: this.placeholder,
				theme: 'snow'
			},
			content: this.modelValue
		};
	},
	methods: {
		updateValue() {
			this.$emit('input', JSON.stringify(this.content));
		}
	}
};
</script>
<style>
.ql-hidden {
	@apply hidden;
}
</style>
