import { TopBarComponent } from './Views/components/TopBar.js';
import { SidebarComponent } from './Views/components/SideBar.js';
import { UserView } from './Views/User/UserView.js';

const appContainer = document.getElementById('app');

function renderApp() {
    if (!appContainer) {
        return;
    }

    const userRole = 'User';
    const sidebar = SidebarComponent();
    let currentView = '';

    if (userRole === 'User') {
        currentView = UserView();
    }

    appContainer.innerHTML = `
        ${TopBarComponent()}
        <main class="page-content">
            ${currentView}
        </main>
        ${sidebar.html}
    `;

    sidebar.attachListeners();
}

renderApp();