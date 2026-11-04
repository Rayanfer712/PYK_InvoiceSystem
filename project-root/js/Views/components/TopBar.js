export function TopBarComponent() {
    return `
        <header class="top-bar" aria-label="Top bar">
            <img
                class="top-bar-image"
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 80'%3E%3Crect width='96' height='80' rx='12' fill='%23D9D9D9'/%3E%3Ccircle cx='48' cy='40' r='24' fill='%23C30E30'/%3E%3Cpath d='M48 22l5.5 11.2 12.3 1.8-8.9 8.7 2.1 12.3L48 50.2l-11 5.8 2.1-12.3-8.9-8.7 12.3-1.8z' fill='%23D9D9D9'/%3E%3C/svg%3E"
                alt="Test graphic"
            >
            <button class="sidebar-toggle" type="button" aria-label="Open sidebar" aria-controls="page-sidebar" aria-expanded="false">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"></path>
                </svg>
            </button>
        </header>
    `;
}