export function UserProfileView() {
    return `
        <section class="profile-page-box" aria-label="User profile">
            <header class="profile-page-header">
                <span>User profile</span>
                <button class="back-home-button" type="button">Back to home</button>
            </header>
            <div class="profile-page-content">
                <div class="profile-page-details">
                    <dl>
                        <div>
                            <dt>User name</dt>
                            <dd>John Doe</dd>
                        </div>
                        <div>
                            <dt>Company</dt>
                            <dd>PYK Company</dd>
                        </div>
                        <div>
                            <dt>Email</dt>
                            <dd>john.doe@pyk.example</dd>
                        </div>
                        <div>
                            <dt>ID</dt>
                            <dd>PYK-0001</dd>
                        </div>
                        <div>
                            <dt>Vendor type</dt>
                            <dd>Supplier</dd>
                        </div>
                        <div>
                            <dt>Address</dt>
                            <dd>123 Example Street, Jakarta</dd>
                        </div>
                    </dl>
                </div>
                <div class="profile-page-avatar" aria-label="User profile picture" role="img"></div>
            </div>
            <div class="profile-page-actions">
                <button type="button">Change password</button>
                <button type="button">Payment</button>
                <button class="logout-button" type="button">Logout</button>
            </div>
        </section>
    `;
}
