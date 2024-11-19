const horariosReservados = {}; // Armazena os horários já agendados por data e especialidade

// Função para buscar horários ocupados do backend e atualizar horariosReservados
async function fetchHorariosOcupados(data, area) {
    try {
        const response = await fetch(`/api/agendamentos/ocupados?data=${data}&especialidade=${area}`);
        if (response.ok) {
            const ocupados = await response.json();
            horariosReservados[data] = horariosReservados[data] || {};
            horariosReservados[data][area] = new Set(ocupados);
            updateAvailableTimes(data, area); // Atualiza os horários após buscar os ocupados
        } else {
            console.error('Erro ao buscar horários ocupados:', await response.text());
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

function updateAvailableTimes(data, area) {
    const horariosDiv = document.getElementById('horarios');
    const horariosDisponiveisDiv = document.getElementById('horarios-disponiveis');

    // Novos horários disponíveis
    let horarios = [
        '07:00-08:00', '08:00-09:00', '09:00-10:00',
        '10:00-11:00', '11:00-12:00', '13:00-14:00',
        '14:00-15:00', '15:00-16:00', '16:00-17:00',
        '17:00-18:00', '18:00-19:00', '19:00-20:00'
    ];

    // Limpa os horários anteriores
    horariosDiv.innerHTML = '';

    // Adiciona os horários atualizados, excluindo os reservados
    horarios.forEach(horario => {
        if (!(horariosReservados[data] && horariosReservados[data][area] && horariosReservados[data][area].has(horario))) {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = horario;
            button.classList.add('horario-button');

            button.onclick = function () {
                document.querySelectorAll('.horario-button').forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
            };

            horariosDiv.appendChild(button);
        }
    });

    // Exibe a div de horários disponíveis
    horariosDisponiveisDiv.style.display = 'block';
}

document.getElementById('agendamentoForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const data = document.getElementById('data').value;
    const area = document.getElementById('selectMenu').value;
    const horarioSelecionado = document.querySelector('.horario-button.selected');

    if (!data || !area || !horarioSelecionado) {
        alert('Por favor, preencha todos os campos e selecione um horário!');
        return;
    }

    const horario = horarioSelecionado.textContent;

    // Verifica se o horário já está reservado no cliente
    if (horariosReservados[data] && horariosReservados[data][area] && horariosReservados[data][area].has(horario)) {
        alert('Esse horário já foi reservado. Escolha outro horário.');
        return;
    }

    const agendamento = {
        data,
        horario,
        especialidade: area
    };

    console.log('Tentando agendar:', agendamento);

    try {
        const response = await fetch('/api/agendamentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(agendamento),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Agendamento salvo com sucesso!');
            console.log('Resposta do servidor:', result);

            // Marca o horário como reservado
            if (!horariosReservados[data]) {
                horariosReservados[data] = {};
            }
            if (!horariosReservados[data][area]) {
                horariosReservados[data][area] = new Set();
            }
            horariosReservados[data][area].add(horario);

            // Reseta o formulário
            document.getElementById('agendamentoForm').reset();
            fetchHorariosOcupados(data, area); // Atualiza os horários ocupados
        } else {
            const errorText = await response.text();
            console.error('Erro ao salvar agendamento:', errorText);
            alert('Erro ao salvar o agendamento. Verifique os logs.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro na conexão com o servidor.');
    }
});

// Adiciona eventos aos inputs de data e área para buscar horários ocupados
document.getElementById('selectMenu').addEventListener('change', function() {
    const data = document.getElementById('data').value;
    const area = this.value;

    if (data && area) {
        fetchHorariosOcupados(data, area);
    }
});

document.getElementById('data').addEventListener('change', function() {
    const data = this.value;
    const area = document.getElementById('selectMenu').value;

    if (data && area) {
        fetchHorariosOcupados(data, area);
    }
});
