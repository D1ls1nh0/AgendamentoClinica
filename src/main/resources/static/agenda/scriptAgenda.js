document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/agendamentos')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('agendamentos-tbody');
            data.forEach(agendamento => {
                const dataFormatada = formatarData(agendamento.data);
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${dataFormatada}</td>
                    <td>${agendamento.horario}</td>
                    <td>${agendamento.especialidade}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao buscar agendamentos:', error));
});

function formatarData(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}