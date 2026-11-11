const treasuryInvoice = {
    documentNumber: 'DOC-2026-002',
    vendor: 'RM Payakumbuh Ciater',
    purchaseOrder: 'PO-2026-7715',
    amount: 'Rp 48.500.000',
    status: 'AP Verified'
};

function renderInvoiceDetails(invoice) {
    return `
        <div class="invoice-detail-content">
            <div class="invoice-detail-heading">
                <div>
                    <p class="detail-eyebrow">INFORMASI TAGIHAN</p>
                    <h2>${invoice.documentNumber}</h2>
                </div>
                <span class="invoice-status">${invoice.status}</span>
            </div>

            <div class="invoice-detail-grid">
                <div class="detail-field">
                    <span>Vendor</span>
                    <strong>${invoice.vendor}</strong>
                </div>
                <div class="detail-field">
                    <span>Purchase Order</span>
                    <strong>${invoice.purchaseOrder}</strong>
                </div>
                <div class="detail-field detail-field-amount">
                    <span>Total Tagihan</span>
                    <strong>${invoice.amount}</strong>
                </div>
            </div>
        </div>
    `;
}

export function TreasuryView() {
    const html = `
        <section class="treasury-layout" aria-label="Treasury dashboard">
            <section class="treasury-list-panel" aria-labelledby="ready-invoices-title">
                <header class="treasury-list-header">
                    <h1 id="ready-invoices-title">Siap Dibayar</h1>
                    <span class="invoice-count">1 Tagihan</span>
                </header>

                <div class="invoice-list" aria-label="Daftar tagihan siap dibayar">
                    <button class="invoice-card" type="button" aria-pressed="false">
                        <span class="invoice-card-topline">
                            <span class="invoice-document-number">${treasuryInvoice.documentNumber}</span>
                            <span class="invoice-card-status">${treasuryInvoice.status}</span>
                        </span>
                        <span class="invoice-card-vendor">${treasuryInvoice.vendor}</span>
                        <span class="invoice-card-bottomline">
                            <span>PO: ${treasuryInvoice.purchaseOrder}</span>
                            <strong>${treasuryInvoice.amount}</strong>
                        </span>
                    </button>

                    <div class="invoice-skeleton" aria-hidden="true"></div>
                    <div class="invoice-skeleton" aria-hidden="true"></div>
                </div>
            </section>

            <section class="treasury-detail-panel" aria-label="Detail tagihan">
                <div class="treasury-detail-header" aria-hidden="true"></div>
                <div class="invoice-detail-body" aria-live="polite">
                    <p class="empty-detail-message">Pilih tagihan di treasury</p>
                </div>
            </section>
        </section>
    `;

    function attachListeners() {
        const invoiceCard = document.querySelector('.invoice-card');
        const detailBody = document.querySelector('.invoice-detail-body');

        if (!invoiceCard || !detailBody) return;

        invoiceCard.addEventListener('click', () => {
            invoiceCard.classList.add('is-selected');
            invoiceCard.setAttribute('aria-pressed', 'true');
            detailBody.innerHTML = renderInvoiceDetails(treasuryInvoice);
        });
    }

    return { html, attachListeners };
}
