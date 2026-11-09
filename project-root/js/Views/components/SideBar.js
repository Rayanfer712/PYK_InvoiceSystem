export function SidebarComponent() {
    const html = `
        <div class="sidebar-backdrop" aria-hidden="true"></div>
        <aside class="sidebar" id="page-sidebar" aria-label="Sidebar" aria-hidden="true" inert>
            <div class="sidebar-top-cover" aria-hidden="true"></div>

            <div class="sidebar-panel">
                <div class="sidebar-item profile-card" aria-label="Profile card">
                    <div class="profile-avatar" aria-hidden="true"></div>
                    <div class="profile-meta">
                        <span class="profile-name">John Doe</span>
                        <span class="profile-company">PYK Company</span>
                    </div>
                </div>

                <div class="sidebar-section-label">PAGES</div>
                <button class="sidebar-item nav-item" type="button" data-view="user">
                    <span class="nav-icon" aria-hidden="true"></span>
                    <span>User Dashboard</span>
                </button>
                <button class="sidebar-item nav-item" type="button" data-view="treasury">
                    <span class="nav-icon" aria-hidden="true"></span>
                    <span>Treasury</span>
                </button>

                <div class="sidebar-section-label">OTHER</div>
                <button class="sidebar-item nav-item" type="button" aria-label="Settings (not implemented yet)" disabled>
                    <span class="nav-icon" aria-hidden="true"></span>
                    <span>Settings</span>
                </button>

                <button class="sidebar-item nav-item" type="button" aria-label="Inbox (not implemented yet)" disabled>
                    <span class="nav-icon" aria-hidden="true"></span>
                    <span>Inbox</span>
                </button>

                <button class="sidebar-item nav-item" type="button" aria-label="Lorem ipsum (not implemented yet)" disabled>
                    <span class="nav-icon" aria-hidden="true"></span>
                    <span>Lorem ipsum</span>
                </button>
            </div>
        </aside>
    `;

    function attachListeners(onNavigate = () => {}) {
        const sidebarToggle = document.querySelector(".sidebar-toggle");
        const sidebarBackdrop = document.querySelector(".sidebar-backdrop");
        const sidebar = document.querySelector(".sidebar");

        if (!sidebarToggle || !sidebarBackdrop || !sidebar) {
            return;
        }

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
       
sidebar.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => {
        onNavigate(button.dataset.view);
        setSidebarOpen(false);
    });
});

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setSidebarOpen(false);
            }
        });
    }

    return { html, attachListeners };
}
