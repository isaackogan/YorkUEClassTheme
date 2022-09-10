const ThemeManager = {

    renames: {
        "AP/MODR1760 F - Modes of Reasoning: Reasoning About Morality and Values (Full Year 2022-2023)": "AP/MODR 1760 (Section F)",
        "AP/ECON 1000 Metacourse (Fall 2022-2023)": "AP/ECON 1000 (General)",
        "SC/CHEM1000 E, F, G & H - Chemical Structure (Fall 2022-2023)": "SC/CHEM 1000 (General)",
        "SC/BIOL1000 A, B, C & D - Biology I - Cells, Molecular Biology and Genetics (Fall 2022-2023) LABS": "SC/BIOL 1000 (General)",
        "SC/MATH1013 A, B, C, D, E, F, G, H & I - Applied Calculus I (Fall 2022-2023)": "SC/MATH 1013 (General)",
        "SC/BIOL1000 B - Biology I - Cells, Molecular Biology and Genetics (Fall 2022-2023)": "SC/BIOL 1000 (Section B)",
        "SC/MATH1013 G - Applied Calculus I (Fall 2022-2023)": "SC/MATH 1013 (Section G)",
        "AP/ECON1000 G - Introduction to Microeconomics (Fall 2022-2023) (Tutorial 01)": "AP/ECON 1000 (Section G, Tutorial 1)",
        "SC/CHEM1000 F - Chemical Structure (Fall 2022-2023) (Tutorial 01)": "SC/CHEM 1000 (All Sections)"
    },

    injectTheme() {

        try {
            [
                this.injectStyleSheet,
                this.removeBanner,
                this.removeSavvy,
                this.removeNavOptions,
                this.removeHiddenCards,
                this.manualOverrides
            ].forEach((fn) => {
                try {
                    fn();
                } catch (ex) {
                    console.log("A theme management function has failed, stack-trace below:");
                    console.log(ex);
                }
            });
        } catch (ex) {
            console.log("The theme manager has failed, stack-trace below:");
            console.log(ex);
        }
    },

    manualOverrides() {
        $("span").css("color", "").css("background-color", "");
        $("strong").css("color", "");
        $("p").css("color", "").css("background-color", "");
        $("ul").css("color", "").css("background-color", "");
        $("i").css("color", "").css("background-color", "");
        $("b").css("color", "").css("background-color", "");
        $("#YUMentalHealth")?.parent()?.parent().remove();
    },
    removeNavOptions() {
        $("a[data-parent-key='mycourses']").remove();
        $("a[data-parent-key='myhome']").remove();
        $("div[data-key='mycourses']").remove();
        $("footer").remove();
    },

    removeHiddenCards() {

        waitForElement(".dashboard-card").then(() => {

            // Rename
            $("div[aria-label='Course overview controls']").remove();

            // Modify the cards
            $(".dashboard-card").each((i, element) => {

                // Add a colour to cards
                element.style.height = "100px";
                element.style.fontWeight = "bold";
                element.style.backgroundColor = "rgb(240, 240, 240)";
                element.style.display = "flex";
                element.style.alignContent = "center";
                element.style.justifyContent = "center";

                // Remove Image cards
                let img = $(element).find(".card-img").get(0);
                if (img) {
                    img.remove();
                }

                // Remove widget menu
                $(element).find("#card-widgetmenu").remove();

                // Remove ones that are hidden from view
                let el = $(element).find(".badge-info").get(0);
                if (!el) return;
                if (el.textContent.includes("Hidden from students")) {
                    element.remove();
                }

                // Edit Menu Options
                $(element)
                    .find("button")
                    .css("color", "white");

            });

            // Change the name within the card
            ThemeManager.renameCards();

            // Get children
            let items = $(".card-deck").children('div');

            items.each((i, element) => {
                let inner = $(element).find("span[class='multiline']");
                console.log(inner);
            });

        });

    },

    renameCards() {
        for (let element of document.getElementsByTagName("span")) {
            if (!element.textContent) continue;
            for (const [key, value] of Object.entries(ThemeManager.renames)) {
                if (element.textContent.includes(key)) {
                    element.textContent = value;
                    break;
                }

            }
        }

    },

    injectStyleSheet() {
        let style = document.createElement("link")
        style.rel = "stylesheet"
        style.href = getResourceURL("css/main.css")
        document.getElementsByTagName('head')[0].appendChild(style);
    },

    removeSavvy() {
        $("img[src='https://eclass.yorku.ca/theme/image.php/edyucate/theme/1661936658/bigsvaicon']").remove()
    },

    removeBanner() {
        $("#inst2204459 ").remove();
    }

}
