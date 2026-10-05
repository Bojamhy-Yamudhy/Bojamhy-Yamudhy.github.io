document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       NAVEGACIÓN PRINCIPAL
       ========================================== */

    const buttons =
        document.querySelectorAll(".nav-btn");

    const sections =
        document.querySelectorAll(".view-section");


    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            const target =
                button.dataset.target;

            const targetSection =
                document.getElementById(target);


            if (!targetSection) {
                return;
            }


            /* ------------------------------
               Botón activo
               ------------------------------ */

            buttons.forEach((item) => {

                item.classList.toggle(
                    "active",
                    item === button
                );

            });


            /* ------------------------------
               Sección activa
               ------------------------------ */

            sections.forEach((section) => {

                section.classList.toggle(
                    "active",
                    section === targetSection
                );

            });


            /* ------------------------------
               Volver arriba
               ------------------------------ */

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });


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
       ACTUALIZAR ALTURA DEL PANEL
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
       ABRIR / CERRAR MIEMBROS
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
                 * Se calcula el alto real del
                 * contenido para que la transición
                 * funcione correctamente.
                 */

                ranksPanel.style.maxHeight =
                    `${ranksPanel.scrollHeight}px`;

            } else {

                /*
                 * Primero mantenemos el alto actual
                 * y después lo llevamos a 0.
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
       ADAPTACIÓN AL CAMBIO DE TAMAÑO
       ========================================== */

    window.addEventListener(
        "resize",
        updatePanelHeight
    );


    /* ==========================================
       OBSERVAR CAMBIOS DE CONTENIDO
       ========================================== */

    const resizeObserver =
        new ResizeObserver(() => {

            updatePanelHeight();

        });


    resizeObserver.observe(
        ranksPanel
    );

})