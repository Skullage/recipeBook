export const formatDate = date => {
	const buffer = new Date(date);
	let day = buffer.getDate() < 10 ? '0' + buffer.getDate() : buffer.getDate();
	let month =
		buffer.getMonth() + 1 < 10 ? '0' + buffer.getMonth() : buffer.getMonth();
	let year = buffer.getFullYear();
	return `${day}.${month}.${year}`;
};
