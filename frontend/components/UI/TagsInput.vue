<template>
	<div class="tags-input-container">
		<h3 class="mb-2 pl-4">{{ label }}</h3>
		<div class="tags-input" @click="focusTagInput()">
			<div class="mb-3 flex gap-3 pl-4">
				<div
					class="rounded border px-2"
					v-for="(selectedTag, index) in tagsArray"
					:key="index"
				>
					{{ selectedTag }}
					<span class="remove-tag cursor-pointer" @click="removeTag(index)"
						>×</span
					>
				</div>
			</div>
			<input
				type="text"
				ref="input"
				class="w-full border-b pl-4 outline-none"
				v-model="currentTag"
				@keyup.enter="addNewTag"
				@keydown.up.prevent="changeIndex('up')"
				@keydown.down.prevent="changeIndex('down')"
				@keydown.delete="handleDelete"
				@blur="onClose()"
				:placeholder="placeholder"
			/>
		</div>
		<div class="tag-autocomplete border" v-show="showAutocomplete">
			<div
				class="cursor-pointer border-b p-2 last:border-b-0 hover:bg-gray-200"
				v-for="(tag, index) in searchedTags"
				@:click="selectTag(tag)"
				:key="index"
			>
				{{ tag }}
			</div>
		</div>
	</div>
</template>
<script>
import { useAlertStore } from '@/store/index';
export default {
	props: {
		existingTags: Array,
		placeholder: String,
		label: String
	},
	setup() {
		return { alert: useAlertStore() };
	},
	data() {
		return {
			currentTag: '',
			tagsArray: [],
			searchSelectedIndex: -1,
			isSearchPaused: false,
			searchedTags: []
		};
	},
	computed: {
		showAutocomplete() {
			return this.searchedTags.length > 0;
		}
	},
	methods: {
		selectTag(tag) {
			if (!this.checkDuplicates(tag)) {
				this.tagsArray.push(tag.toLowerCase());
				this.$emit('addTag', this.tagsArray);
				this.resetInputs();
			} else {
				this.alert.printAlert(`${tag} уже добавлен`, 'error');
				this.resetInputs();
			}
		},
		addNewTag() {
			if (!this.checkDuplicates(this.currentTag)) {
				let newTagName = this.currentTag.toLowerCase();
				this.tagsArray.push(newTagName);
				this.$emit('addTag', this.tagsArray);
				this.$emit('createTag', this.tagsArray);
				this.resetInputs();
			} else {
				this.alert.printAlert(`${this.currentTag} уже добавлен`, 'error');
				this.resetInputs();
			}
		},
		removeTag(tagIndex) {
			this.tagsArray.splice(tagIndex, 1);
		},
		changeIndex(direction) {
			this.isSearchPaused = true;
			if (direction == 'up' && this.searchSelectedIndex - 1 > -1) {
				this.searchSelectedIndex -= 1;
				this.currentTag = this.searchedTags[this.searchSelectedIndex];
			}

			if (
				direction == 'down' &&
				this.searchSelectedIndex + 1 <= this.searchedTags.length - 1
			) {
				this.searchSelectedIndex += 1;
				this.currentTag = this.searchedTags[this.searchSelectedIndex];
			}
		},
		checkDuplicates(tagName) {
			return this.tagsArray.indexOf(tagName.toLowerCase()) > -1;
		},
		resetInputs() {
			this.currentTag = '';
			this.searchedTags = [];
			this.isSearchPaused = false;
			this.searchSelectedIndex = -1;
		},
		focusTagInput() {
			this.$refs.input.focus();
			this.getSearchedTags();
		},
		getSearchedTags() {
			if (!this.isSearchPaused) {
				const bufer = [];
				for (let i = 0; i < this.existingTags.length; i++) {
					if (
						this.existingTags[i].title
							.substring(0, this.currentTag.length)
							.toLowerCase() == this.currentTag.toLowerCase() &&
						!this.tagsArray.includes(this.existingTags[i].title.toLowerCase())
					) {
						bufer.push(this.existingTags[i].title);
					}
				}
				this.searchedTags = bufer;
			} else {
				this.searchedTags = [];
			}
		},
		handleDelete() {
			this.isSearchPaused = false;
			this.searchSelectedIndex = -1;
		},
		onClose() {
			this.searchedTags = [];
		}
	},
	watch: {
		currentTag(oldVal, newVal) {
			this.getSearchedTags();
		}
	}
};
</script>

<style lang="scss" scoped></style>
