/* ==========================================
   TADARI EVENTS
   MAIN JAVASCRIPT
========================================== */


/* ==========================================
   MOBILE MENU
========================================== */

const mobileMenu = document.getElementById("mobileMenu");

if (mobileMenu) {

    mobileMenu.addEventListener("click", () => {

        document.querySelector(".main-nav")
            ?.classList.toggle("mobile-open");

    });

}


/* ==========================================
   EVENT SEARCH
========================================== */

const searchInput =
    document.getElementById("searchInput");

const locationSelect =
    document.getElementById("locationSelect");

const searchButton =
    document.getElementById("searchButton");

const eventsGrid =
    document.getElementById("eventsGrid");

const emptyState =
    document.getElementById("emptyState");


function filterEvents() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();

    const locationValue =
        locationSelect.value;

    const events =
        document.querySelectorAll(".event-card");

    let visibleEvents = 0;


    events.forEach(event => {

        const eventName =
            event.dataset.name.toLowerCase();

        const eventLocation =
            event.dataset.location;

        const matchesSearch =
            eventName.includes(searchValue);

        const matchesLocation =
            locationValue === "all" ||
            eventLocation === locationValue;


        if (
            matchesSearch &&
            matchesLocation
        ) {

            event.style.display = "";

            visibleEvents++;

        } else {

            event.style.display = "none";

        }

    });


    if (visibleEvents === 0) {

        emptyState.classList.add("visible");

    } else {

        emptyState.classList.remove("visible");

    }

}


/* Search button */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        filterEvents
    );

}


/* Enter key */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                filterEvents();
            }

        }
    );

}


/* Location */

if (locationSelect) {

    locationSelect.addEventListener(
        "change",
        filterEvents
    );

}


/* ==========================================
   CATEGORY FILTER
========================================== */

const categoryButtons =
    document.querySelectorAll(".category-card");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category =
            button.dataset.category;

        const events =
            document.querySelectorAll(".event-card");

        let visibleEvents = 0;


        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");


        events.forEach(event => {

            if (
                event.dataset.category === category
            ) {

                event.style.display = "";

                visibleEvents++;

            } else {

                event.style.display = "none";

            }

        });


        if (visibleEvents === 0) {

            emptyState.classList.add("visible");

        } else {

            emptyState.classList.remove("visible");

        }


        document
            .getElementById("events")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* ==========================================
   CLEAR FILTERS
========================================== */

const clearFilters =
    document.getElementById("clearFilters");


if (clearFilters) {

    clearFilters.addEventListener("click", () => {

        searchInput.value = "";

        locationSelect.value = "all";


        categoryButtons.forEach(button => {
            button.classList.remove("active");
        });


        document
            .querySelectorAll(".event-card")
            .forEach(event => {

                event.style.display = "";

            });


        emptyState.classList.remove("visible");

    });

}


/* ==========================================
   FAVORITE BUTTONS
========================================== */

const favoriteButtons =
    document.querySelectorAll(".favorite");


favoriteButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();


        if (button.textContent === "♡") {

            button.textContent = "♥";

            button.classList.add("liked");

        } else {

            button.textContent = "♡";

            button.classList.remove("liked");

        }

    });

});


/* ==========================================
   EVENT CARD INTERACTION
========================================== */

const eventCards =
    document.querySelectorAll(".event-card");


eventCards.forEach(card => {

    card.addEventListener("click", event => {

        if (
            event.target.closest(".favorite") ||
            event.target.closest(".arrow-button")
        ) {
            return;
        }

        const eventName =
            card.dataset.name;

        console.log(
            `Opening event: ${eventName}`
        );

        /*
         * Later this will navigate to:
         *
         * pages/event.html?id=...
         */

    });

});


console.log(
    "Tadari Events initialized successfully."
);
