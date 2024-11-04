
function createNoteSection(parentSelector) {
    const parentElement = document.querySelector(parentSelector);
    if (!parentElement) {
        console.error(`Parent element not found for selector: ${parentSelector}`);
        return;
    }	
    const noteSection = document.createElement('div');
    noteSection.className = 'note';

    const noteHeading = document.createElement('h2');
    noteHeading.className = 'translate';
    noteHeading.setAttribute('data-translate-key', 'note1');
    noteSection.appendChild(noteHeading);

    const noteContent = document.createElement('p');
    noteContent.className = 'translate';
    noteContent.setAttribute('data-translate-key', 'note2');
    noteContent.textContent = "λ-waarden kunnen rechtstreeks door de gebruiker worden ingevoerd ('Gebruikerslambda-waarde') of standaard worden geselecteerd. De waarde van de gebruiker wordt altijd gebruikt als deze is ingevoerd.";
    noteSection.appendChild(noteContent);

	

    const noteTypeLabel = document.createElement('strong');
    noteTypeLabel.className = 'translate';
    noteTypeLabel.setAttribute('data-translate-key', 'note3');
    noteTypeLabel.textContent = "Type default λ-waarden";
	noteTypeLabel.style.marginRight = '10px'	
    noteSection.appendChild(noteTypeLabel);

    const noteSelect = document.createElement('select');
    noteSelect.id = 'lambda-type-dropdown';
    noteSelect.className = 'dropdown';

    const option1 = document.createElement('option');
    option1.value = 'lambda_new_insulation';
    option1.className = 'translate';
    option1.setAttribute('data-translate-key', 'lambda_new_insulation');
    option1.textContent = 'Nieuwe isolatie (nieuwbouw of renovatie, representatief voor nieuwe isolatiematerialen)';
    noteSelect.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = 'lambda_old_insulation';
    option2.className = 'translate';
    option2.setAttribute('data-translate-key', 'lambda_old_insulation');
    option2.textContent = 'Bestaande isolatie (renovatie, representatief voor oudere isolatiematerialen)';
    noteSelect.appendChild(option2);

    noteSection.appendChild(noteSelect);

    parentElement.appendChild(noteSection);
}


function createWallsSection(parentSelector) {
    const parentElement = document.querySelector(parentSelector);
    if (!parentElement) {
        console.error(`Parent element not found for selector: ${parentSelector}`);
        return;
    }	

	
    const wallsHeading = document.createElement('h2');
    wallsHeading.className = 'translate';
    wallsHeading.setAttribute('data-translate-key', 'walls');
    wallsHeading.textContent = 'Walls';
    
    const wallsTable = document.createElement('table');
    wallsTable.className = 'table';
    wallsTable.id = 'walls-table';

    const tbody = document.createElement('tbody');
    wallsTable.appendChild(tbody);

    const addButton = document.createElement('button');
    addButton.className = 'btn add-row translate';
    addButton.setAttribute('data-translate-key', 'addRow');
    addButton.id = 'add-row';
    addButton.textContent = 'Add Row';

    
    parentElement.appendChild(wallsHeading);
    parentElement.appendChild(wallsTable);
    parentElement.appendChild(addButton);
}

function createRoofsSection(parentSelector) {
	const parentElement = document.querySelector(parentSelector);
    if (!parentElement) {
        console.error(`Parent element not found for selector: ${parentSelector}`);
        return;
    }	
    const roofsHeading = document.createElement('h2');
    roofsHeading.className = 'translate';
    roofsHeading.setAttribute('data-translate-key', 'roofs');
    roofsHeading.textContent = 'Roofs';

    const roofsTable = document.createElement('table');
    roofsTable.id = 'roofs-table';

    const tbody = document.createElement('tbody');
    roofsTable.appendChild(tbody);

    const addButton = document.createElement('button');
    addButton.className = 'btn add-row translate';
    addButton.setAttribute('data-translate-key', 'addRow');
    addButton.id = 'add-row-roof';
    addButton.textContent = 'Add Row';

	parentElement.appendChild(roofsHeading);
    parentElement.appendChild(roofsTable);
    parentElement.appendChild(addButton);
}

function createSoilsSection(parentSelector) {
	const parentElement = document.querySelector(parentSelector);
    if (!parentElement) {
        console.error(`Parent element not found for selector: ${parentSelector}`);
        return;
    }	
    const soilsHeading = document.createElement('h2');
    soilsHeading.className = 'translate';
    soilsHeading.setAttribute('data-translate-key', 'soils');
    soilsHeading.textContent = 'Soils';

	const soilsComment = document.createElement('p');
	soilsComment.className = 'translate';
	soilsComment.setAttribute('data-translate-key','soilscomment');

    const soilsTable = document.createElement('table');
    soilsTable.id = 'soils-table';

    const tbody = document.createElement('tbody');
    soilsTable.appendChild(tbody);

    const addButton = document.createElement('button');
    addButton.className = 'btn add-row translate';
    addButton.setAttribute('data-translate-key', 'addRow');
    addButton.id = 'add-row-soil';
    addButton.textContent = 'Add Row';

	parentElement.appendChild(soilsHeading);
	parentElement.appendChild(soilsComment);
    parentElement.appendChild(soilsTable);
    parentElement.appendChild(addButton);
}

function createLanguageSwitcher(parentSelector, languages){
	const parentElement = document.querySelector(parentSelector);
    if (!parentElement) {
        console.error(`Parent element not found for selector: ${parentSelector}`);
        return;
    }	
    
    const languageSelect = document.createElement('select');
    languageSelect.id = 'language-switcher';
    languageSelect.className = 'language-switcher';
    
    // Loop through the provided languages array to create option elements
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = lang;
        languageSelect.appendChild(option);
    });
    
    // Append the select element to the provided parent element
    parentElement.appendChild(languageSelect);
}

