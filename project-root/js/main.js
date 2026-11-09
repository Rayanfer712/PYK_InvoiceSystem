import { TopBarComponent } from './Views/components/TopBar.js';
import { SidebarComponent } from './Views/components/SideBar.js';
import { UserView } from './Views/User/UserView.js';
import { TreasuryView } from './Views/Treasury/TreasuryView.js';

const appContainer = document.getElementById('app');

const pageViews = {
    user: UserView,
    treasury: TreasuryView
};

function renderApp() {
    if (!appContainer) return;

    const sidebar = SidebarComponent();

    // Build the shared website shell once. Only the page content changes
    // when the user chooses another page from the sidebar.
    appContainer.innerHTML = `
        ${TopBarComponent()}
        <main class="page-content" id="page-content" aria-live="polite"></main>
        ${sidebar.html}
    `;

    const pageContent = document.getElementById('page-content');
    let currentView = 'user'; 

    function renderView(viewName) {
        const View = pageViews[viewName];
        if (!View || !pageContent) return;

        currentView = viewName;
        const view = View();
        const isComponentObject = typeof view !== 'string';

        pageContent.className = `page-content ${viewName}-view`;
        pageContent.innerHTML = isComponentObject ? view.html : view;

        // Some views, like the Treasury, have their own interactions :)
        if (isComponentObject && typeof view.attachListeners === 'function') {
            view.attachListeners();
        }

        // Show which page is currently selected in the sidebar.
        document.querySelectorAll('[data-view]').forEach((button) => {
            const isActive = button.dataset.view === currentView;
            button.classList.toggle('is-active', isActive);
            if (isActive) {
                button.setAttribute('aria-current', 'page');
            } else {
                button.removeAttribute('aria-current');
            }
        });
    }

    sidebar.attachListeners((viewName) => {
        renderView(viewName);
    });

    renderView(currentView);
}

renderApp();
