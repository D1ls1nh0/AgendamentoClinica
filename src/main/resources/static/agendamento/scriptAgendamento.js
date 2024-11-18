document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#tabela1, #tabela2, #tabela3').forEach(function(tabela) {
        tabela.style.display = 'none';
    });
});

document.getElementById('selectMenu').addEventListener('change', function() {
    document.querySelectorAll('#tabela1, #tabela2, #tabela3').forEach(function(tabela) {
        tabela.style.display = 'none';
    });

    var selectedValue = this.value;
    
    if (selectedValue != '0') {
        document.getElementById('tabela' + selectedValue).style.display = 'table';
    }
});
