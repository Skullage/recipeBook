import api from '@/services/api';

export const createRecipe = async data => {
	const response = await api.post('/recipes', {
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
	const response = await api.post(`/likes/${data.postId}`, {
		userId: data.userId
	});
	return response;
};

export const deleteLike = async data => {
	const response = await api.delete(`/likes/${data.likeId}`);
	return response;
};

export const getIngredients = async () => {
	const response = await api.get('/ingredients');
	return response.data;
};

export const uploadPreview = async (data, token) => {
	const response = await api.post(`/uploadPreview`, data, {
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
	const response = await api.get(`/recipes/id=${id}`);
	console.log(response);
	return response;
};
