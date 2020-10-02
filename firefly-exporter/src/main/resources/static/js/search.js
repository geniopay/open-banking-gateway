let abortController;
let lastValue;

function callSearch(bankNameInputId, bankListId, bankIdInput, apiUrl) {
    const bankName = document.getElementById(bankNameInputId);

    if (lastValue === bankName.value) {
        return;
    }

    if (abortController) {
        abortController.abort()
    }
    abortController = new AbortController();
    lastValue = bankName.value;

    fetch(`${apiUrl}/search?q=${bankName.value}`, {signal: abortController.signal})
        .then((response) => response.json())
        .then((response) => { updateBankList(bankNameInputId, bankListId, bankIdInput, response) })
        .catch((err) => {console.error(`Failed fetching: ${err}`)});
}

function updateBankList(bankNameInputId, bankListId, bankIdInput, response) {
    const bankList = document.getElementById(bankListId);
    bankList.innerHTML = '';

    response.bankDescriptor.forEach(descriptor => {
        const elem = document.createElement("li");
        elem.setAttribute('id', descriptor.bic);
        elem.setAttribute('class', "list-group-item");

        const bankName = document.createTextNode(descriptor.bankName);
        elem.appendChild(bankName);
        bankList.appendChild(elem);
        elem.addEventListener(
            "click",
                _ => {
                bankList.innerText = '';
                selectBank(descriptor.bankName, descriptor.uuid, bankNameInputId, bankIdInput);
            }
        );
    });
}

function selectBank(bankName, bankId, bankNameInputId, bankIdInput) {
    document.getElementById(bankIdInput).value = bankId;
    document.getElementById(bankNameInputId).value = bankName;
}
