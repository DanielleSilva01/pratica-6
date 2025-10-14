const API_BASE = 'https://proweb.leoproti.com.br/alunos';

async function carregar(){

    const resp = await fetch(API_BASE);
    const alunos = await resp.json();
    const tbody = document.querySelector('#alunos-table tbody'); 
    tbody.innerHTML = alunos.length ? alunos.map(p =>
        `
        <tr data-id="${p.id}">
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>${p.turma}</td>
            <td>${p.curso}</td>
            <td>${p.matricula}</td>
            <td>
                <a class="btn btn-sm btn-primary" href="form.html?id=${p.id}">Editar</a>
                <a class="btn btn-sm btn-danger btn-del" >Excluir</a>
            </td>
        </tr>
        `
    ).join('') : '<tr><td colspan="4" class="text-center">Nenhum aluno</td></tr>';
}

document.addEventListener('click', async (e) => {
    if(e.target.classList.contains('btn-del')){
      const tr = e.target.closest('tr');
      const id = tr.dataset.id;
      if(confirm('Confirmar exclusão?')){
        await fetch(API_BASE + '/' + id, { method: 'DELETE' });
        carregar();
      }
    }
  });
  
  document.addEventListener('DOMContentLoaded', carregar);