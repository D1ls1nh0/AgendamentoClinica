function updateAvailableTimes() {
    const area = document.getElementById('selectMenu').value;
    const horariosDiv = document.getElementById('horarios');
    const horariosDisponiveisDiv = document.getElementById('horarios-disponiveis');
    
    // Aqui você pode usar uma API para pegar os horários disponíveis de acordo com a área escolhida
    let horarios = [];
    
    if (area === 'Médica') {
        horarios = ['07:00-08:00', '08:00-09:00', '10:00-11:00']; // Exemplo de horários para Medicina
    } else if (area === 'Odontológica') {
        horarios = ['09:00-10:00', '14:00-15:00', '15:00-16:00']; // Exemplo de horários para Odontologia
    } else if (area === 'Psicológica') {
        horarios = ['08:00-09:00', '11:00-12:00', '16:00-17:00']; // Exemplo de horários para Psicologia
    }

    // Limpa os horários anteriores
    horariosDiv.innerHTML = '';
    
    // Adiciona os novos horários
    horarios.forEach(horario => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = horario;
        button.classList.add('horario-button');
        button.onclick = function() {
            document.querySelectorAll('.horario-button').forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        };
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

const agendamento = {
data,
horario: horarioSelecionado.textContent,
especialidade: area
};

console.log('Dados do agendamento:', agendamento); // Log para verificar os dados

try {
const response = await fetch('/api/agendamentos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(agendamento),
});

if (response.ok) {
    const result = await response.json();
    alert('Agendamento salvo com sucesso!');
    console.log(result);
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
