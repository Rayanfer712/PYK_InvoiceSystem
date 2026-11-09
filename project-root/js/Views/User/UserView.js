export function UserView() {
    return `
        <section class="box top-box" aria-label="Invoice actions">
            <button class="invoice-button" type="button" aria-controls="invoice-modal" aria-expanded="false">
                <span class="invoice-button-mark" aria-hidden="true">+</span>
                <span>Add new invoice</span>
            </button>
        </section>
        <section class="box center-box" aria-label="Invoices">
            <div class="invoice-table-wrapper">
                <table class="invoice-table">
                    <caption class="visually-hidden">Invoice list</caption>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Branch name</th>
                            <th scope="col">No. PO &amp; Invoice</th>
                            <th scope="col">Document status</th>
                            <th scope="col">Status</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" value="INV-001" aria-label="ID"></td>
                            <td><input type="text" value="Main branch" aria-label="Branch name"></td>
                            <td><input type="text" value="PO-2026-001" aria-label="No. PO and Invoice"></td>
                            <td>
                                <span class="table-status">Missing</span>
                            </td>
                            <td>
                                <span class="table-status">Pending</span>
                            </td>
                            <td><input type="text" value="Awaiting review" aria-label="Notes"></td>
                            <td><button class="table-action" type="button">View</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <div class="invoice-modal-backdrop" aria-hidden="true"></div>
        <section class="invoice-modal" id="invoice-modal" role="dialog" aria-modal="true" aria-labelledby="invoice-modal-title" aria-hidden="true" inert>
            <header class="invoice-modal-header">
                <h2 id="invoice-modal-title">Add new invoice</h2>
                <button class="invoice-modal-close" type="button" aria-label="Close invoice form">X</button>
            </header>
            <form class="invoice-form">
                <div class="invoice-form-body">
                    <fieldset class="invoice-details">
                        <legend>Invoice details</legend>
                        <label>
                            Supplier name
                            <input type="text" name="supplier-name">
                        </label>
                        <label>
                            Price
                            <input type="number" name="price" min="0" step="0.01">
                        </label>
                        <label>
                            PO number
                            <input type="text" name="po-number">
                        </label>
                        <label>
                            Supplier number
                            <input type="text" name="supplier-number">
                        </label>
                    </fieldset>
                    <fieldset class="invoice-documents">
                        <legend>Documents</legend>
                        <label class="file-field">
                            PDF Purchase order
                            <input type="file" name="purchase-order" accept=".pdf,application/pdf">
                        </label>
                        <label class="file-field">
                            PDF Good receipt
                            <input type="file" name="good-receipt" accept=".pdf,application/pdf">
                        </label>
                        <label class="file-field">
                            Invoice supplier
                            <input type="file" name="supplier-invoice" accept=".pdf,application/pdf">
                        </label>
                        <label class="file-field">
                            Travel note
                            <input type="file" name="travel-note" accept=".pdf,application/pdf">
                        </label>
                        <label class="file-field">
                            Notes
                            <input type="file" name="notes">
                        </label>
                    </fieldset>
                </div>
                <div class="invoice-form-actions">
                    <button class="invoice-cancel" type="button">Cancel</button>
                    <button class="invoice-submit" type="submit">Submit AP</button>
                </div>
            </form>
        </section>
    `;
}

export function attachInvoiceModalListeners() {
    const invoiceButton = document.querySelector(".invoice-button");
    const modalBackdrop = document.querySelector(".invoice-modal-backdrop");
    const modal = document.querySelector(".invoice-modal");
    const closeButton = document.querySelector(".invoice-modal-close");
    const cancelButton = document.querySelector(".invoice-cancel");
    const invoiceForm = document.querySelector(".invoice-form");
    const firstInput = modal?.querySelector("input");

    if (!invoiceButton || !modalBackdrop || !modal || !closeButton || !cancelButton || !invoiceForm) {
        return;
    }

    function setModalOpen(isOpen) {
        document.body.classList.toggle("invoice-modal-open", isOpen);
        invoiceButton.setAttribute("aria-expanded", String(isOpen));
        modal.setAttribute("aria-hidden", String(!isOpen));
        modal.inert = !isOpen;

        if (isOpen) {
            firstInput?.focus();
        } else {
            invoiceButton.focus();
        }
    }

    invoiceButton.addEventListener("click", () => setModalOpen(true));
    closeButton.addEventListener("click", () => setModalOpen(false));
    cancelButton.addEventListener("click", () => setModalOpen(false));
    modalBackdrop.addEventListener("click", () => setModalOpen(false));

    invoiceForm.addEventListener("submit", (event) => {
        event.preventDefault();
        setModalOpen(false);
    });

    modal.querySelectorAll('input[type="file"]').forEach((fileInput) => {
        fileInput.addEventListener("change", () => {
            fileInput.closest(".file-field")?.classList.toggle("file-selected", fileInput.files.length > 0);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && document.body.classList.contains("invoice-modal-open")) {
            setModalOpen(false);
        }
    });
}