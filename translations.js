function getLanguage(){
		const language = document.getElementById('language-switcher').value;
		return language
}

function translateKey(key){
		const language = getLanguage()

		if (translations[key] && translations[key][language]) {
			return translations[key][language]
		} else {
			console.error(`Translation key "${key}" not found for language "${language}"`);
			return key
			// Optionally, you can set a default value or leave the existing text
			// element.textContent = `[${key}]`;
		}

}

function translateLabels(){
	// for the mobile display of tables, the headers are replaced by data-labels using CSS. They must be translated apart
	
	const allRows = document.querySelectorAll('#roofs-table tbody tr, #walls-table tbody tr');
	
	allRows.forEach(row =>{
		const cells = row.querySelectorAll('td');
			cells.forEach((cell, index) => {
				var key = cell.getAttribute('data-label-key');
				cell.setAttribute('data-label-value', translateKey(key));
			});

		});
}
	


function translatePage() {
	
		document.querySelectorAll('.translate').forEach(element => {
        const key = element.getAttribute('data-translate-key');
		element.textContent = translateKey(key);

		});
		translateLabels()
}

