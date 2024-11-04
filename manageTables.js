
function getLambdaType() {
    return document.getElementById('lambda-type-dropdown').value;

}

function setLambdaListeners() {
    document.getElementById('lambda-type-dropdown').addEventListener('change', (e) => {

        document.querySelectorAll('#walls-table tbody tr').forEach(row => {
            handleInsulationTypeChange(row);
            updateWallUValue(row);
        });
        document.querySelectorAll('#roofs-table tbody tr').forEach(row => {
            handleInsulationTypeChange(row);
            updateRoofUValue(row);
        });
		document.querySelectorAll('#soils-table tbody tr').forEach(row => {
            handleInsulationTypeChange(row);
            updateSoilUValue(row);
        });
		
    });

}

function handleInsulationChange(row) {
    // Change insulated or not
    const isolationDropdown = row.querySelector('.isolation-dropdown');
    const isInsulated = isolationDropdown.value === 'yes';

    const isolationTypeDropdown = row.querySelector('.isolation-type-dropdown');
    const userLambdaInput = row.querySelector('.user-lambda-input');
    const defaultLambdaSpan = row.querySelector('.default-lambda-input');
    const thicknessInput = row.querySelector('.thickness-input');
    const structureDropdown = row.querySelector('.structure-dropdown'); // This may not exist

    if (isInsulated) {
        isolationTypeDropdown.hidden = false;
        userLambdaInput.hidden = false;
        defaultLambdaSpan.hidden = false;
        thicknessInput.hidden = false;
        if (structureDropdown) { // Check if structureDropdown exists
            structureDropdown.hidden = false;
            structureDropdown.disabled = false;
        }

        isolationTypeDropdown.disabled = false;
        userLambdaInput.disabled = false;
        thicknessInput.disabled = false;
    } else {
        isolationTypeDropdown.hidden = true;
        userLambdaInput.hidden = true;
        defaultLambdaSpan.hidden = true;
        thicknessInput.hidden = true;
        if (structureDropdown) { // Check if structureDropdown exists
            structureDropdown.hidden = true;
            structureDropdown.disabled = true;
        }

        isolationTypeDropdown.disabled = true;
        userLambdaInput.disabled = true;
        thicknessInput.disabled = true;
    }
}

function handleInsulationTypeChange(row) {
    // change insulation material

    const insulationType = getAssociatedValue('isolationTypes', row.querySelector('.isolation-type-dropdown').value);
    const defaultLambdaInput = row.querySelector('.default-lambda-input');

    // Update the default lambda value based on the selected lambda type
    if (getLambdaType() === 'lambda_new_insulation') {
        defaultLambdaInput.value = insulationType.lambda_EPBD || '';
    } else {
        defaultLambdaInput.value = insulationType.lambda_TRD || '';
    }

    handleUserLambdaChange(row);
}

function handleUserLambdaChange(row) {
    //grey out default lambda if user defines his own lambda

    const userLambdaInput = row.querySelector('.user-lambda-input');
    const defaultLambdaInput = row.querySelector('.default-lambda-input');

    if (userLambdaInput.value) {
        defaultLambdaInput.style.color = 'lightgrey';
    } else {
        defaultLambdaInput.style.color = '';
    }
}

function createWallTableHeader() {
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th scope="row" class="translate" data-translate-key="name">Naam</th>
            <th scope="col1" class="translate" data-translate-key="type">Type</th>
            <th scope="col1" class="translate" data-translate-key="constructElement">Constructief element</th>
            <th scope="col1" class="translate" data-translate-key="insulation">Isolatie</th>
            <th scope="col1" class="translate" data-translate-key="insulationType">Type</th>
            <th scope="col1" class="translate" data-translate-key="defaultLambda">Default λ waarde</th>
            <th scope="col1" class="translate" data-translate-key="userLambda">Gebruiker λ</th>
            <th scope="col1" class="translate" data-translate-key="thickness">Dikte [cm]</th>
            <th scope="col1" class="translate" data-translate-key="structure">Isolatie in hout of metaal structuur</th>
            <th scope="col1" class="translate" data-translate-key="finishing">Buitenafwerking</th>
            <th scope="col1" class="translate" data-translate-key="uValue">U waarde [W/m²K]</th>
            <th></th>
        </tr>`;
    return thead;
}

function createRoofTableHeader() {
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th class="translate" data-translate-key="name">Naam</th>
            <th class="translate" data-translate-key="type">Type</th>
            <th class="translate" data-translate-key="insulation">Isolatie</th>
            <th class="translate" data-translate-key="insulationType">Type</th>
            <th class="translate" data-translate-key="defaultLambda">Default λ waarde</th>
            <th class="translate" data-translate-key="userLambda">Gebruiker λ</th>
            <th class="translate" data-translate-key="thickness">Dikte [cm]</th>
            <th class="translate" data-translate-key="structure">Isolatie in hout of metaal structuur</th>
            <th class="translate" data-translate-key="uValue">U waarde [W/m²K]</th>
            <th></th>
        </tr>`;
    return thead;
}

function createSoilTableHeader() {
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th class="translate" data-translate-key="name">Naam</th>
            <th class="translate" data-translate-key="type">Type</th>
            <th class="translate" data-translate-key="insulation">Isolatie</th>
            <th class="translate" data-translate-key="insulationType">Type</th>
            <th class="translate" data-translate-key="defaultLambda">Default λ waarde</th>
            <th class="translate" data-translate-key="userLambda">Gebruiker λ</th>
            <th class="translate" data-translate-key="thickness">Dikte [cm]</th>
            <th class="translate" data-translate-key="uValue">U waarde [W/m²K]</th>
            <th></th>
        </tr>`;
    return thead;
}


function updateSoilUValue(row) {

    const insulationDropdown = row.querySelector('.isolation-dropdown');

    if (insulationDropdown.value === 'no') {
        calculatedThickness = 0;
    } else {
        calculatedThickness = parseFloat(row.querySelector('.thickness-input').value) || 0
    }

    const soil = {
        type: getAssociatedValue('soilTypes', row.querySelector('.soil-type-dropdown').value),
        isolation: getAssociatedValue('isolation', row.querySelector('.isolation-dropdown').value),
        isolationType: getAssociatedValue('isolationTypes', row.querySelector('.isolation-type-dropdown').value),
        userLambda: parseFloat(row.querySelector('.user-lambda-input').value) || null,
        thickness: calculatedThickness,
    };

    const uValue = computeSoilUValue(soil, getLambdaType()); 
    row.querySelector('.u-value-output').value = uValue.toFixed(3);

}

function updateRoofUValue(row) {

    const insulationDropdown = row.querySelector('.isolation-dropdown');

    if (insulationDropdown.value === 'no') {
        calculatedThickness = 0;
    } else {
        calculatedThickness = parseFloat(row.querySelector('.thickness-input').value) || 0
    }

    const roof = {
        type: getAssociatedValue('roofTypes', row.querySelector('.roof-type-dropdown').value),
        isolation: getAssociatedValue('isolation', row.querySelector('.isolation-dropdown').value),
        isolationType: getAssociatedValue('isolationTypes', row.querySelector('.isolation-type-dropdown').value),
        userLambda: parseFloat(row.querySelector('.user-lambda-input').value) || null,
        thickness: calculatedThickness,
        structure: getAssociatedValue('roofStructure', row.querySelector('.structure-dropdown').value),
    };

    const uValue = computeRoofUValue(roof, getLambdaType()); // Assuming computeUValue can be used or adapted for roofs
    row.querySelector('.u-value-output').value = uValue.toFixed(3);

}

function updateWallUValue(row) {

    const insulationDropdown = row.querySelector('.isolation-dropdown');
    if (insulationDropdown.value === 'no') {
        calculatedThickness = 0;
    } else {
        calculatedThickness = parseFloat(row.querySelector('.thickness-input').value) || 0
    }

    const wall = {
        type: getAssociatedValue('wallTypes', row.querySelector('.wall-type-dropdown').value),
        constructElement: getAssociatedValue('constructElements', row.querySelector('.element-dropdown').value),
        isolation: getAssociatedValue('isolation', row.querySelector('.isolation-dropdown').value),
        isolationType: getAssociatedValue('isolationTypes', row.querySelector('.isolation-type-dropdown').value),
        userLambda: parseFloat(row.querySelector('.user-lambda-input').value) || null,
        thickness: calculatedThickness,
        structure: getAssociatedValue('wallStructure', row.querySelector('.structure-dropdown').value),
        finishing: getAssociatedValue('finishing', row.querySelector('.finishing-dropdown').value)
    };

    const uValue = computeWallUValue(wall, getLambdaType());
    row.querySelector('.u-value-output').value = uValue.toFixed(3);
}

function getAssociatedValue(category, key) {
    const item = dropdownKeys[category].find(element => element.key === key);
    return item || {};
}

function createInsulationChangeListeners() {

    document.addEventListener('change', function (e) {

        const row = e.target.closest('tr');
        if (e.target.classList.contains('isolation-dropdown')) {
            handleInsulationChange(row);
        } else if (e.target.classList.contains('user-lambda-input')) {
            handleUserLambdaChange(row);
        } else if (e.target.classList.contains('isolation-type-dropdown')) {
            handleInsulationTypeChange(row);
        }

        if (e.target.closest('#walls-table')) {
            updateWallUValue(row);
        } else if (e.target.closest('#roofs-table')) {
            updateRoofUValue(row);
        } else if (e.target.closest('#soils-table')) {
            updateSoilUValue(row);
        }

    });

}

function getCurrentWallCount() {
    const wallRows = document.querySelectorAll('#walls-table tbody tr');
    return wallRows.length;
}
function getCurrentRoofCount() {
    const roofRows = document.querySelectorAll('#roofs-table tbody tr');
    return roofRows.length;
}
function getCurrentSoilCount() {
    const roofRows = document.querySelectorAll('#roofs-table tbody tr');
    return roofRows.length;
}

document.getElementById('add-row').addEventListener('click', createWallRow);

document.getElementById('add-row-roof').addEventListener('click', createRoofRow);
document.getElementById('add-row-soil').addEventListener('click', createSoilRow);

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('delete-row')) {
        const row = e.target.closest('tr');
        row.parentNode.removeChild(row);
    }
});

function addDataLabelsToRow(row) {
    const headers = document.querySelectorAll('#walls-table thead th'); // Retrieve headers
    const cells = row.querySelectorAll('td');
    cells.forEach((cell, index) => {
        var key = headers[index].getAttribute('data-translate-key');
        console.log("key", key);
        cell.setAttribute('data-label-key', key);
        cell.setAttribute('data-label-value', translateKey(key));
    });
}

function createWallRow() {
    const table = document.getElementById('walls-table');
    const tbody = table.querySelector('tbody');

    if (tbody.children.length === 0) {
        table.appendChild(createWallTableHeader());
        translatePage()
    }

    const newRow = document.createElement('tr');

    // Generate cells for the new row
    newRow.appendChild(createInputCell('text', 'wallName', false, null, null, null, 'Wall ' + (getCurrentWallCount() + 1)));
    newRow.appendChild(createDropdownCell('wall-type-dropdown', dropdownKeys.wallTypes));
    newRow.appendChild(createDropdownCell('element-dropdown', dropdownKeys.constructElements));
    newRow.appendChild(createDropdownCell('isolation-dropdown', dropdownKeys.isolation));
    newRow.appendChild(createDropdownCell('isolation-type-dropdown', dropdownKeys.isolationTypes, true));
    newRow.appendChild(createInputCell('text', 'default-lambda-input', true));
    newRow.appendChild(createInputCell('number', 'user-lambda-input', true, 0.2, 0.01, 0.001));
    newRow.appendChild(createInputCell('number', 'thickness-input', true, 30, 1, 1));
    newRow.appendChild(createDropdownCell('structure-dropdown', dropdownKeys.wallStructure, true));
    newRow.appendChild(createDropdownCell('finishing-dropdown', dropdownKeys.finishing));
    newRow.appendChild(createInputCell('text', 'u-value-output', true));
    newRow.appendChild(createButtonCell('translate', 'deleteRow', function () {
            tbody.removeChild(newRow);
            if (tbody.children.length === 0) {
                table.removeChild(table.querySelector('thead'));
            }
        }));

    // Append the new row to the table body
    tbody.appendChild(newRow);
    handleInsulationChange(newRow);
    handleInsulationTypeChange(newRow);
    updateWallUValue(newRow);

    // Adding labels to rows for responsive view
    addDataLabelsToRow(newRow);
}

// Function to create a new roof row
function createRoofRow() {
    const table = document.getElementById('roofs-table');
    const tbody = table.querySelector('tbody');

    if (tbody.children.length === 0) {
        table.appendChild(createRoofTableHeader());
        translatePage()
    }

    const newRow = document.createElement('tr');

    // Generate cells for the new row
    newRow.appendChild(createInputCell('text', 'roofName', false, null, null, null, 'Roof ' + (getCurrentRoofCount() + 1)));
    newRow.appendChild(createDropdownCell('roof-type-dropdown', dropdownKeys.roofTypes));
    newRow.appendChild(createDropdownCell('isolation-dropdown', dropdownKeys.isolation));
    newRow.appendChild(createDropdownCell('isolation-type-dropdown', dropdownKeys.isolationTypes, true));
    newRow.appendChild(createInputCell('text', 'default-lambda-input', true));
    newRow.appendChild(createInputCell('number', 'user-lambda-input', true, 0.2, 0.01, 0.001));

    newRow.appendChild(createInputCell('number', 'thickness-input', true, 30, 1, 1));
    newRow.appendChild(createDropdownCell('structure-dropdown', dropdownKeys.roofStructure, true));
    newRow.appendChild(createInputCell('text', 'u-value-output', true));
    newRow.appendChild(createButtonCell('translate', 'deleteRow', function () {
            tbody.removeChild(newRow);
            if (tbody.children.length === 0) {
                table.removeChild(table.querySelector('thead'));
            }
        }));

    // Append the new row to the table body
    tbody.appendChild(newRow);
    handleInsulationChange(newRow);
    handleInsulationTypeChange(newRow);
    updateRoofUValue(newRow);

    // Adding labels to rows
    addDataLabelsToRow(newRow);
}

// Function to create a new roof row
function createSoilRow() {
    const table = document.getElementById('soils-table');
    const tbody = table.querySelector('tbody');

    if (tbody.children.length === 0) {
        table.appendChild(createSoilTableHeader());
        translatePage()
    }

    const newRow = document.createElement('tr');

    // Generate cells for the new row
    newRow.appendChild(createInputCell('text', 'soilName', false, null, null, null, 'soil ' + (getCurrentSoilCount() + 1)));
	console.log(dropdownKeys.soilTypes)
    newRow.appendChild(createDropdownCell('soil-type-dropdown', dropdownKeys.soilTypes));
    newRow.appendChild(createDropdownCell('isolation-dropdown', dropdownKeys.isolation));
    newRow.appendChild(createDropdownCell('isolation-type-dropdown', dropdownKeys.isolationTypes, true));
    newRow.appendChild(createInputCell('text', 'default-lambda-input', true));
    newRow.appendChild(createInputCell('number', 'user-lambda-input', true, 0.2, 0.01, 0.001));

    newRow.appendChild(createInputCell('number', 'thickness-input', true, 30, 1, 1));
    newRow.appendChild(createInputCell('text', 'u-value-output', true));
    newRow.appendChild(createButtonCell('translate', 'deleteRow', function () {
            tbody.removeChild(newRow);
            if (tbody.children.length === 0) {
                table.removeChild(table.querySelector('thead'));
            }
        }));

    // Append the new row to the table body
    tbody.appendChild(newRow);
    handleInsulationChange(newRow);
    handleInsulationTypeChange(newRow);
    updateSoilUValue(newRow);

    // Adding labels to rows
    addDataLabelsToRow(newRow);
}



// Helper function to create input cells
function createInputCell(type, className, disabled = false, max = null, min = null, step = null, text = null) {
    console.log('texte', text)
    const cell = document.createElement('td');
    const input = document.createElement('input');
    input.type = type;
    if (className)
        input.classList.add(className);
    if (disabled)
        input.disabled = true;
    if (max !== null)
        input.max = max;
    if (min !== null)
        input.min = min;
    if (step !== null)
        input.step = step;
    if (text !== null)
        input.value = text;
    cell.appendChild(input);
    return cell;
}

// Helper function to create dropdown cells
function createDropdownCell(className, keys, disabled = false) {
    const cell = document.createElement('td');
    const dropdown = document.createElement('select');
    dropdown.classList.add('dropdown', className);
    if (disabled)
        dropdown.disabled = true;
    populateDropdown(dropdown, keys);
    cell.appendChild(dropdown);
    return cell;
}

// Helper function to create button cells
function createButtonCell(className, key, onClickHandler) {
    const cell = document.createElement('td');
    const button = document.createElement('button');
    //button.classList.add('btn', className);
    //button.classList.add('translate')
    //button.setAttribute('data-translate-key', key);
    button.innerHTML = '<i class="material-icons">delete</i>'
        button.addEventListener('click', onClickHandler);
    cell.appendChild(button);
    return cell;
}

function populateDropdown(dropdown, keys) {
    const language = getLanguage()

        dropdown.innerHTML = '';
    keys.forEach(({
            key
        }) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = translations[key][language];
        option.setAttribute('data-translate-key', key);
        option.classList.add("translate");
        dropdown.appendChild(option);
    });
}

setLambdaListeners()
createInsulationChangeListeners()
