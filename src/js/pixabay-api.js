import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://pixabay.com/api/',
	params: {
		key: '49094425-ee2da42b6a4a3e6a1c3a9f546',
		image_type: 'photo',
		orientation: 'horizontal',
		safesearch: true,
		per_page: 40,
	},
});

export async function getSearchResult(query, page) {
	const response = await axiosInstance.get('', { params: { q: query, page } });

	if (response.data.hits.length === 0) {
		throw new Error('No images found');
	}

	return response.data;
}
