import { TopBarComponent } from './Views/components/TopBar.js';
import { SidebarComponent } from './Views/components/SideBar.js?v=2';
import { attachInvoiceModalListeners, UserView } from './Views/User/UserView.js';
import { UserProfileView } from './Views/User/UserProfileView.js';

const appContainer = document.getElementById('app');

function renderApp(activeView = 'user') {
    if (!appContainer) {
        return;
    }

    const userRole = 'User';
    const sidebar = SidebarComponent(() => renderApp('profile'));
    let currentView = '';

    if (userRole === 'User') {
        currentView = activeView === 'profile' ? UserProfileView() : UserView();
    }

    appContainer.innerHTML = `
        ${TopBarComponent()}
        <main class="page-content">
            ${currentView}
        </main>
        ${sidebar.html}
    `;

    sidebar.attachListeners();
    if (activeView === 'user') {
        attachInvoiceModalListeners();
    }

    if (activeView === 'profile') {
        document.querySelector(".back-home-button")?.addEventListener("click", () => renderApp('user'));
    }
}

renderApp();