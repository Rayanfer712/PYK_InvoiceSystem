export function SidebarComponent() {
    const html = `
        <div class="sidebar-backdrop" aria-hidden="true"></div>
        <aside class="sidebar" id="page-sidebar" aria-label="Sidebar" aria-hidden="true" inert>
            <div class="sidebar-top-cover" aria-hidden="true"></div>
        </aside>
    `;

    function attachListeners() {
        // These selectors now work because this function runs AFTER the HTML is injected
        const sidebarToggle = document.querySelector(".sidebar-toggle");
        const sidebarBackdrop = document.querySelector(".sidebar-backdrop");
        const sidebar = document.querySelector(".sidebar");

        function setSidebarOpen(isOpen) {
            document.body.classList.toggle("sidebar-open", isOpen);
            sidebarToggle.setAttribute("aria-expanded", String(isOpen));
            sidebarToggle.setAttribute("aria-label", isOpen ? "Close sidebar" : "Open sidebar");
            sidebar.setAttribute("aria-hidden", String(!isOpen));
            sidebar.inert = !isOpen;
        }

        sidebarToggle.addEventListener("click", () => {
            setSidebarOpen(sidebarToggle.getAttribute("aria-expanded") !== "true");
        });

        sidebarBackdrop.addEventListener("click", () => setSidebarOpen(false));

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setSidebarOpen(false);
            }
        });
    }

    return { html, attachListeners };
}