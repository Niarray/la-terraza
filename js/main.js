const menuData = {
	colombia: [
		{ name: "Arepa de la casa", desc: "Arepa colombiana con relleno del día.", price: "4,50 €" },
		{ name: "Empanadas colombianas", desc: "Bocados crujientes para compartir.", price: "2,50 €" },
		{ name: "Patacones", desc: "Plátano verde crujiente con acompañamiento.", price: "5,50 €" },
		{ name: "Especial colombiano", desc: "Pregunta por el plato casero disponible.", price: "Consultar" },
	],
	vasco: [
		{ name: "Pintxo del día", desc: "Una propuesta diferente según la cocina.", price: "2,50 €" },
		{ name: "Tortilla de patata", desc: "Un clásico de la barra.", price: "2,50 €" },
		{ name: "Pintxo-pote", desc: "La combinación para jueves y viernes.", price: "Consultar" },
		{ name: "Bocado de temporada", desc: "Pregunta por las opciones disponibles.", price: "Consultar" },
	],
	zumos: [
		{ name: "Mango tropical", desc: "Fruta tropical, recién preparado.", price: "4,00 €" },
		{ name: "Maracuyá", desc: "Ácido, aromático y refrescante.", price: "4,00 €" },
		{ name: "Lulo", desc: "Un sabor colombiano muy especial.", price: "4,00 €" },
		{ name: "Zumo de temporada", desc: "Consulta las frutas disponibles del día.", price: "3,50 €" },
	],
};

const menuList = document.querySelector("#menu-list");
const menuTabs = document.querySelectorAll(".menu-tab");

function renderMenu(category) {
	if (!menuList || !menuData[category]) {
		return;
	}

	menuList.replaceChildren(...menuData[category].map((item) => {
		const row = document.createElement("article");
		row.className = "menu-item";

		const details = document.createElement("div");
		const name = document.createElement("h3");
		name.textContent = item.name;
		const description = document.createElement("p");
		description.textContent = item.desc;
		details.append(name, description);

		const price = document.createElement("div");
		price.className = "price";
		price.textContent = item.price;
		row.append(details, price);
		return row;
	}));
}

menuTabs.forEach((button) => {
	button.addEventListener("click", () => {
		menuTabs.forEach((tab) => {
			tab.classList.remove("active");
			tab.setAttribute("aria-selected", "false");
		});
		button.classList.add("active");
		button.setAttribute("aria-selected", "true");
		renderMenu(button.dataset.menu);
	});
});

renderMenu("colombia");

const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#navlinks");

function closeNav() {
	if (!hamburger || !nav) {
		return;
	}
	hamburger.setAttribute("aria-expanded", "false");
	hamburger.setAttribute("aria-label", "Abrir menú");
	nav.classList.remove("open");
}

if (hamburger && nav) {
	hamburger.addEventListener("click", () => {
		const isOpen = hamburger.getAttribute("aria-expanded") !== "true";
		hamburger.setAttribute("aria-expanded", String(isOpen));
		hamburger.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
		nav.classList.toggle("open", isOpen);
	});

	nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
	document.addEventListener("click", (event) => {
		if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
			closeNav();
		}
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeNav();
		}
	});
}

const header = document.querySelector("#header");
const year = document.querySelector("#year");

if (year) {
	year.textContent = new Date().getFullYear();
}

if (header) {
	const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 12);
	updateHeader();
	window.addEventListener("scroll", updateHeader, { passive: true });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	revealElements.forEach((element) => observer.observe(element));
} else {
	revealElements.forEach((element) => element.classList.add("visible"));
}
