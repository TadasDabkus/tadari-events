/* ==========================================
   TADARI EVENTS
   MAIN JAVASCRIPT
========================================== */


/* ==========================================
   MOBILE MENU
========================================== */

const mobileMenu =
    document.getElementById("mobileMenu");

const mainNav =
    document.querySelector(".main-nav");


if (mobileMenu && mainNav) {

    mobileMenu.addEventListener("click", () => {

        mainNav.classList.toggle("mobile-open");

    });

}


/* ==========================================
   SEARCH ELEMENTS
========================================== */

const searchInput =
    document.getElementById("searchInput");

const locationSelect =
    document.getElementById("locationSelect");

const searchButton =
    document.getElementById("searchButton");

const emptyState =
    document.getElementById("emptyState");

const events =
    document.querySelectorAll(".event-card");

const categoryButtons =
    document.querySelectorAll(".category-card");

const clearFilters =
    document.getElementById("clearFilters");


/* ==========================================
   FILTER EVENTS
========================================== */

function filterEvents() {

    const searchValue =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    const locationValue =
        locationSelect
            ? locationSelect.value
            : "all";


    let visibleEvents = 0;


    events.forEach(event => {

        const eventName =
            (event.dataset.name || "").toLowerCase();

        const eventLocation =
            event.dataset.location || "";

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


    updateEmptyState(visibleEvents);

}


/* ==========================================
   EMPTY STATE
========================================== */

function updateEmptyState(numberOfEvents) {

    if (!emptyState) {
        return;
    }


    if (numberOfEvents === 0) {

        emptyState.classList.add("visible");

    } else {

        emptyState.classList.remove("visible");

    }

}


/* ==========================================
   SEARCH BUTTON
========================================== */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        filterEvents
    );

}


/* ==========================================
   ENTER KEY SEARCH
========================================== */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                filterEvents();

            }

        }
    );

}


/* ==========================================
   LOCATION FILTER
========================================== */

if (locationSelect) {

    locationSelect.addEventListener(
        "change",
        filterEvents
    );

}


/* ==========================================
   CATEGORY FILTER
========================================== */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const category =
                this.dataset.category;


            /* Remove active state */

            categoryButtons.forEach(item => {

                item.classList.remove("active");

            });


            /* Add active state */

            this.classList.add("active");


            let visibleEvents = 0;


            /* Filter events */

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


            updateEmptyState(
                visibleEvents
            );


            /* Scroll to events */

            const eventsSection =
                document.getElementById("events");


            if (eventsSection) {

                eventsSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});


/* ==========================================
   CLEAR FILTERS
========================================== */

if (clearFilters) {

    clearFilters.addEventListener(
        "click",
        function () {

            /* Clear search */

            if (searchInput) {

                searchInput.value = "";

            }


            /* Reset location */

            if (locationSelect) {

                locationSelect.value = "all";

            }


            /* Remove active category */

            categoryButtons.forEach(button => {

                button.classList.remove("active");

            });


            /* Show all events */

            events.forEach(event => {

                event.style.display = "";

            });


            /* Hide empty state */

            updateEmptyState(
                events.length
            );

        }
    );

}


/* ==========================================
   FAVORITE BUTTONS
========================================== */

const favoriteButtons =
    document.querySelectorAll(".favorite");


favoriteButtons.forEach(button => {

    button.addEventListener(
        "click",
        function (event) {

            /*
             * Prevent the event card
             * from also receiving the click.
             */

            event.stopPropagation();


            if (
                this.classList.contains("liked")
            ) {

                this.classList.remove("liked");

                this.textContent = "♡";

            } else {

                this.classList.add("liked");

                this.textContent = "♥";

            }

        }
    );

});


/* ==========================================
   EVENT CARDS
========================================== */

events.forEach(card => {

    card.addEventListener(
        "click",
        function (event) {

            /*
             * Don't open the event if
             * favorite or arrow was clicked.
             */

            if (
                event.target.closest(".favorite") ||
                event.target.closest(".arrow-button")
            ) {

                return;

            }


            const eventName =
                this.dataset.name;


            console.log(
                "Opening event:",
                eventName
            );


            /*
             * Later we will replace this
             * with:
             *
             * window.location.href =
             * "event.html?id=...";
             */

        }
    );

});


/* ==========================================
   INITIALIZATION
========================================== */

console.log(
    "Tadari Events initialized successfully."
);

/* ==========================================
   EVENT DETAIL PAGE
========================================== */


/* Favorite */

const detailFavorite =
    document.getElementById("detailFavorite");


if (detailFavorite) {

    detailFavorite.addEventListener(
        "click",
        function () {

            this.classList.toggle("liked");


            if (
                this.classList.contains("liked")
            ) {

                this.innerHTML = "♥ <span>Saved</span>";

            } else {

                this.innerHTML = "♡ <span>Save event</span>";

            }

        }
    );

}


/* ==========================================
   TICKET QUANTITY
========================================== */

const quantityElement =
    document.getElementById("quantity");

const quantityMinus =
    document.getElementById("quantityMinus");

const quantityPlus =
    document.getElementById("quantityPlus");

const totalPrice =
    document.getElementById("totalPrice");


let ticketQuantity = 1;


function getSelectedTicketPrice() {

    const selectedTicket =
        document.querySelector(
            'input[name="ticket"]:checked'
        );


    if (!selectedTicket) {

        return 39;

    }


    return Number(
        selectedTicket.value
    );

}


function updateTicketTotal() {

    const price =
        getSelectedTicketPrice();


    const total =
        price * ticketQuantity;


    if (quantityElement) {

        quantityElement.textContent =
            ticketQuantity;

    }


    if (totalPrice) {

        totalPrice.textContent =
            `€${total}`;

    }

}


/* Minus */

if (quantityMinus) {

    quantityMinus.addEventListener(
        "click",
        function () {

            if (ticketQuantity > 1) {

                ticketQuantity--;

                updateTicketTotal();

            }

        }
    );

}


/* Plus */

if (quantityPlus) {

    quantityPlus.addEventListener(
        "click",
        function () {

            if (ticketQuantity < 10) {

                ticketQuantity++;

                updateTicketTotal();

            }

        }
    );

}


/* Ticket selection */

document
    .querySelectorAll(
        'input[name="ticket"]'
    )
    .forEach(ticket => {

        ticket.addEventListener(
            "change",
            updateTicketTotal
        );

    });


/* ==========================================
   CHECKOUT BUTTON
========================================== */

const buyButton =
    document.getElementById("buyButton");


if (buyButton) {

    buyButton.addEventListener(
        "click",
        function () {

            const price =
                getSelectedTicketPrice();

            const total =
                price * ticketQuantity;


            alert(
                `Checkout demo\n\n` +
                `Summer Sound 2027\n` +
                `${ticketQuantity} ticket(s)\n` +
                `Total: €${total}\n\n` +
                `This is a prototype checkout.`
            );

        }
    );

}
