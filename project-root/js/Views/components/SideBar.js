export function SidebarComponent(onProfileOpen) {
    const html = `
        <div class="sidebar-backdrop" aria-hidden="true"></div>
        <aside class="sidebar" id="page-sidebar" aria-label="Sidebar" aria-hidden="true" inert>
            <div class="sidebar-top-cover" aria-hidden="true"></div>

            <div class="sidebar-panel">
                <button class="sidebar-item profile-card" type="button" aria-label="Open profile">
                    <div class="profile-avatar" aria-hidden="true"></div>
                    <div class="profile-meta">
                        <span class="profile-name">John Doe</span>
                        <span class="profile-company">PYK Company</span>
                    </div>
                </button>

                <button class="sidebar-item nav-item" type="button" aria-label="Open settings">
                    <span class="nav-icon" aria-hidden="true"></span>
                    <span>Settings</span>
                </button>

                <button class="sidebar-item nav-item" type="button" aria-label="Open inbox">
                    <span class="nav-icon" aria-hidden="true"></span>
                    <span>Inbox</span>
                </button>

                <button class="sidebar-item nav-item" type="button" aria-label="Open lorem ipsum">
                    <span class="nav-icon" aria-hidden="true"></span>
                    <span>Lorem ipsum</span>
                </button>
            </div>
        </aside>
    `;

    function attachListeners() {
        const sidebarToggle = document.querySelector(".sidebar-toggle");
        const sidebarBackdrop = document.querySelector(".sidebar-backdrop");
        const sidebar = document.querySelector(".sidebar");
        const profileCard = document.querySelector(".profile-card");

        if (!sidebarToggle || !sidebarBackdrop || !sidebar || !profileCard) {
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
        profileCard.addEventListener("click", () => {
            setSidebarOpen(false);
            onProfileOpen?.();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                setSidebarOpen(false);
            }
        });
    }

    return { html, attachListeners };
}