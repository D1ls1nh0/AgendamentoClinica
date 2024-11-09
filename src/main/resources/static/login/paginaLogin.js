// Altera o formulario entre eles
function showForm(formId) {
    const forms = document.getElementsByClassName('form-container');
    for (const form of forms) {
        form.classList.add('hidden');
    }
    document.getElementById(formId).classList.remove('hidden');
}

// Mostra o formulário de login por padrão
document.addEventListener('DOMContentLoaded', function() {
    showForm('loginForm'); 
});
