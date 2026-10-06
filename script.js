document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       NAVEGACIÓN PRINCIPAL
       ========================================== */

    const buttons =
        document.querySelectorAll(".nav-btn");

    const sections =
        document.querySelectorAll(".view-section");


    const getSection =
        (target) =>
            document.getElementById(target);


    const showSection =
        (
            target,
            updateHistory = true
        ) => {

            const targetSection =
                getSection(target);


            if (!targetSection) {
                return;
            }


            /* ------------------------------
               Estado de navegación
               ------------------------------ */

            buttons.forEach((button) => {

                const isActive =
                    button.dataset.target === target;


                button.classList.toggle(
                    "active",
                    isActive
                );


                if (isActive) {

                    button.setAttribute(
                        "aria-current",
                        "page"
                    );

                } else {

                    button.removeAttribute(
                        "aria-current"
                    );

                }

            });


            /* ------------------------------
               Estado de las vistas
               ------------------------------ */

            sections.forEach((section) => {

                const isActive =
                    section === targetSection;


                section.classList.toggle(
                    "active",
                    isActive
                );

            });


            /* ------------------------------
               URL
               ------------------------------ */

            if (updateHistory) {

                const newHash =
                    `#${target}`;


                if (
                    window.location.hash !==
                    newHash
                ) {

                    history.pushState(
                        null,
                        "",
                        newHash
                    );

                }

            }


            /* ------------------------------
               Volver arriba
               ------------------------------ */

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        };


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.dataset.target;


                if (!target) {
                    return;
                }


                showSection(target);

            }
        );

    });


    /* ==========================================
       SOPORTE DEL HISTORIAL
       ========================================== */

    const showHashSection = () => {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim();


        const targetSection =
            getSection(hash);


        if (targetSection) {

            showSection(
                hash,
                false
            );

        } else {

            showSection(
                "inicio",
                false
            );

        }

    };


    window.addEventListener(
        "popstate",
        showHashSection
    );


    /* ==========================================
       ESTADO INICIAL
       ========================================== */

    showHashSection();


    /* ==========================================
       BOTÓN MIEMBROS
       ========================================== */

    const ranksSection =
        document.querySelector(
            ".ranks-section"
        );

    const ranksToggle =
        document.getElementById(
            "ranksToggle"
        );

    const ranksPanel =
        document.getElementById(
            "ranksPanel"
        );


    if (
        !ranksSection ||
        !ranksToggle ||
        !ranksPanel
    ) {
        return;
    }


    /* ==========================================
       ACTUALIZAR ALTURA
       ========================================== */

    const updatePanelHeight = () => {

        if (
            ranksSection.classList.contains(
                "is-open"
            )
        ) {

            ranksPanel.style.maxHeight =
                `${ranksPanel.scrollHeight}px`;

        }

    };


    /* ==========================================
       ABRIR / CERRAR
       ========================================== */

    ranksToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                ranksSection.classList.toggle(
                    "is-open"
                );


            ranksToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            ranksPanel.setAttribute(
                "aria-hidden",
                String(!isOpen)
            );


            if (isOpen) {

                /*
                 * Permitimos que el navegador
                 * calcule el contenido real antes
                 * de establecer la altura.
                 */

                requestAnimationFrame(() => {

                    ranksPanel.style.maxHeight =
                        `${ranksPanel.scrollHeight}px`;

                });

            } else {

                /*
                 * Conservamos la altura actual
                 * antes de iniciar la contracción.
                 */

                ranksPanel.style.maxHeight =
                    `${ranksPanel.scrollHeight}px`;


                requestAnimationFrame(() => {

                    ranksPanel.style.maxHeight =
                        "0px";

                });

            }

        }
    );


    /* ==========================================
       RESPONSIVE
       ========================================== */

    window.addEventListener(
        "resize",
        updatePanelHeight
    );


    /* ==========================================
       OBSERVADOR DE CONTENIDO
       ========================================== */

    if (
        "ResizeObserver" in window
    ) {

        const resizeObserver =
            new ResizeObserver(() => {

                updatePanelHeight();

            });


        resizeObserver.observe(
            ranksPanel
        );

    }

});