document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const criteria = document.getElementById('searchCriteria').value;
    const input = document.getElementById('searchInput').value;
    
    if (!input) {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }
    
    console.log(`Criterio de búsqueda: ${criteria}, Término de búsqueda: ${input}`);
    // Aquí puedes agregar la lógica para realizar la búsqueda

    // Datos de ejemplo
    const exampleData = [
        { id: 1, name: "Juan Perez", sex: "Masculino", status: "Alta", bed: 101 },
        { id: 2, name: "Ana Gomez", sex: "Femenino", status: "Baja", bed: 102 },
        { id: 3, name: "Luis Martinez", sex: "Masculino", status: "Alta", bed: 103 },
        { id: 4, name: "Marta Sanchez", sex: "Femenino", status: "Baja", bed: 104 },
        { id: 5, name: "Pedro Lopez", sex: "Masculino", status: "Alta", bed: 105 },
        // Añade más datos de ejemplo según sea necesario
    ];

    displayResults(exampleData);
});

const resultsPerPage = 2;
let currentPage = 1;
let totalPages = 1;
let currentResults = [];

function displayResults(data) {
    currentResults = data;
    totalPages = Math.ceil(data.length / resultsPerPage);
    currentPage = 1;
    updateTable();
}

function updateTable() {
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const pageResults = currentResults.slice(start, end);

    pageResults.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${result.id}</td>
            <td>${result.name}</td>
            <td>${result.sex}</td>
            <td>${result.status}</td>
            <td>${result.bed}</td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('pageInfo').textContent = `Página ${currentPage} de ${totalPages}`;
}

document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    if (currentPage < totalPages) {
        currentPage++;
        updateTable();
    }
});
