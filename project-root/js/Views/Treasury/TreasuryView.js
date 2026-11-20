// Sample invoices for the scrollable Treasury list.
// The invoice information stays the same as the original sample but only the amount changes for example purposes 
const invoiceTemplate = {
    documentNumber: 'DOC-2026-002',
    vendor: 'RM Payakumbuh Ciater',
    purchaseOrder: 'PO-2026-7715',
    status: 'AP Verified',
    bankName: 'BCA',
    bankAccount: '83012938131',
    accountName: 'PT Sumber Makmur Jaya'
};

const treasuryInvoices = [
    { ...invoiceTemplate, id: 'invoice-1', amount: 'Rp 48.500.000', paymentConfirmed: false },
    { ...invoiceTemplate, id: 'invoice-2', amount: 'Rp 32.750.000', paymentConfirmed: false },
    { ...invoiceTemplate, id: 'invoice-3', amount: 'Rp 65.200.000', paymentConfirmed: false },
    { ...invoiceTemplate, id: 'invoice-4', amount: 'Rp 17.850.000', paymentConfirmed: false },
    { ...invoiceTemplate, id: 'invoice-5', amount: 'Rp 24.300.000', paymentConfirmed: false },
    { ...invoiceTemplate, id: 'invoice-6', amount: 'Rp 91.000.000', paymentConfirmed: false },
    { ...invoiceTemplate, id: 'invoice-7', amount: 'Rp 56.400.000', paymentConfirmed: false },
    { ...invoiceTemplate, id: 'invoice-8', amount: 'Rp 12.600.000', paymentConfirmed: false }
];

function renderInvoiceCard(invoice, index) {
    return `
        <button class="invoice-card" type="button" data-invoice-index="${index}" aria-pressed="false">
            <span class="invoice-card-topline">
                <span class="invoice-document-number">${invoice.documentNumber}</span>
                <span class="invoice-card-status">${invoice.status}</span>
            </span>
            <span class="invoice-card-vendor">${invoice.vendor}</span>
            <span class="invoice-card-bottomline">
                <span>PO: ${invoice.purchaseOrder}</span>
                <strong>${invoice.amount}</strong>
            </span>
        </button>
    `;
}

function renderInvoiceDetails(invoice) {
    return `
        <div class="treasury-payment-content">
            <div class="treasury-invoice-summary">
                <div class="treasury-summary-main">
                    <p class="treasury-document-number">${invoice.documentNumber}</p>
                    <div class="treasury-vendor-route">
                        <strong>${invoice.vendor}</strong>
                        <span aria-hidden="true">&#8594;</span>
                        <strong>${invoice.vendor}</strong>
                    </div>
                    <p class="treasury-bank-detail">
                        Bank: ${invoice.bankName} ${invoice.bankAccount} AN ${invoice.accountName}
                    </p>
                    <p class="treasury-po-detail">PO: ${invoice.purchaseOrder}</p>
                </div>
                <div class="treasury-summary-amount">
                    <span>Jumlah Pembayaran</span>
                    <strong>${invoice.amount}</strong>
                </div>
            </div>

            <form class="transfer-form" id="transfer-form" novalidate>
                <h2>FORM TRANSFER</h2>

                <div class="transfer-form-grid">
                    <label class="transfer-field">
                        <span>Metode Pembayaran</span>
                        <select id="payment-method" name="paymentMethod" required>
                            <option value="Bank Transfer (RTGS / SKN)" selected>Bank Transfer (RTGS / SKN)</option>
                            <option value="Bank Transfer (BI-FAST)">Bank Transfer (BI-FAST)</option>
                            <option value="Virtual Account">Virtual Account</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>

                    <label class="transfer-field">
                        <span>Nomor Referensi Bank / No. Resi</span>
                        <input
                            id="bank-reference"
                            name="bankReference"
                            type="text"
                            placeholder="Masukkan nomor referensi"
                            autocomplete="off"
                            maxlength="80"
                            required
                        >
                    </label>

                    <div class="transfer-proof-field">
                        <label class="transfer-field-label" for="proof-file">
                            Lampiran Bukti Pembayaran (PDF/IMAGE)
                        </label>
                        <div class="proof-file-card">
                            <span class="proof-file-type" id="proof-file-type" aria-hidden="true">PDF</span>
                            <span class="proof-file-name" id="proof-file-name">Belum ada file dipilih</span>
                            <span class="proof-file-status" id="proof-file-status">Required</span>
                            <label class="proof-choose-button" for="proof-file">Pilih File</label>
                            <input
                                class="visually-hidden"
                                id="proof-file"
                                name="paymentProof"
                                type="file"
                                accept="application/pdf,image/png,image/jpeg,image/webp"
                                required
                            >
                        </div>
                        <div class="proof-preview" id="proof-preview" hidden></div>
                        <p class="proof-help">Format yang didukung: PDF, PNG, JPG, WEBP. Maksimal 10 MB.</p>
                    </div>
                </div>

                <p class="transfer-feedback" id="transfer-feedback" role="status" aria-live="polite"></p>

                <div class="transfer-form-actions">
                    <button class="transfer-reject-button" type="button">
                        Tolak / Cancel
                    </button>
                    <button class="transfer-submit-button" type="submit">
                        Bayar dan Kirim
                    </button>
                </div>
            </form>

            <!-- Confirmation pop-up shown after the payment form passes validation. -->
            <div class="payment-confirmation-backdrop" id="payment-confirmation-modal" hidden>
                <section class="payment-confirmation-dialog" role="dialog" aria-modal="true" aria-labelledby="payment-confirmation-title" aria-describedby="payment-confirmation-message">
                    <div class="payment-confirmation-icon" aria-hidden="true">?</div>
                    <h2 id="payment-confirmation-title">Konfirmasi Pembayaran</h2>
                    <p id="payment-confirmation-message">Apakah Anda yakin? Pastikan semua informasi sudah benar sebelum mengirimkannya.</p>
                    <div class="payment-confirmation-actions">
                        <button class="payment-confirmation-cancel" type="button">Batal</button>
                        <button class="payment-confirmation-accept" type="button">Ya, Kirim</button>
                    </div>
                </section>
            </div>
        </div>
    `;
}

export function TreasuryView() {
    const html = `
        <section class="invoice-layout" aria-label="Treasury dashboard">
            <section class="invoice-list-panel" aria-labelledby="ready-invoices-title">
                <header class="invoice-list-header">
                    <h1 id="ready-invoices-title">Siap Dibayar</h1>
                    <span class="invoice-count">${treasuryInvoices.length} Tagihan</span>
                </header>

                <div class="invoice-list" aria-label="Daftar tagihan siap dibayar">
                    ${treasuryInvoices.map((invoice, index) => renderInvoiceCard(invoice, index)).join('')}
                </div>
            </section>

            <section class="invoice-detail-panel" aria-label="Detail tagihan">
                <div class="invoice-detail-header" aria-hidden="true"></div>
                <div class="invoice-detail-body" aria-live="polite">
                    <p class="empty-detail-message">Pilih tagihan di treasury</p>
                </div>
            </section>
        </section>
    `;

    function attachPaymentFormListeners(detailBody, invoice, invoiceCard) {
        const form = detailBody.querySelector('#transfer-form');
        if (!form) return;

        const fileInput = form.querySelector('#proof-file');
        const fileName = form.querySelector('#proof-file-name');
        const fileType = form.querySelector('#proof-file-type');
        const fileStatus = form.querySelector('#proof-file-status');
        const preview = form.querySelector('#proof-preview');
        const feedback = form.querySelector('#transfer-feedback');
        const submitButton = form.querySelector('.transfer-submit-button');
        const rejectButton = form.querySelector('.transfer-reject-button');
        const modal = detailBody.querySelector('#payment-confirmation-modal');
        const acceptButton = modal.querySelector('.payment-confirmation-accept');
        const modalCancelButton = modal.querySelector('.payment-confirmation-cancel');
        let previewUrl = null;
        let paymentConfirmed = Boolean(invoice.paymentConfirmed);

        const closeConfirmation = () => {
            modal.hidden = true;
            submitButton.focus();
        };

        const resetConfirmationState = () => {
            if (paymentConfirmed) {
                paymentConfirmed = false;
                invoice.paymentConfirmed = false;
                submitButton.disabled = false;
                submitButton.textContent = 'Bayar dan Kirim';
            }
        };

        const showFeedback = (message, type = 'is-info') => {
            feedback.textContent = message;
            feedback.className = `transfer-feedback ${type}`;
        };

        // Each duplicated ticket keeps its own confirmed/rejected state.
        if (invoice.status === 'Ditolak / Cancel') {
            form.querySelectorAll('input, select').forEach((field) => {
                field.disabled = true;
            });
            submitButton.disabled = true;
            rejectButton.disabled = true;
            rejectButton.textContent = 'Tagihan Dibatalkan';
            showFeedback(
                'Tagihan ini sudah ditolak/dibatalkan. Pilih tagihan lain untuk melanjutkan pembayaran.',
                'is-danger'
            );
            return;
        }

        if (paymentConfirmed) {
            submitButton.disabled = true;
            submitButton.textContent = 'Konfirmasi Diterima';
            showFeedback(
                'Konfirmasi pembayaran untuk tagihan ini sudah diterima pada tampilan ini.',
                'is-info'
            );
        }

        fileInput.addEventListener('change', () => {
            const file = fileInput.files?.[0];
            resetConfirmationState();
            feedback.textContent = '';
            feedback.className = 'transfer-feedback';

            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                previewUrl = null;
            }
            preview.replaceChildren();
            preview.hidden = true;

            if (!file) {
                fileName.textContent = 'Belum ada file dipilih';
                fileType.textContent = 'PDF';
                fileStatus.textContent = 'Required';
                fileStatus.classList.remove('is-ready');
                fileInput.setCustomValidity('Lampirkan bukti pembayaran terlebih dahulu.');
                return;
            }

            const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
            const isImage = file.type.startsWith('image/') && ['image/png', 'image/jpeg', 'image/webp'].includes(file.type);
            if (!isPdf && !isImage) {
                fileInput.value = '';
                fileInput.setCustomValidity('Gunakan file PDF, PNG, JPG, atau WEBP.');
                fileInput.reportValidity();
                fileName.textContent = 'Format file tidak didukung';
                fileStatus.textContent = 'Invalid';
                fileStatus.classList.remove('is-ready');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                fileInput.value = '';
                fileInput.setCustomValidity('Ukuran file maksimal 10 MB.');
                fileInput.reportValidity();
                fileName.textContent = 'File melebihi 10 MB';
                fileStatus.textContent = 'Too large';
                fileStatus.classList.remove('is-ready');
                return;
            }

            fileInput.setCustomValidity('');
            fileName.textContent = file.name;
            fileType.textContent = isPdf ? 'PDF' : file.type === 'image/png' ? 'PNG' : file.type === 'image/webp' ? 'WEBP' : 'JPG';
            fileStatus.textContent = 'Ready';
            fileStatus.classList.add('is-ready');

            previewUrl = URL.createObjectURL(file);
            if (isImage) {
                const image = document.createElement('img');
                image.src = previewUrl;
                image.alt = 'Preview bukti pembayaran';
                preview.append(image);
            } else {
                const pdfMessage = document.createElement('span');
                pdfMessage.textContent = `PDF siap dilampirkan: ${file.name}`;
                preview.append(pdfMessage);
            }
            preview.hidden = false;
        });

        form.querySelectorAll('input, select').forEach((field) => {
            field.addEventListener('input', () => {
                resetConfirmationState();
                feedback.textContent = '';
                feedback.className = 'transfer-feedback';
            });
            field.addEventListener('change', () => {
                resetConfirmationState();
                feedback.textContent = '';
                feedback.className = 'transfer-feedback';
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!fileInput.files?.length) {
                fileInput.setCustomValidity('Lampirkan bukti pembayaran terlebih dahulu.');
            }
            if (!form.reportValidity()) return;

            modal.hidden = false;
            modalCancelButton.focus();
        });

        acceptButton.addEventListener('click', () => {
            modal.hidden = true;
            paymentConfirmed = true;
            invoice.paymentConfirmed = true;
            showFeedback(
                'Konfirmasi diterima. Data pembayaran sudah lengkap dan siap diproses. Pemrosesan pembayaran serta pengiriman email tetap memerlukan sambungan backend.',
                'is-info'
            );
            submitButton.textContent = 'Konfirmasi Diterima';
            submitButton.disabled = true;
            rejectButton.focus();
        });

        modalCancelButton.addEventListener('click', closeConfirmation);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeConfirmation();
        });

        modal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeConfirmation();
            }
        });

        // Reject/cancel is an immediate front-end action, as requested.
        rejectButton.addEventListener('click', () => {
            const cardStatus = invoiceCard.querySelector('.invoice-card-status');
            if (cardStatus) cardStatus.textContent = 'Ditolak / Cancel';

            invoice.status = 'Ditolak / Cancel';
            showFeedback(
                'Tagihan ditolak/dibatalkan pada tampilan ini. Status belum tersimpan ke database karena backend belum terhubung.',
                'is-danger'
            );

            form.querySelectorAll('input, select').forEach((field) => {
                field.disabled = true;
            });
            submitButton.disabled = true;
            rejectButton.disabled = true;
            rejectButton.textContent = 'Tagihan Dibatalkan';
        });
    }

    function attachListeners() {
        const invoiceCards = document.querySelectorAll('.invoice-card[data-invoice-index]');
        const detailBody = document.querySelector('.invoice-detail-body');

        if (!invoiceCards.length || !detailBody) return;

        invoiceCards.forEach((invoiceCard) => {
            invoiceCard.addEventListener('click', () => {
                const invoiceIndex = Number(invoiceCard.dataset.invoiceIndex);
                const selectedInvoice = treasuryInvoices[invoiceIndex];
                if (!selectedInvoice) return;

                invoiceCards.forEach((card) => {
                    card.classList.remove('is-selected');
                    card.setAttribute('aria-pressed', 'false');
                });

                invoiceCard.classList.add('is-selected');
                invoiceCard.setAttribute('aria-pressed', 'true');
                detailBody.classList.add('has-payment-form');
                detailBody.innerHTML = renderInvoiceDetails(selectedInvoice);
                attachPaymentFormListeners(detailBody, selectedInvoice, invoiceCard);
            });
        });
    }

    return { html, attachListeners };
}
