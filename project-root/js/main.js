import { TopBarComponent } from './Views/components/TopBar.js';
import { SidebarComponent } from './Views/components/SideBar.js?v=2';
import { attachInvoiceModalListeners, UserView } from './Views/User/UserView.js';
import { UserProfileView } from './Views/User/UserProfileView.js?v=2';
import { LoginView } from './Views/Login/LoginView.js';

const appContainer = document.getElementById('app');

function renderApp(activeView = 'user') {
    if (!appContainer) {
        return;
    }

    const userRole = 'User';
    const isLoginView = activeView === 'login';
    const sidebar = isLoginView ? null : SidebarComponent(() => renderApp('profile'));
    let currentView = '';

    if (isLoginView) {
        currentView = LoginView();
    } else if (userRole === 'User') {
        currentView = activeView === 'profile' ? UserProfileView() : UserView();
    }

    appContainer.innerHTML = `
        ${isLoginView ? '' : TopBarComponent()}
        <main class="page-content">
            ${currentView}
        </main>
        ${sidebar?.html ?? ''}
    `;

    sidebar?.attachListeners();
    if (activeView === 'user') {
        attachInvoiceModalListeners();
    }

    if (activeView === 'profile') {
        document.querySelector(".back-home-button")?.addEventListener("click", () => renderApp('user'));
        document.querySelector(".logout-button")?.addEventListener("click", () => renderApp('login'));
    }

    if (isLoginView) {
        document.querySelector(".login-card")?.addEventListener("submit", (event) => {
            event.preventDefault();
            renderApp(document.querySelector("#view-selector")?.value === "user" ? "user" : "user");
        });
    }
}

renderApp('login');