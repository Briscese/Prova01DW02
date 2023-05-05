const prompt = require("prompt-sync")()
const {
  selecionarMatricula,
  selecionarAluno,
  selecionarCurso,
  selecionarDisciplina,
  inserirAluno,
  inserirCurso,
  inserirDisciplina,
  updateAluno,
  updateCurso,
  updateDisciplina,
  deletarAluno,
  deletarCurso,
  deletarDisciplina,
  inicioDB,
  inserirMatricula,
} = require("./db/conn")



async function main() {
  const iniciarTabelas = await inicioDB()
  const iniciarTabelas2 = await inicioDB()
  let execucao = true
  console.log("Bem vindo a P01 do Claudio")

  while (execucao) {
    console.log(`Opções:`)
    console.log(`1 - Visualizar as Matricrulas`)
    console.log(`2 - Visualizar os Alunos`)
    console.log(`3 - Visualizar os Cursos`)
    console.log(`4 - Visualizar as Disciplinas`)
    console.log('14 - Inserir Matricula')
    console.log("5 - Inserir um novo Aluno")
    console.log("6 - Inserir um novo Curso")
    console.log("7 - Inserir um nova Disciplina")
    console.log("8 - Alterar Aluno")
    console.log("9 - Alterar Curso")
    console.log("10 - Alterar Disciplina")
    console.log("11 - Deletar Aluno")
    console.log("12 - Deletar Curso")
    console.log("13 - Deletar Disciplina")
    console.log("0 - Sair")
    let opcao = parseInt(prompt("Escolha uma das opções:"))

    switch (opcao) {
      case 1:
        let matriculaID = parseInt(prompt('Entre com o ID de matricula que voce quer visualizar: '))

        const matricula = await selecionarMatricula(matriculaID)
        console.log(matricula)
        break
      case 2:
        const aluno = await selecionarAluno()
        console.log(aluno)
        break
      case 3:
        const curso = await selecionarCurso()
        console.log(curso)
        break
      case 4:
        const disciplina = await selecionarDisciplina()
        console.log(disciplina)
        break
      case 5:
        let alunoNome = prompt(
          "Entre como nome do Aluno que voce quer incluir: "
        )
        const result = await inserirAluno({ nome: alunoNome })
        console.log(result)
        const alunos = await selecionarAluno()
        console.log(alunos)
        break
      case 6:
        let cursoNome = prompt("Entre como nome do Curso que voce quer criar: ")
        const resultcurso = await inserirCurso({ curso: cursoNome })
        console.log(resultcurso)
        const cursos = await selecionarCurso()
        console.log(cursos)
        break
      case 7:
        let disciplinaNome = prompt(
          "Entre como nome da Disciplina que voce quer criar: "
        )
        const resultdisciplina = await inserirDisciplina({
          disciplina: disciplinaNome,
        })
        console.log(resultdisciplina)
        const disciplinas = await selecionarDisciplina()
        console.log(disciplinas)
        break
      case 8:
        let idAluno = parseInt(
          prompt("Entre com o ID do aluno que voce quer mudar o nome: ")
        )
        let nomeNovoAluno = prompt("Entre com o novo nome do Aluno: ")
        const resultnovoNome = await updateAluno(idAluno, {
          nome: nomeNovoAluno,
        })
        console.log(resultnovoNome)
        const novoNomeAlunos = await selecionarAluno()
        console.log(novoNomeAlunos)
        break
      case 9:
        let idCurso = parseInt(
          prompt("Entre com o ID do Curso que voce quer mudar o nome: ")
        )
        let nomeNovoCurso = prompt("Entre com o novo nome do Curso: ")
        const resultnovoCurso = await updateCurso(idCurso, {
          curso: nomeNovoCurso,
        })
        console.log(resultnovoCurso)
        const novoNomeCurso = await selecionarCurso()
        console.log(novoNomeCurso)
        break
      case 10:
        let idDisciplina = parseInt(
          prompt("Entre com o ID da Disciplina que voce quer mudar o nome: ")
        )
        let nomeNovoDisciplina = prompt("Entre com o novo nome da Disciplina: ")
        const resultnovaDisciplina = await updateDisciplina(idDisciplina, {
          disciplina: nomeNovoDisciplina,
        })
        console.log(resultnovaDisciplina)
        const novoNomeDisciplina = await selecionarDisciplina()
        console.log(novoNomeDisciplina)
        break
      case 11:
        let idAlunoDeletar = parseInt(
          prompt("Entre com o ID da Aluno que voce quer apagar: ")
        )
        const resultdeletarAluno = await deletarAluno(idAlunoDeletar)
        console.log(resultdeletarAluno)
        const ListaAlunosDeletar = await selecionarAluno()
        console.log(ListaAlunosDeletar)
        break
      case 12:
        let idCursoDeletar = parseInt(
          prompt("Entre com o ID do Curso que voce quer apagar: ")
        )
        const resultdeletarCurso = await deletarCurso(idCursoDeletar)
        console.log(resultdeletarCurso)
        const ListaCursosDeletar = await selecionarCurso()
        console.log(ListaCursosDeletar)
        break
      case 13:
        let idDisciplinaDeletar = parseInt(
          prompt("Entre com o ID da Disciplina que voce quer apagar: ")
        )
        const resultdeletarDisciplina = await deletarDisciplina(
          idDisciplinaDeletar
        )
        console.log(resultdeletarDisciplina)
        const ListaDisciplinaDeletar = await selecionarDisciplina()
        console.log(ListaDisciplinaDeletar)
        break
        case 14:
        let idCursoMatricula = parseInt(
          prompt("Entre com o ID do curso: ")
        )
        let idAlunoMatricula = parseInt(
          prompt("Entre com o ID do Aluno: ")
        )
        let idDisciplinaMatricula = parseInt(
          prompt("Entre com o ID da Disciplina: ")
        )
        
        const resultnovoMatricula = await inserirMatricula({
         id_curso: idCursoMatricula,
         id_aluno: idAlunoMatricula,
         id_disciplina: idDisciplinaMatricula
        })
        console.log(resultnovoMatricula)
        break
      case 0:
        execucao = false
        console.log("Até mais")
        break
      default:
        console.log("Escolha um Opção Viavel :D")
        break
    }
  }
}

main()
