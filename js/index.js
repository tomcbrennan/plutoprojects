import gsap from 'gsap'
import Swiper from 'swiper/bundle'
import animateOnScroll from './utils/animate-on-scroll'

document.addEventListener('DOMContentLoaded', () => {
	toggleMenu()
	animateOnScroll()

	// PRODUCTS SLIDER
	if (document.querySelector('.products-slider')) {
		const productsSlider = new Swiper('.products-slider', {
			direction: 'horizontal',
			loop: false,
			scrollbar: {
				el: '.swiper-scrollbar',
				hide: false,
				draggable: true,
			},
			speed: 500,
			slidesPerView: 1,
			spaceBetween: 20,
			breakpoints: {
				640: {
					slidesPerView: 2,
					width: 550,
				},
				1300: {
					slidesPerView: 2,
					width: 600,
				},
				1600: {
					slidesPerView: 2,
					width: 650,
				},
			},
		})

		// HIDE TEXT NEXT TO SLIDER ON DESKTOP ON SLIDE CHANGE
		if (window.innerWidth > 1024) {
			const productsSliderContent = document.querySelector(
				'.products-slider-content'
			)

			productsSlider.on('slideChange', function () {
				if (productsSlider.activeIndex === 0) {
					productsSliderContent.classList.remove('hide')
				} else {
					productsSliderContent.classList.add('hide')
				}
			})
		}
	}

	// PRODUCT GALLERY SLIDER

	if (document.querySelector('.product-gallery-slider')) {
		const productGallerySlider = new Swiper('.product-gallery-slider', {
			direction: 'horizontal',
			loop: false,
			scrollbar: {
				el: '.swiper-scrollbar',
				hide: false,
				draggable: true,
			},
			speed: 500,
			slidesPerView: 4,
			spaceBetween: 20,
		})

		// TOGGLE ACTIVE IMAGE WHEN CLICKED
		const featuredImage = document.querySelector('.featured-image source')
		const galleryImages = document.querySelectorAll(
			'.product-gallery-image img'
		)

		galleryImages.forEach((image) => {
			image.addEventListener('click', () => {
				featuredImage.src = image.src
				featuredImage.alt = image.alt
				featuredImage.setAttribute('srcset', image.src)
			})
		})
	}

	// PRODUCTS TABS

	if (document.querySelector('.tabs')) {
		const defaultTab = document.querySelector('.tab[data-tab="all_products"]')
		const defaultTabContent = document.querySelector(
			'.tab-content[data-tab="all_products"]'
		)
		const tabs = document.querySelectorAll('.tab')
		defaultTab.classList.add('active')
		defaultTabContent.classList.add('active')

		tabs.forEach((tab) => {
			tab.addEventListener('click', () => {
				tabs.forEach((tab) => tab.classList.remove('active'))

				tab.classList.add('active')

				const tabContent = document.querySelector(
					`.tab-content[data-tab="${tab.dataset.tab}"]`
				)

				const tabContents = document.querySelectorAll('.tab-content')

				tabContents.forEach((tabContent) =>
					tabContent.classList.remove('active')
				)

				tabContent.classList.add('active')
			})
		})
	}

	// ACCORDION

	if (document.querySelector('.accordion')) {
		const accordionHeaders = document.querySelectorAll('.accordion-header')

		accordionHeaders.forEach((header) => {
			const isActive = header.classList.contains('active')

			const accordionContent = header.nextElementSibling
			accordionContent.style.maxHeight = isActive
				? accordionContent.scrollHeight + 'px'
				: 0

			header.addEventListener('click', () => {
				header.classList.toggle('active')
				const accordionContent = header.nextElementSibling
				if (header.classList.contains('active')) {
					accordionContent.style.maxHeight =
						accordionContent.scrollHeight + 'px'
				} else {
					accordionContent.style.maxHeight = 0
				}
			})
		})
	}

	// ANIMATE LINE BASED ON SCROLL POSITION AND WIDTH FROM LEFT OF SCREEN

	if (document.querySelector('.line-left') && window.innerWidth > 768) {
		const lineLeftElements = document.querySelectorAll('.line-left')

		window.addEventListener('scroll', function () {
			for (let i = 0; i < lineLeftElements.length; i++) {
				const boundingRect = lineLeftElements[i].getBoundingClientRect()
				const parentRect =
					lineLeftElements[i].parentNode.getBoundingClientRect()

				const triggerPosition =
					parentRect.bottom +
					boundingRect.top +
					boundingRect.height * (3 / 4) -
					window.innerHeight

				if (window.scrollY >= triggerPosition) {
					const lineElement = document.createElement('div')

					lineElement.style.position = 'absolute'
					lineElement.style.top = '50%'
					lineElement.style.transform = `translateY(-50%)`
					lineElement.style.left = '0'
					lineElement.style.width = '100%'
					lineElement.style.height = '1px'
					lineElement.style.backgroundColor = '#9A5026'
					lineElement.style.zIndex = 999

					const parentElement = lineLeftElements[i].parentNode
					parentElement.appendChild(lineElement)

					const width = boundingRect.left - 60

					let currentWidth = 0

					const animateLine = () => {
						currentWidth += 2.5;
						lineElement.style.width = `${currentWidth}px`

						if (currentWidth >= width) {
							return
						}

						requestAnimationFrame(animateLine)
					}

					animateLine()
				}
			}
		})
	}

	if (document.querySelector('.line-right') && window.innerWidth > 768) {
		const lineRightElements = document.querySelectorAll('.line-right');
	
		window.addEventListener('scroll', function () {
			for (let i = 0; i < lineRightElements.length; i++) {
				const boundingRect = lineRightElements[i].getBoundingClientRect();
				const parentRect = lineRightElements[i].parentNode.getBoundingClientRect();
	
				const triggerPosition =
					parentRect.bottom +
					boundingRect.top +
					boundingRect.height / 2 -
					window.innerHeight / 2 +
					window.innerHeight; // move trigger position down by height of viewport
	
				if (window.scrollY >= triggerPosition) {
					const lineElement = document.createElement('div');
	
					lineElement.style.position = 'absolute';
					lineElement.style.top = '50%';
					lineElement.style.transform = `translateY(-50%)`;
					lineElement.style.right = '0';
					lineElement.style.width = '0';
					lineElement.style.height = '1px';
					lineElement.style.backgroundColor = '#9A5026';
					lineElement.style.zIndex = 999;
	
					const parentElement = lineRightElements[i].parentNode;
					parentElement.appendChild(lineElement);
	
					const width = window.innerWidth - boundingRect.right - 60;
	
					let currentWidth = 0;
	
					const animateLine = () => {
						currentWidth += 2.5;
						lineElement.style.width = `${currentWidth}px`;
	
						if (currentWidth >= width) {
							return;
						}
	
						requestAnimationFrame(animateLine);
					};
	
					animateLine();
				}
			}
		});
	}
	
})

/**
 * Toggle the state of the mobile menu
 *
 * @returns void
 */
const toggleMenu = () => {
	const menuButtons = document.querySelectorAll('[data-toggle-menu]')

	menuButtons.forEach((btn) => {
		btn.addEventListener('click', () => {
			document.body.classList.toggle('menuIsOpen')
			document.documentElement.classList.toggle('overflow-hidden')
		})
	})
}
