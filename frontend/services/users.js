import api from '@/services/api';

export const getUserIp = async () => {
	const response = await api.get('https://api.ipify.org?format=json');
	return response.data.ip;
};

export const getUserCountry = async ip => {
	const response = await api.get(`http://ip-api.com/json/${ip}?fields=country`);
	return response.data.country;
};

export const createUser = async user => {
	const response = await api.post(`/user/register`, {
		login: user.login,
		password: user.password,
		email: user.email,
		role: user.role,
		birthday: user.birthday,
		country: user.country,
		phone: user.phone,
		registration_IP: user.registration_IP
	});
	return response;
};

export const getUserByEmail = async email => {
	const response = await api.get(`/user/email=${email}`);
	return response.data;
};
export const getUserByLogin = async login => {
	const response = await api.get(`/user/login=${login}`);
	return response.data;
};
export const getUserById = async id => {
	const response = await api.get(`/user/id=${id}`);
	return response.data;
};

export const auth = async user => {
	const response = await api.post(`/user/login`, {
		login: user.login,
		password: user.password
	});
	return response;
};

export const uploadAvatar = async (data, token) => {
	const response = await api.post(`/user/uploadAvatar`, data, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return response;
};

export const deleteAvatar = async (id, file) => {
	const response = await api.delete(`/user/avatar/${id}/delete`, {
		data: { id: id, avatarName: file }
	});
	return response;
};

export const getProfile = async id => {
	// const response = await api.get(`/users/profile=${id}`);
	const response = await api.get(`/user/${id}`);
	return response;
};
