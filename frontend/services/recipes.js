import api from '@/services/api';

export const createRecipe = async data => {
	const response = await api.post('/recipe/create', {
		title: data.title,
		desc: data.desc,
		content: data.content,
		previewImg: data.previewImg,
		author: data.author,
		ingredients: data.ingredients,
		private: data.private
	});

	return response;
};

export const setLike = async data => {
	const response = await api.post(`/like/create`, {
		postId: data.postId,
		userId: data.userId
	});
	return response;
};

export const createComment = async data => {
	const response = await api.post(`/comment/create`, {
		postId: data.postId,
		userId: data.userId,
		content: data.content
	});
	return response;
};

export const updateComment = async data => {
	const response = await api.put(`/comment/${data.commentId}/update`, {
		content: data.content
	});
	return response;
};

export const deleteLike = async data => {
	const response = await api.delete(`/like/${data.likeId}/delete`);
	return response;
};

export const deleteComment = async data => {
	const response = await api.delete(`/comment/${data.commentId}/delete`);
	return response;
};

export const getIngredients = async () => {
	const response = await api.get('/ingredients');
	return response.data;
};

export const uploadPreview = async (data, token) => {
	const response = await api.post(`/recipe/uploadPreview`, data, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return response;
};

export const getRecipes = async () => {
	const response = await api.get('/recipes');
	return response.data;
};

export const getRecipe = async id => {
	const response = await api.get(`/recipe/${id}`);
	return response;
};
