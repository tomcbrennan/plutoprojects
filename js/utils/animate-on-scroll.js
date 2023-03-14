import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Apply animations to elements
 */
export default function initAnimateOnScroll() {
	const elementsUp = document.querySelectorAll('[data-animate-up]')
	const elementsDown = document.querySelectorAll('[data-animate-down]')
	const elementsRight = document.querySelectorAll('[data-animate-right]')
	const elementsLeft = document.querySelectorAll('[data-animate-left]')
	const elementsIn = document.querySelectorAll('[data-animate-in]')

	elementsUp.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: 'top bottom-=20%',
			},
			y: 16,
			opacity: 0,
			duration: 1,
			delay: 0.2,
		}

		// Animation time
		gsap.from(element, settings)
	})

	elementsDown.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: 'top bottom-=20%',
			},
			y: -16,
			opacity: 0,
			duration: 1,
			delay: 0.2,
		}

		// Animation time
		gsap.from(element, settings)
	})

	elementsRight.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: 'top bottom-=20%',
			},
			x: -32,
			opacity: 0,
			duration: 1,
			delay: 0.2,
		}

		// Animation time
		gsap.from(element, settings)
	})

	elementsLeft.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: 'top bottom-=20%',
			},
			x: 32,
			opacity: 0,
			duration: 1,
			delay: 0.2,
		}

		// Animation time
		gsap.from(element, settings)
	})

	elementsIn.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: 'top bottom-=20%',
			},
			opacity: 0,
			duration: 1,
			delay: 0.2,
		}

		// Animation time
		gsap.from(element, settings)
	})

	// HIDE HEADER ON SCROLL

	const header = document.querySelector('header');

	let previousScrollPosition = 0;

	window.addEventListener('scroll', function() {
	const currentScrollPosition = window.scrollY;
	if (currentScrollPosition > previousScrollPosition && currentScrollPosition > 100) {
		header.style.top = "-100px";
	} else {
		header.style.top = "0px";
	}
	previousScrollPosition = currentScrollPosition;
	});


	// TRACE ON SCROLL --------------------

	const svgs = document.querySelectorAll('.draw-in');

	svgs.forEach((svg) => {

	  	const paths = svg.querySelectorAll('path');

		paths.forEach((path) => {

			// Get the length of the path
			const pathLength = path.getTotalLength();

			// Set the initial stroke-dasharray and stroke-dashoffset properties
			path.style.strokeDasharray = pathLength;
			path.style.strokeDashoffset = pathLength;

			// Create a GSAP animation
			gsap.to(path, {
			duration: 3,
			strokeDashoffset: 0,
			delay: 0.4,
			ease: "power3.easeInOut",
				scrollTrigger: {
					trigger: path,
					start: "top bottom",
					end: "bottom center",
				},
			});
			
			
		})
	});
}