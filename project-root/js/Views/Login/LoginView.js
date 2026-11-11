export function LoginView() {
    return `
        <section class="login-page" aria-label="Login">
            <form class="login-card">
                <h1>Login</h1>
                <label for="view-selector">Choose a view</label>
                <select id="view-selector" name="view">
                    <option value="user">Userview</option>
                    <option value="ap-verification">AP Verification</option>
                    <option value="admin">Admin</option>
                    <option value="treasury">Treasury</option>
                </select>
                <button type="submit">Continue</button>
            </form>
        </section>
    `;
}
