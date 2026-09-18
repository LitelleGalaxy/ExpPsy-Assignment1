/* =========================================================
   LITTLE ALBERT
   Interactive Psychology Exhibit
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const loader = document.getElementById("loader");

const menuBtn = document.getElementById("menuBtn");
const menuOverlay = document.getElementById("menuOverlay");

const startBtn = document.getElementById("startBtn");

const panelImage = document.getElementById("panelImage");
const panelTitle = document.getElementById("panelTitle");
const panelText = document.getElementById("panelText");
const panelConcept = document.getElementById("panelConcept");
const panelLabel = document.getElementById("panelLabel");
const panelCurrent = document.getElementById("panelCurrent");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const sceneHotspot = document.getElementById("sceneHotspot");
const scenePopup = document.getElementById("scenePopup");
const closePopup = document.getElementById("closePopup");

const conditioningNext =
    document.getElementById("conditioningNext");

const ethicsNext =
    document.getElementById("ethicsNext");

const memoryNext =
    document.getElementById("memoryNext");

const memoryText =
    document.getElementById("memoryText");

const memoryCounter =
    document.getElementById("memoryCounter");

const restartBtn =
    document.getElementById("restartBtn");


/* =========================================================
   PANEL DATA
========================================================= */

const panels = [

    {
        number: "01",

        title: "Before the Fear",

        text:
            "Before conditioning, Albert showed no fear toward the white rat.",

        concept:
            "Neutral Stimulus",

        description:
            "The white rat initially produced no fear response in Albert.",

        image:
            "images/panel1.png",

        hotspot:
            "The white rat was initially a neutral stimulus."
    },


    {
        number: "02",

        title: "The Sound",

        text:
            "The rat was repeatedly paired with a loud, frightening sound.",

        concept:
            "Conditioning Pairing",

        description:
            "A frightening sound was paired with the previously neutral rat.",

        image:
            "images/panel2.png",

        hotspot:
            "The loud sound functioned as the unconditioned stimulus."
    },


    {
        number: "03",

        title: "Fear Is Learned",

        text:
            "After repeated pairings, Albert began to react with fear when the rat appeared.",

        concept:
            "Conditioned Response",

        description:
            "The rat became associated with fear through repeated pairing.",

        image:
            "images/panel3.png",

        hotspot:
            "Albert's fear response became associated with the white rat."
    },


    {
        number: "04",

        title: "The Fear Spreads",

        text:
            "Albert's fear response extended beyond the rat to other furry or similar objects.",

        concept:
            "Stimulus Generalization",

        description:
            "The learned response appeared toward stimuli resembling the original one.",

        image:
            "images/panel4.png",

        hotspot:
            "Fear generalized to other similar stimuli."
    },


    {
        number: "05",

        title: "The Question",

        text:
            "The experiment demonstrated learned emotional responses, but it also raises important ethical questions.",

        concept:
            "Research Ethics",

        description:
            "The study is now discussed alongside questions about participant protection.",

        image:
            "images/panel5.png",

        hotspot:
            "Modern psychological research places strong emphasis on protecting participants."
    },


    {
        number: "06",

        title: "What Remained",

        text:
            "The historical record leaves important questions about what happened to Albert and how completely the learned fear was addressed.",

        concept:
            "Ethical Reflection",

        description:
            "The case remains a reminder of the responsibilities involved in psychological research.",

        image:
            "images/panel6.png",

        hotspot:
            "The historical record does not provide a simple answer about the long-term outcome."
    }

];


/* =========================================================
   HOTSPOT POSITIONS
   Positions are relative to the 1920 × 1080 artwork.
========================================================= */

const hotspotPositions = [

    /* PANEL 1
       White rat
    */
    {
        left: "39%",
        top: "78%"
    },


    /* PANEL 2
       Loud-noise / metal container
    */
    {
        left: "89%",
        top: "79%"
    },


    /* PANEL 3
       LITTLE ALBERT
       Positioned directly on Albert's body
    */
    {
        left: "64%",
        top: "68%"
    },


    /* PANEL 4
       Similar/furry stimulus
    */
    {
        left: "75%",
        top: "30%"
    },


    /* PANEL 5
       Ethics focus
    */
    {
        left: "35%",
        top: "22%"
    },


    /* PANEL 6
       Reflection focus
    */
    {
        left: "96%",
        top: "84%"
    }

];


/* =========================================================
   MEMORY TEXT
========================================================= */

const memorySnippets = [

    "I used to love lilacs. The purple ones, especially.",

    "I loved the way their petals gathered in little clusters, and how their fragrance would linger in the air long after I had walked past them.",

    "My mother used to keep them by the window, and when they bloomed, the whole house would carry that soft, sweet smell.",

    "I haven't smelled them in years. Well, not until that one afternoon.",

    "There was something familiar about it. Something that made me remember a room I hadn't thought about in years, and a voice whose words I can no longer quite recall.",

    "Sometimes I wonder if that's why I still notice lilacs whenever I see them.",

    "Every now and then, when the scent catches me by surprise, I find myself somewhere else for just a moment, trying to remember something I can't quite put into words."

];


/* =========================================================
   STATE
========================================================= */

let currentPanel = 0;

let currentMemory = 0;

let isChangingPanel = false;

let wheelLocked = false;


/* =========================================================
   SCREEN CONTROL
========================================================= */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {

        screen.classList.remove("active");

    });


    const target =
        document.getElementById(id);


    if (!target) {
        return;
    }


    target.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "auto"
    });

}


/* =========================================================
   HEADER
========================================================= */

function updateHeader(section) {

    const brand =
        document.querySelector(".site-brand");


    if (!brand) {
        return;
    }


    if (section === "intro") {

        brand.style.opacity = "0";

    } else {

        brand.style.opacity = "1";

    }

}


/* =========================================================
   CREATE PROGRESS DOTS
========================================================= */

const progressContainer =
    document.querySelector(".scene-progress");


if (progressContainer) {

    progressContainer.innerHTML = "";


    panels.forEach((panel, index) => {

        const button =
            document.createElement("button");


        button.type = "button";


        button.setAttribute(
            "aria-label",
            `Go to panel ${index + 1}`
        );


        button.addEventListener(
            "click",
            () => {

                showPanel(index);

            }
        );


        progressContainer.appendChild(button);

    });

}


/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress() {

    const dots =
        document.querySelectorAll(
            ".scene-progress button"
        );


    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentPanel
        );

    });

}


/* =========================================================
   SHOW PANEL
========================================================= */

function showPanel(index) {

    if (
        index < 0 ||
        index >= panels.length ||
        isChangingPanel
    ) {
        return;
    }


    const panel =
        panels[index];


    currentPanel =
        index;


    isChangingPanel =
        true;


    /* -----------------------------------------
       Close popup
    ----------------------------------------- */

    if (scenePopup) {

        scenePopup.classList.remove(
            "show"
        );

    }


    /* -----------------------------------------
       Image transition
    ----------------------------------------- */

    if (panelImage) {

        panelImage.style.opacity =
            "0";

        panelImage.style.transform =
            "scale(1.015)";


        setTimeout(() => {

            panelImage.src =
                panel.image;


            panelImage.alt =
                `Little Albert experiment panel ${panel.number}`;


            panelImage.onload = () => {

                panelImage.style.opacity =
                    "1";

                panelImage.style.transform =
                    "scale(1)";

            };

        }, 180);

    }


    /* -----------------------------------------
       Panel label
    ----------------------------------------- */

    if (panelLabel) {

        panelLabel.textContent =
            "THE EXPERIMENT";

    }


    /* -----------------------------------------
       Panel title
    ----------------------------------------- */

    if (panelTitle) {

        panelTitle.textContent =
            panel.title;

    }


    /* -----------------------------------------
       Panel description
    ----------------------------------------- */

    if (panelText) {

        panelText.textContent =
            panel.text;

    }


    /* -----------------------------------------
       Concept
    ----------------------------------------- */

    if (panelConcept) {

        panelConcept.textContent =
            panel.concept;

    }


    /* -----------------------------------------
       Counter
    ----------------------------------------- */

    if (panelCurrent) {

        panelCurrent.textContent =
            panel.number;

    }


    /* -----------------------------------------
       HOTSPOT POSITION
    ----------------------------------------- */

    if (sceneHotspot) {

        const position =
            hotspotPositions[index];


        sceneHotspot.style.left =
            position.left;


        sceneHotspot.style.top =
            position.top;


        sceneHotspot.setAttribute(
            "aria-label",
            panel.hotspot
        );

    }


    /* -----------------------------------------
       Update dots
    ----------------------------------------- */

    updateProgress();


    setTimeout(() => {

        isChangingPanel =
            false;

    }, 500);

}


/* =========================================================
   NEXT PANEL
========================================================= */

function nextPanel() {

    if (
        currentPanel <
        panels.length - 1
    ) {

        showPanel(
            currentPanel + 1
        );

    } else {

        showScreen(
            "conditioning"
        );

        updateHeader(
            "conditioning"
        );

    }

}


/* =========================================================
   PREVIOUS PANEL
========================================================= */

function previousPanel() {

    if (currentPanel > 0) {

        showPanel(
            currentPanel - 1
        );

    }

}


/* =========================================================
   START EXPERIMENT
========================================================= */

if (startBtn) {

    startBtn.addEventListener(
        "click",
        () => {

            showScreen("comic");

            updateHeader("comic");

            showPanel(0);

        }
    );

}


/* =========================================================
   ARROW BUTTONS
========================================================= */

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        nextPanel
    );

}


if (prevBtn) {

    prevBtn.addEventListener(
        "click",
        previousPanel
    );

}


/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const comic =
            document.getElementById("comic");


        if (
            !comic ||
            !comic.classList.contains("active")
        ) {

            return;

        }


        if (event.key === "ArrowRight") {

            event.preventDefault();

            nextPanel();

        }


        if (event.key === "ArrowLeft") {

            event.preventDefault();

            previousPanel();

        }


        if (event.key === "Escape") {

            if (scenePopup) {

                scenePopup.classList.remove(
                    "show"
                );

            }

        }

    }
);


/* =========================================================
   MOUSE PARALLAX
========================================================= */

const comicImageContainer =
    document.querySelector(
        ".comic-scene-image"
    );


if (comicImageContainer) {

    comicImageContainer.addEventListener(
        "mousemove",
        event => {

            if (
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {

                return;

            }


            /*
               Disable parallax on mobile.
               This keeps the hotspot and artwork stable.
            */
            if (
                window.matchMedia(
                    "(max-width: 800px)"
                ).matches
            ) {

                return;

            }


            const x =
                (event.clientX /
                    window.innerWidth) -
                0.5;


            const y =
                (event.clientY /
                    window.innerHeight) -
                0.5;


            if (panelImage) {

                panelImage.style.transform =
                    `scale(1.015) translate(${x * 5}px, ${y * 5}px)`;

            }

        }
    );


    comicImageContainer.addEventListener(
        "mouseleave",
        () => {

            if (panelImage) {

                panelImage.style.transform =
                    "scale(1)";

            }

        }
    );

}


/* =========================================================
   WHEEL NAVIGATION
========================================================= */

document.addEventListener(
    "wheel",
    event => {

        const comic =
            document.getElementById("comic");


        /*
           Wheel navigation is disabled on phones/tablets
           so normal scrolling remains usable.
        */
        if (
            !comic ||
            !comic.classList.contains("active") ||
            window.matchMedia(
                "(max-width: 800px)"
            ).matches
        ) {

            return;

        }


        event.preventDefault();


        if (wheelLocked) {

            return;

        }


        wheelLocked =
            true;


        if (event.deltaY > 0) {

            nextPanel();

        } else if (event.deltaY < 0) {

            previousPanel();

        }


        setTimeout(() => {

            wheelLocked =
                false;

        }, 700);

    },
    {
        passive: false
    }
);


/* =========================================================
   TOUCH SWIPE
========================================================= */

let touchStartX = 0;

let touchStartY = 0;

let touchEndX = 0;

let touchEndY = 0;


document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0]
                .screenX;

        touchStartY =
            event.changedTouches[0]
                .screenY;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    event => {

        const comic =
            document.getElementById("comic");


        if (
            !comic ||
            !comic.classList.contains("active")
        ) {

            return;

        }


        touchEndX =
            event.changedTouches[0]
                .screenX;

        touchEndY =
            event.changedTouches[0]
                .screenY;


        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const horizontalDifference =
        touchStartX -
        touchEndX;


    const verticalDifference =
        touchStartY -
        touchEndY;


    /*
       Only treat a gesture as a panel swipe
       when it is clearly horizontal.

       This prevents normal vertical scrolling
       on mobile from changing panels.
    */

    if (
        Math.abs(horizontalDifference) < 50 ||
        Math.abs(horizontalDifference) <=
        Math.abs(verticalDifference)
    ) {

        return;

    }


    if (horizontalDifference > 0) {

        nextPanel();

    } else {

        previousPanel();

    }

}


/* =========================================================
   HOTSPOT
========================================================= */

if (sceneHotspot) {

    sceneHotspot.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            const panel =
                panels[currentPanel];


            if (!scenePopup) {

                return;

            }


            const popupLabel =
                scenePopup.querySelector(
                    "span"
                );


            const popupText =
                scenePopup.querySelector(
                    "p"
                );


            if (popupLabel) {

                popupLabel.textContent =
                    panel.concept;

            }


            if (popupText) {

                popupText.textContent =
                    panel.hotspot;

            }


            scenePopup.classList.toggle(
                "show"
            );

        }
    );

}


/* =========================================================
   CLOSE HOTSPOT POPUP
========================================================= */

if (closePopup) {

    closePopup.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            if (scenePopup) {

                scenePopup.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* =========================================================
   CONDITIONING → ETHICS
========================================================= */

if (conditioningNext) {

    conditioningNext.addEventListener(
        "click",
        () => {

            showScreen("ethics");

            updateHeader("ethics");

        }
    );

}


/* =========================================================
   ETHICS → MEMORY
========================================================= */

if (ethicsNext) {

    ethicsNext.addEventListener(
        "click",
        () => {

            showScreen("memory");

            updateHeader("memory");

            currentMemory =
                0;

            updateMemory();

        }
    );

}


/* =========================================================
   MEMORY
========================================================= */

function updateMemory() {

    if (!memoryText) {

        return;

    }


    memoryText.style.opacity =
        "0";


    memoryText.style.transform =
        "translateY(12px)";


    setTimeout(() => {

        memoryText.textContent =
            memorySnippets[
                currentMemory
            ];


        if (memoryCounter) {

            memoryCounter.textContent =
                `${String(currentMemory + 1).padStart(2, "0")} / ${String(memorySnippets.length).padStart(2, "0")}`;

        }


        memoryText.style.opacity =
            "1";


        memoryText.style.transform =
            "translateY(0)";

    }, 180);

}


if (memoryNext) {

    memoryNext.addEventListener(
        "click",
        () => {

            if (
                currentMemory <
                memorySnippets.length - 1
            ) {

                currentMemory++;

                updateMemory();

            } else {

                showScreen("final");

                updateHeader("final");

            }

        }
    );

}


/* =========================================================
   CONTINUE TO REFLECTION
   Goes to the existing "final" section.
========================================================= */

const reflectionButton =
    document.getElementById(
        "reflectionButton"
    );


if (reflectionButton) {

    reflectionButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            closeMenu();

            showScreen("final");

            updateHeader("final");


            /*
               Keep the URL clean because this website
               uses fixed screens instead of normal
               document scrolling.
            */

            if (
                window.history &&
                window.history.replaceState
            ) {

                window.history.replaceState(
                    null,
                    "",
                    window.location.pathname +
                    window.location.search
                );

            }

        }
    );

}


/* =========================================================
   RESTART
========================================================= */

if (restartBtn) {

    restartBtn.addEventListener(
        "click",
        () => {

            currentPanel =
                0;


            currentMemory =
                0;


            showPanel(0);


            showScreen("intro");


            updateHeader(
                "intro"
            );

        }
    );

}


/* =========================================================
   MENU
========================================================= */

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        () => {

            const isOpen =
                menuOverlay.classList.contains(
                    "open"
                );


            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );

}


function openMenu() {

    menuOverlay.classList.add(
        "open"
    );


    menuBtn.classList.add(
        "open"
    );

}


function closeMenu() {

    menuOverlay.classList.remove(
        "open"
    );


    menuBtn.classList.remove(
        "open"
    );

}


/* =========================================================
   MENU NAVIGATION
========================================================= */

document.querySelectorAll(
    "[data-section]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const section =
                button.dataset.section;


            closeMenu();


            showScreen(
                section
            );


            updateHeader(
                section
            );


            if (
                section ===
                "comic"
            ) {

                showPanel(
                    currentPanel
                );

            }


            if (
                section ===
                "memory"
            ) {

                updateMemory();

            }

        }
    );

});


/* =========================================================
   ESCAPE CLOSES MENU
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   REAL LIFE EXPERIENCES
========================================================= */

const experienceStories = {

    story1: {

        number: "01",

        title: "Treats",

        before: "Food → Salivation",

        after: "Word Signal → Salivation",

        text:
            "I remember that ‘treats’ used to mean nothing to my cats. After saying the word, I would give them some treats. I did this repeatedly, now, whenever I say it, their heads shoot up because they know treats are coming."

    },


    story2: {

        number: "02",

        title: "Fear of the Dark",

        before: "Darkness → Neutral",

        after: "Darkness → Fear",

        text:
            "One night, I saw what looked like a ghost in my peripheral vision, but it was just a white bedsheet hanging nearby. Since then, darkness reminds me of that night, and I feel nervous whenever the lights go out."

    },


    story3: {

        number: "03",

        title: "Smoking Scent",

        before: "Smoke Scent → Neutral",

        after: "Smoke Scent → Memory",

        text:
            "I don’t smoke, but growing up with my smoker dad, the smell reminds me of my dad all the time"

    },


    story4: {

        number: "04",

        title: "Phone Calls",

        before: "Phone Ringing → Neutral",

        after: "Phone Ringing → Anxiety",

        text:
            "I never really thought anything of my phone ringing. One time, I got a stressful call that gave me bad news. Now, whenever my phone rings unexpectedly, I get nervous and wonder if something is wrong."

    },


    story5: {

        number: "05",

        title: "Alarm Clock",

        before: "Alarm → Neutral",

        after: "Alarm → Alertness",

        text:
            "I heard the same alarm every morning before getting out of bed. Eventually, the sound itself made me alert and ready to wake, even before I consciously decided to get up."

    },


    story6: {

        number: "06",

        title: "Perfumes",

        before: "Perfume Scent → Neutral",

        after: "Perfume Scent → Memories",

        text:
            "Someone’s perfume used to be just a smell. When I was with my ex-boyfriend, he used the same perfume everytime we meet. We've been broken up for years, but I’ve come to associate that smell with the memories I have of him."

    }

};


const experienceCards =
    document.querySelectorAll(
        ".experience-card"
    );


const experiencePopup =
    document.getElementById(
        "experiencePopup"
    );


const experienceClose =
    document.getElementById(
        "experienceClose"
    );


const popupNumber =
    document.getElementById(
        "popupNumber"
    );


const popupCategory =
    document.getElementById(
        "popupCategory"
    );


const popupTitle =
    document.getElementById(
        "popupTitle"
    );


const popupText =
    document.getElementById(
        "popupText"
    );


const popupBefore =
    document.getElementById(
        "popupBefore"
    );


const popupAfter =
    document.getElementById(
        "popupAfter"
    );


const experiencesSection =
    document.getElementById(
        "memory"
    );


function openExperience(storyId) {

    const story =
        experienceStories[storyId];


    if (!story) return;


    popupNumber.textContent =
        story.number;


    popupCategory.textContent =
        "CLASSICAL CONDITIONING";


    popupTitle.textContent =
        story.title;


    popupText.textContent =
        story.text;


    popupBefore.textContent =
        story.before;


    popupAfter.textContent =
        story.after;


    experiencesSection.classList.add(
        "popup-open"
    );


    experiencePopup.classList.add(
        "active"
    );

}


function closeExperience() {

    experiencePopup.classList.remove(
        "active"
    );


    experiencesSection.classList.remove(
        "popup-open"
    );

}


experienceCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const storyId =
                card.dataset.story;


            openExperience(
                storyId
            );

        }
    );

});


if (experienceClose) {

    experienceClose.addEventListener(
        "click",
        closeExperience
    );

}


/* Click outside popup */

experiencesSection.addEventListener(
    "click",
    event => {

        if (
            experiencesSection.classList.contains(
                "popup-open"
            ) &&
            event.target ===
            experiencesSection
        ) {

            closeExperience();

        }

    }
);


/* ESC key */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeExperience();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

showPanel(0);

showScreen("intro");

updateHeader("intro");


/* =========================================================
   LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            if (loader) {

                loader.classList.add(
                    "hidden"
                );

            }

        }, 900);

    }
);