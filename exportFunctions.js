function recreateStaticTable(tableId) {
    const table = document.getElementById(tableId);
    const staticTable = document.createElement('table');
    staticTable.innerHTML = table.querySelector('thead').outerHTML; // Copy the headers

    const tbody = document.createElement('tbody');
    table.querySelectorAll('tbody tr').forEach(row => {
        const staticRow = document.createElement('tr');
        row.querySelectorAll('td').forEach(cell => {
            const staticCell = document.createElement('td');
            const input = cell.querySelector('input, select');
            if (input) {
                staticCell.textContent = translateKey(input.value);
            } else {
                staticCell.textContent = cell.textContent	;
            }
            staticRow.appendChild(staticCell);
        });
        tbody.appendChild(staticRow);
    });
    staticTable.appendChild(tbody);
    return staticTable;
}



function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({orientation:'l',size:'a4'});
	//doc.setFontSize(10);
    doc.text("Walls Table", 10, 10);
    doc.autoTable({ html: recreateStaticTable('walls-table'), startY: 20 ,styles: {fontSize: 9  }}) // Set font size for the table conten});
    doc.text("Roofs Table", 10, doc.lastAutoTable.finalY + 10);
    doc.autoTable({ html: recreateStaticTable('roofs-table'), startY: doc.lastAutoTable.finalY + 20 });
    doc.save('tables.pdf');
}



function exportToCSV() {
	console.log("exporting csv");
     console.log("exporting csv");
    const rows = [['Wall Name', 'U Value']];

    function addRowsFromTable(tableId) {
        document.querySelectorAll(`#${tableId} tbody tr`).forEach(row => {
            const wallName = row.querySelector('td:first-child input').value;
            const uValue = row.querySelector('.u-value-output').value;
            rows.push([wallName, uValue]);
        });
    }

    ['walls-table', 'roofs-table', 'soils-table'].forEach(addRowsFromTable);

    let csvContent = "data:text/csv;charset=utf-8," 
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "walls.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function copyToClipboard() {
    const rows = [];

    function addRowsFromTable(tableId) {
        document.querySelectorAll(`#${tableId} tbody tr`).forEach(row => {
            const wallName = row.querySelector('td:first-child input').value;
            const uValue = row.querySelector('.u-value-output').value;
            rows.push([wallName, uValue]);
        });
    }

    // Process each table
    ['walls-table', 'roofs-table', 'soils-table'].forEach(addRowsFromTable);

    const clipboardText = rows.map(e => e.join("\t")).join("\n");
    navigator.clipboard.writeText(clipboardText).then(() => {
        alert('Copied to clipboard');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}


document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.export-csv').addEventListener('click', exportToCSV);
	document.querySelector('.copy-clipboard').addEventListener('click', copyToClipboard);
});
