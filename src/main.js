import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getSearchResult } from './js/pixabay-api';
import { markupRender } from './js/render-functions';

const refs = {
	form: document.querySelector('form'),
	loader: document.querySelector('.loader'),
	gallery: document.querySelector('.gallery'),
	loadMoreBtn: document.querySelector('.load-more'),
};

let lightbox;
let currentPage = 1;
let querySearch = '';

hideLoader();
hideLoadMore();

refs.form.addEventListener('submit', getImgFromSearch);
refs.loadMoreBtn.addEventListener('click', loadMoreImages);

function getImgFromSearch(e) {
	e.preventDefault();
	refs.gallery.innerHTML = '';
	hideLoadMore();
	showLoader();

	querySearch = e.target.elements.search.value.trim();
	currentPage = 1;

	if (!querySearch) {
		showMessage('Please enter a search term!');
		hideLoader();
		return;
	}

	getSearchResult(querySearch, currentPage)
		.then(data => {
			refs.gallery.innerHTML = markupRender(data.hits);
			showLoadMore(data.totalHits);
			initLightbox();
		})
		.catch(error => {
			showMessage(
				'Sorry, there are no images matching <br> your search query. Please try again!'
			);
		})
		.finally(() => {
			hideLoader();
		});

	e.target.reset();
}

function loadMoreImages() {
	showLoader();
	currentPage++;

	getSearchResult(querySearch, currentPage)
		.then(data => {
			refs.gallery.insertAdjacentHTML('beforeend', markupRender(data.hits));
			showLoadMore(data.totalHits);
			lightbox.refresh();
			scrollPage();
		})
		.catch(error => {
			showMessage("We're sorry, but you've reached the end of search results.");
			hideLoadMore();
		})
		.finally(() => {
			hideLoader();
		});
}

function showLoader() {
	refs.loader.style.display = 'block';
}

function hideLoader() {
	refs.loader.style.display = 'none';
}

function hideLoadMore() {
	refs.loadMoreBtn.style.display = 'none';
}

function showLoadMore(totalHits) {
	const totalPages = Math.ceil(totalHits / 40);
	if (currentPage < totalPages) {
		refs.loadMoreBtn.style.display = 'block';
	} else {
		hideLoadMore();
		showMessage("We're sorry, but you've reached the end of search results.");
	}
}

function showMessage(message) {
	iziToast.warning({
		message: message,
		titleColor: '#fff',
		titleSize: '16px',
		titleLineHeight: '1.5',
		messageColor: '#fff',
		messageSize: '16px',
		messageLineHeight: '1.5',
		backgroundColor: '#ef4040',
		iconUrl: './img/octagon.svg',
		position: 'topRight',
	});
}

function initLightbox() {
	if (lightbox) {
		lightbox.refresh();
	} else {
		lightbox = new SimpleLightbox('.gallery a', {
			captions: true,
			captionsData: 'alt',
			captionDelay: 250,
		});
	}
}

function scrollPage() {
	const { height } = refs.gallery.firstElementChild.getBoundingClientRect();
	window.scrollBy({
		top: height * 2,
		behavior: 'smooth',
	});
}
