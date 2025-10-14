const API = 'https://proweb.leoproti.com.br/alunos';

document.addEventListener('DOMContentLoaded', async() => {
    const id = new URLSearchParams(location.search).get('id');
    const nome = document.querySelector('#nome');
    const turma = document.querySelector('#turma');
    const curso = document.querySelector('#curso');
    const matricula = document.querySelector('#matricula');
    const form = document.querySelector('#aluno-form');

  if(id){
      const r = await fetch(API + '/' + id);
      const p = await r.json();

      nome.value = p.nome;
      turma.value = p.turma;
      curso.value = p.curso;
      matricula.value = p.matricula;
    
      document.getElementById('form-title').textContent = 'Editar Produto'; 
  }

  form.addEventListener('submit', async (ev) => {
      ev.preventDefault(); 
      const body = JSON.stringify({nome: nome.value.trim(), turma: turma.value.trim(), curso: curso.value.trim(), matricula: matricula.value.trim()});
      if(id){
          await fetch(API + '/' + id, {method: 'PUT', headers: {'Content-Type':'application/json'}, body});
      } else {
        await fetch(API, { method: 'POST', headers: {'Content-Type':'application/json'}, body });
      }
      location.href = 'index.html';
  });
})