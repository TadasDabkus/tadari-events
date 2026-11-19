/* ==========================================
   TADARI EVENTS
   MAIN JAVASCRIPT
========================================== */


/* ==========================================
   MOBILE MENU
========================================== */

const mobileMenu =
    document.getElementById("mobileMenu");


if (mobileMenu) {

    mobileMenu.addEventListener("click", () => {

        document
            .querySelector(".main-nav")
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

    if (!searchInput || !locationSelect) {
        return;
    }


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
            event.dataset.name
                .toLowerCase();


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


    if (emptyState) {

        if (visibleEvents === 0) {

            emptyState.classList.add("visible");

        } else {

            emptyState.classList.remove("visible");

        }

    }

}



/* SEARCH BUTTON */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        filterEvents
    );

}



/* ENTER KEY */

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



/* LOCATION */

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

    button.addEventListener(
        "click",
        () => {

            const category =
                button.dataset.category;


            const events =
                document.querySelectorAll(
                    ".event-card"
                );


            let visibleEvents = 0;


            categoryButtons.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            button.classList.add("active");


            events.forEach(event => {

                if (
                    event.dataset.category ===
                    category
                ) {

                    event.style.display = "";

                    visibleEvents++;

                } else {

                    event.style.display = "none";

                }

            });


            if (emptyState) {

                if (visibleEvents === 0) {

                    emptyState.classList.add(
                        "visible"
                    );

                } else {

                    emptyState.classList.remove(
                        "visible"
                    );

                }

            }


            document
                .getElementById("events")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});



/* ==========================================
   CLEAR FILTERS
========================================== */

const clearFilters =
    document.getElementById("clearFilters");


if (clearFilters) {

    clearFilters.addEventListener(
        "click",
        () => {

            if (searchInput) {

                searchInput.value = "";

            }


            if (locationSelect) {

                locationSelect.value = "all";

            }


            categoryButtons.forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );

                }
            );


            document
                .querySelectorAll(".event-card")
                .forEach(event => {

                    event.style.display = "";

                });


            if (emptyState) {

                emptyState.classList.remove(
                    "visible"
                );

            }

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
        event => {

            event.stopPropagation();


            if (
                button.textContent.trim() ===
                "♡"
            ) {

                button.textContent = "♥";

                button.classList.add(
                    "liked"
                );

            } else {

                button.textContent = "♡";

                button.classList.remove(
                    "liked"
                );

            }

        }
    );

});



/* ==========================================
   EVENT CARD INTERACTION
========================================== */

const eventCards =
    document.querySelectorAll(".event-card");


eventCards.forEach(card => {

    card.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    ".favorite"
                ) ||
                event.target.closest(
                    ".arrow-button"
                )
            ) {

                return;

            }


            const eventId =
                card.dataset.eventId;


            if (eventId) {

                window.location.href =
                    `event.html?id=${eventId}`;

            }

        }
    );

});



/* ==========================================
   EVENT DATA
========================================== */

const eventData = {

    "summer-sound": {

        title:
            "Summer Sound 2027",

        category:
            "MUSIC",

        categoryName:
            "Music",

        date:
            "June 21, 2027",

        location:
            "Vingis Park · Vilnius",

        locationMeta:
            "Vingis Park, Vilnius",

        headline:
            "A summer night worth remembering.",

        description1:
            "Summer Sound 2027 brings together music, people and unforgettable experiences in the heart of Vilnius.",

        description2:
            "Enjoy live performances, food, drinks and an open-air festival atmosphere. Bring your friends and spend the longest days of summer together.",

        expect1Title:
            "Live music",

        expect1Text:
            "Performances from local and international artists.",

        expect2Title:
            "Festival atmosphere",

        expect2Text:
            "Outdoor spaces, lights and unforgettable summer moments.",

        expect3Title:
            "Food & drinks",

        expect3Text:
            "A selection of food vendors and festival bars.",

        organizerAvatar:
            "SS",

        organizerName:
            "Summer Sound Team",

        organizerInfo:
            "Event organizer · 24 events",

        tickets: [
            {
                name: "General Admission",
                description: "Full festival access",
                price: 39
            },
            {
                name: "VIP",
                description: "VIP area + premium access",
                price: 69
            },
            {
                name: "Premium",
                description: "Best experience package",
                price: 99
            }
        ]

    },


    "zalgiris": {

        title:
            "Žalgiris vs Barcelona",

        category:
            "SPORTS",

        categoryName:
            "Sports",

        date:
            "June 24, 2027",

        location:
            "Žalgirio Arena · Kaunas",

        locationMeta:
            "Žalgirio Arena, Kaunas",

        headline:
            "A night of elite basketball.",

        description1:
            "Experience an exciting basketball matchup between Žalgiris Kaunas and FC Barcelona at the Žalgirio Arena.",

        description2:
            "Feel the energy of the crowd, watch top-level European basketball and experience one of the biggest sporting nights in Kaunas.",

        expect1Title:
            "Elite basketball",

        expect1Text:
            "Top European players competing at the highest level.",

        expect2Title:
            "Arena atmosphere",

        expect2Text:
            "Thousands of fans creating an unforgettable matchday.",

        expect3Title:
            "Live experience",

        expect3Text:
            "Watch the action unfold directly from the arena.",

        organizerAvatar:
            "ZA",

        organizerName:
            "Žalgiris Kaunas",

        organizerInfo:
            "Sports organizer · 86 events",

        tickets: [
            {
                name: "Standard",
                description: "Regular arena seating",
                price: 25
            },
            {
                name: "Premium",
                description: "Premium seating area",
                price: 45
            },
            {
                name: "VIP",
                description: "VIP lounge + premium seat",
                price: 85
            }
        ]

    },


    "river-flow": {

        title:
            "River Flow Festival",

        category:
            "FESTIVAL",

        categoryName:
            "Festival",

        date:
            "June 28, 2027",

        location:
            "Santaka Park · Kaunas",

        locationMeta:
            "Santaka Park, Kaunas",

        headline:
            "Music, nature and the city by the river.",

        description1:
            "River Flow Festival brings music, art and people together in one of Kaunas' most beautiful outdoor locations.",

        description2:
            "Spend a summer day by the river with live performances, creative activities, local food and a relaxed festival atmosphere.",

        expect1Title:
            "Live performances",

        expect1Text:
            "Discover emerging artists and local music acts.",

        expect2Title:
            "Riverside atmosphere",

        expect2Text:
            "Enjoy music and activities surrounded by nature.",

        expect3Title:
            "Food & culture",

        expect3Text:
            "Local food, creative spaces and cultural experiences.",

        organizerAvatar:
            "RF",

        organizerName:
            "River Flow Team",

        organizerInfo:
            "Festival organizer · 18 events",

        tickets: [
            {
                name: "Day Pass",
                description: "Full festival access",
                price: 18
            },
            {
                name: "Comfort",
                description: "Festival + comfort zone",
                price: 35
            },
            {
                name: "VIP",

                description:
                    "VIP area + premium access",

                price: 59
            }
        ]

    }

};



/* ==========================================
   LOAD EVENT DETAIL
========================================== */

function loadEventDetail() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const eventId =
        params.get("id");


    const event =
        eventData[eventId];


    if (!event) {

        window.location.href =
            "index.html#events";

        return;

    }



    /* PAGE TITLE */

    document.title =
        `${event.title} — Tadari Events`;



    /* HERO */

    const eventTitle =
        document.getElementById(
            "eventTitle"
        );


    const eventCategory =
        document.getElementById(
            "eventCategory"
        );


    const eventLocation =
        document.getElementById(
            "eventLocation"
        );


    if (eventTitle) {

        eventTitle.textContent =
            event.title;

    }


    if (eventCategory) {

        eventCategory.textContent =
            event.category;

    }


    if (eventLocation) {

        eventLocation.textContent =
            event.location;

    }



    /* META */

    const eventDate =
        document.getElementById(
            "eventDate"
        );


    const eventLocationMeta =
        document.getElementById(
            "eventLocationMeta"
        );


    const eventCategoryMeta =
        document.getElementById(
            "eventCategoryMeta"
        );


    if (eventDate) {

        eventDate.textContent =
            event.date;

    }


    if (eventLocationMeta) {

        eventLocationMeta.textContent =
            event.locationMeta;

    }


    if (eventCategoryMeta) {

        eventCategoryMeta.textContent =
            event.categoryName;

    }



    /* DESCRIPTION */

    const headline =
        document.getElementById(
            "eventHeadline"
        );


    const description1 =
        document.getElementById(
            "eventDescription1"
        );


    const description2 =
        document.getElementById(
            "eventDescription2"
        );


    if (headline) {

        headline.textContent =
            event.headline;

    }


    if (description1) {

        description1.textContent =
            event.description1;

    }


    if (description2) {

        description2.textContent =
            event.description2;

    }



    /* EXPECTATIONS */

    const expectTitle1 =
        document.getElementById(
            "expectTitle1"
        );


    const expectText1 =
        document.getElementById(
            "expectText1"
        );


    const expectTitle2 =
        document.getElementById(
            "expectTitle2"
        );


    const expectText2 =
        document.getElementById(
            "expectText2"
        );


    const expectTitle3 =
        document.getElementById(
            "expectTitle3"
        );


    const expectText3 =
        document.getElementById(
            "expectText3"
        );


    if (expectTitle1) {

        expectTitle1.textContent =
            event.expect1Title;

    }


    if (expectText1) {

        expectText1.textContent =
            event.expect1Text;

    }


    if (expectTitle2) {

        expectTitle2.textContent =
            event.expect2Title;

    }


    if (expectText2) {

        expectText2.textContent =
            event.expect2Text;

    }


    if (expectTitle3) {

        expectTitle3.textContent =
            event.expect3Title;

    }


    if (expectText3) {

        expectText3.textContent =
            event.expect3Text;

    }



    /* ORGANIZER */

    const organizerAvatar =
        document.getElementById(
            "organizerAvatar"
        );


    const organizerName =
        document.getElementById(
            "organizerName"
        );


    const organizerInfo =
        document.getElementById(
            "organizerInfo"
        );


    if (organizerAvatar) {

        organizerAvatar.textContent =
            event.organizerAvatar;

    }


    if (organizerName) {

        organizerName.textContent =
            event.organizerName;

    }


    if (organizerInfo) {

        organizerInfo.textContent =
            event.organizerInfo;

    }



    /* TICKETS */

    const ticketNames = [
        document.getElementById(
            "ticketName1"
        ),
        document.getElementById(
            "ticketName2"
        ),
        document.getElementById(
            "ticketName3"
        )
    ];


    const ticketDescriptions = [
        document.getElementById(
            "ticketDescription1"
        ),
        document.getElementById(
            "ticketDescription2"
        ),
        document.getElementById(
            "ticketDescription3"
        )
    ];


    const ticketPrices = [
        document.getElementById(
            "ticketPrice1"
        ),
        document.getElementById(
            "ticketPrice2"
        ),
        document.getElementById(
            "ticketPrice3"
        )
    ];


    event.tickets.forEach(
        (ticket, index) => {

            if (ticketNames[index]) {

                ticketNames[index]
                    .textContent =
                    ticket.name;

            }


            if (
                ticketDescriptions[index]
            ) {

                ticketDescriptions[index]
                    .textContent =
                    ticket.description;

            }


            if (ticketPrices[index]) {

                ticketPrices[index]
                    .textContent =
                    `€${ticket.price}`;

            }

        }
    );


    /* UPDATE RADIO VALUES */

    const ticketInputs =
        document.querySelectorAll(
            'input[name="ticket"]'
        );


    ticketInputs.forEach(
        (input, index) => {

            if (event.tickets[index]) {

                input.value =
                    event.tickets[index]
                        .price;

            }

        }
    );

}



/* ==========================================
   DETAIL FAVORITE
========================================== */

const detailFavorite =
    document.getElementById(
        "detailFavorite"
    );


if (detailFavorite) {

    detailFavorite.addEventListener(
        "click",
        function () {

            this.classList.toggle(
                "liked"
            );


            if (
                this.classList.contains(
                    "liked"
                )
            ) {

                this.innerHTML =
                    "♥ <span>Saved</span>";

            } else {

                this.innerHTML =
                    "♡ <span>Save event</span>";

            }

        }
    );

}



/* ==========================================
   TICKET QUANTITY
========================================== */

const quantityElement =
    document.getElementById(
        "quantity"
    );


const quantityMinus =
    document.getElementById(
        "quantityMinus"
    );


const quantityPlus =
    document.getElementById(
        "quantityPlus"
    );


const totalPrice =
    document.getElementById(
        "totalPrice"
    );


let ticketQuantity = 1;



function getSelectedTicketPrice() {

    const selectedTicket =
        document.querySelector(
            'input[name="ticket"]:checked'
        );


    if (!selectedTicket) {

        return 0;

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



/* MINUS */

if (quantityMinus) {

    quantityMinus.addEventListener(
        "click",
        () => {

            if (
                ticketQuantity > 1
            ) {

                ticketQuantity--;

                updateTicketTotal();

            }

        }
    );

}



/* PLUS */

if (quantityPlus) {

    quantityPlus.addEventListener(
        "click",
        () => {

            if (
                ticketQuantity < 10
            ) {

                ticketQuantity++;

                updateTicketTotal();

            }

        }
    );

}



/* TICKET CHANGE */

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
   CHECKOUT
========================================== */

const buyButton =
    document.getElementById(
        "buyButton"
    );


if (buyButton) {

    buyButton.addEventListener(
        "click",
        () => {

            const price =
                getSelectedTicketPrice();


            const total =
                price * ticketQuantity;


            alert(
                `Checkout demo\n\n` +
                `Event: ${document.getElementById("eventTitle")?.textContent}\n` +
                `Tickets: ${ticketQuantity}\n` +
                `Total: €${total}\n\n` +
                `This is a prototype checkout.`
            );

        }
    );

}



/* ==========================================
   INITIALIZE EVENT PAGE
========================================== */

if (
    document.getElementById(
        "eventTitle"
    )
) {

    loadEventDetail();

    updateTicketTotal();

}



console.log(
    "Tadari Events initialized successfully."
);
