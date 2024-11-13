document.getElementById('selectMenu').addEventListener('change', function() {
    
    document.getElementById('tabela1').style.display = 'none';
    document.getElementById('tabela2').style.display = 'none';
    document.getElementById('tabela3').style.display = 'none';

    var selectedValue = this.value;
    
    if (selectedValue != '0') {
      document.getElementById('tabela' + selectedValue).style.display = 'flex';
    }
  });