const invoices = [
    {
        id: "INV-001",
        supplierName: "Main branch",
        poNumber: "PO-2026-001",
        documentStatus: "Missing",
        status: "Pending",
        notes: "Awaiting review",
        price: "",
        supplierNumber: "",
        files: {},
    },
    {
        id: "INV-002",
        supplierName: "Accepted supplier",
        poNumber: "PO-2026-002",
        documentStatus: "Finished",
        status: "Accepted",
        notes: "Approved for payment",
        price: "2450",
        supplierNumber: "SUP-002",
        files: {
            "purchase-order": "accepted-purchase-order.pdf",
            "good-receipt": "accepted-good-receipt.pdf",
            "supplier-invoice": "accepted-supplier-invoice.pdf",
            "travel-note": "accepted-travel-note.pdf",
            notes: "accepted-notes.pdf",
        },
    },
    {
        id: "INV-003",
        supplierName: "Declined supplier",
        poNumber: "PO-2026-003",
        documentStatus: "Missing",
        status: "Declined",
        notes: "Invoice supplier document is missing",
        price: "1800",
        supplierNumber: "SUP-003",
        files: {
            "purchase-order": "declined-purchase-order.pdf",
            "good-receipt": "declined-good-receipt.pdf",
            "supplier-invoice": "",
            "travel-note": "declined-travel-note.pdf",
            notes: "declined-notes.pdf",
        },
    },
];

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getFileNames(invoice) {
    return invoice.files ?? {};
}

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
                        ${invoices.map((invoice) => `
                            <tr>
                                <td><input type="text" value="${escapeHtml(invoice.id)}" aria-label="ID"></td>
                                <td><input type="text" value="${escapeHtml(invoice.supplierName)}" aria-label="Branch name"></td>
                                <td><input type="text" value="${escapeHtml(invoice.poNumber)}" aria-label="No. PO and Invoice"></td>
                                <td><span class="table-status">${escapeHtml(invoice.documentStatus)}</span></td>
                                <td><span class="table-status">${escapeHtml(invoice.status)}</span></td>
                                <td><input type="text" value="${escapeHtml(invoice.notes)}" aria-label="Notes"></td>
                                <td><button class="table-action" type="button" data-invoice-index="${invoices.indexOf(invoice)}">View</button></td>
                            </tr>
                        `).join("")}
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
                            <input type="text" name="supplier-name" required>
                        </label>
                        <label>
                            Price
                            <input type="number" name="price" min="0" step="0.01" required>
                        </label>
                        <label>
                            PO number
                            <input type="text" name="po-number" required>
                        </label>
                        <label>
                            Supplier number
                            <input type="text" name="supplier-number" required>
                        </label>
                    </fieldset>
                    <fieldset class="invoice-documents">
                        <legend>Documents</legend>
                        <label class="file-field">
                            PDF Purchase order
                            <input type="file" name="purchase-order" accept=".pdf,application/pdf" required>
                        </label>
                        <label class="file-field">
                            PDF Good receipt
                            <input type="file" name="good-receipt" accept=".pdf,application/pdf" required>
                        </label>
                        <label class="file-field">
                            Invoice supplier
                            <input type="file" name="supplier-invoice" accept=".pdf,application/pdf" required>
                        </label>
                        <label class="file-field">
                            Travel note
                            <input type="file" name="travel-note" accept=".pdf,application/pdf" required>
                        </label>
                        <label class="file-field">
                            Notes
                            <input type="file" name="notes" required>
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

export function attachInvoiceModalListeners(onSubmit) {
    const invoiceButton = document.querySelector(".invoice-button");
    const modalBackdrop = document.querySelector(".invoice-modal-backdrop");
    const modal = document.querySelector(".invoice-modal");
    const closeButton = document.querySelector(".invoice-modal-close");
    const cancelButton = document.querySelector(".invoice-cancel");
    const invoiceForm = document.querySelector(".invoice-form");
    const submitButton = document.querySelector(".invoice-submit");
    const modalTitle = document.querySelector("#invoice-modal-title");
    const firstInput = modal?.querySelector("input");
    let activeInvoice = null;

    if (!invoiceButton || !modalBackdrop || !modal || !closeButton || !cancelButton || !invoiceForm || !submitButton || !modalTitle) {
        return;
    }

    function setModalMode(mode) {
        const isAddMode = mode === "add";
        const isDeclinedMode = mode === "declined";
        const isReadOnly = !isAddMode && !isDeclinedMode;
        modalTitle.textContent = isAddMode
            ? "Add new invoice"
            : isDeclinedMode
                ? "Resubmit declined invoice"
                : "View invoice";
        submitButton.hidden = isReadOnly;
        cancelButton.textContent = isReadOnly ? "Close" : "Cancel";

        invoiceForm.querySelectorAll("input").forEach((input) => {
            input.disabled = isReadOnly || (isDeclinedMode && input.name !== "supplier-invoice");
        });
    }

    function setModalOpen(isOpen, mode = "add") {
        document.body.classList.toggle("invoice-modal-open", isOpen);
        invoiceButton.setAttribute("aria-expanded", String(isOpen));
        modal.setAttribute("aria-hidden", String(!isOpen));
        modal.inert = !isOpen;

        if (isOpen) {
            setModalMode(mode);
            firstInput?.focus();
        } else {
            activeInvoice = null;
            setModalMode("add");
            invoiceButton.focus();
        }
    }

    invoiceButton.addEventListener("click", () => {
        invoiceForm.reset();
        invoiceForm.querySelectorAll(".file-field").forEach((field) => field.classList.remove("file-selected"));
        invoiceForm.querySelectorAll(".file-name").forEach((fileName) => fileName.remove());
        setModalOpen(true);
    });
    closeButton.addEventListener("click", () => setModalOpen(false));
    cancelButton.addEventListener("click", () => setModalOpen(false));
    modalBackdrop.addEventListener("click", () => setModalOpen(false));

    document.querySelectorAll(".table-action").forEach((viewButton) => {
        viewButton.addEventListener("click", () => {
            const invoice = invoices[Number(viewButton.dataset.invoiceIndex)];
            if (!invoice) {
                return;
            }

            activeInvoice = invoice;
            invoiceForm.elements["supplier-name"].value = invoice.supplierName;
            invoiceForm.elements.price.value = invoice.price ?? "";
            invoiceForm.elements["po-number"].value = invoice.poNumber;
            invoiceForm.elements["supplier-number"].value = invoice.supplierNumber ?? "";

            invoiceForm.querySelectorAll(".file-field").forEach((field) => {
                const fileInput = field.querySelector('input[type="file"]');
                const fileName = getFileNames(invoice)[fileInput.name] ?? "No file provided";
                field.classList.toggle("file-selected", fileName !== "No file provided");
                field.querySelector(".file-name")?.remove();
                const fileNameElement = document.createElement("span");
                fileNameElement.className = "file-name";
                fileNameElement.textContent = fileName;
                field.append(fileNameElement);
            });

            setModalOpen(true, invoice.status === "Declined" ? "declined" : "view");
        });
    });

    invoiceForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (activeInvoice && activeInvoice.status !== "Declined") {
            return;
        }
        if (!invoiceForm.reportValidity()) {
            return;
        }

        const formData = new FormData(invoiceForm);
        const fileFields = ["purchase-order", "good-receipt", "supplier-invoice", "travel-note", "notes"];
        const files = fileFields.map((fieldName) => formData.get(fieldName));
        const existingFiles = getFileNames(activeInvoice ?? {});
        const submittedFiles = Object.fromEntries(fileFields.map((fieldName, index) => [
            fieldName,
            files[index]?.name || existingFiles[fieldName] || "",
        ]));
        const filesToValidate = activeInvoice?.status === "Declined"
            ? [files[fileFields.indexOf("supplier-invoice")]]
            : files;
        const nonPdfFile = filesToValidate.find((file) => file && (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")));
        if (nonPdfFile) {
            window.alert("Please upload PDF files only.");
            return;
        }

        const fileNames = Object.values(submittedFiles)
            .join(", ");

        const submittedInvoice = activeInvoice
            ? {
                ...activeInvoice,
                status: "Pending",
                documentStatus: "Finished",
                files: submittedFiles,
                notes: `Price: ${activeInvoice.price} | Files: ${fileNames}`,
            }
            : {
                id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
                supplierName: formData.get("supplier-name"),
                poNumber: formData.get("po-number"),
                price: formData.get("price"),
                supplierNumber: formData.get("supplier-number"),
                documentStatus: "Finished",
                status: "Pending",
                notes: `Price: ${formData.get("price")} | Files: ${fileNames}`,
                files: submittedFiles,
            };
        const isResubmission = Boolean(activeInvoice);
        setModalOpen(false);
        onSubmit?.(submittedInvoice, isResubmission);
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

export function addInvoice(invoice) {
    invoices.push(invoice);
}

export function updateInvoice(invoice) {
    const invoiceIndex = invoices.findIndex((currentInvoice) => currentInvoice.id === invoice.id);
    if (invoiceIndex !== -1) {
        invoices[invoiceIndex] = invoice;
    }
}