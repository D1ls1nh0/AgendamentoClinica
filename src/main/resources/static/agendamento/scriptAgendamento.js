const horariosReservados = new Set(); // Armazena os horários já agendados

function updateAvailableTimes() {
    const area = document.getElementById('selectMenu').value;
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

    // Adiciona os horários atualizados
    horarios.forEach(horario => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = horario;
        button.classList.add('horario-button');

        if (horariosReservados.has(horario)) {
            button.classList.add('disabled');
            button.disabled = true;
        } else {
            button.onclick = function () {
                document.querySelectorAll('.horario-button').forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
            };
        }

        horariosDiv.appendChild(button);
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
    if (horariosReservados.has(horario)) {
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
            horariosReservados.add(horario);
            horarioSelecionado.classList.add('disabled');
            horarioSelecionado.disabled = true;

            // Reseta o formulário
            document.getElementById('agendamentoForm').reset();
            updateAvailableTimes(); // Atualiza os horários
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
