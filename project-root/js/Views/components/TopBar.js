export function TopBarComponent() {
    return `
        <header class="top-bar" aria-label="Top navigation">
            <img class="top-bar-image" src="assets/payakumbuh-logo.png" alt="Payakumbuh">

            <button
                class="sidebar-toggle"
                type="button"
                aria-label="Open sidebar"
                aria-controls="page-sidebar"
                aria-expanded="false"
            >
                <svg aria-hidden="true" width="42" height="36" viewBox="0 0 42 36">
                    <rect x="1" y="2" width="40" height="7" rx="3.5" fill="#E7A2B2"></rect>
                    <rect x="1" y="14.5" width="40" height="7" rx="3.5" fill="#E7A2B2"></rect>
                    <rect x="1" y="27" width="40" height="7" rx="3.5" fill="#E7A2B2"></rect>
                </svg>
            </button>
        </header>
    `;
}
