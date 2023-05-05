const mysql = require('mysql2/promise');

async function connect(){
    if (global.connection && global.connection.state !== 'disconnected')
    return global.connection;



const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'Topsp808!@',
    database: 'atividade03'
});

console.log('Conectou ao BD Atividade 03 !')
global.connection = connection
return global.connection;
}

async function inicioDB(){
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            port: '3306',
            password: 'Topsp808!@',
            database: 'atividade03'
        });
    
        // Cria tabela aluno
        await connection.execute(
          `CREATE TABLE IF NOT EXISTS aluno (
            id_aluno INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(20),
            PRIMARY KEY (id_aluno)
          );`
        );
    
        // Cria tabela disciplina
        await connection.execute(
          `CREATE TABLE IF NOT EXISTS disciplina (
            id_disciplina INT NOT NULL AUTO_INCREMENT,
            disciplina VARCHAR(20),
            PRIMARY KEY(id_disciplina)
          );`
        );
    
        // Cria tabela curso
        await connection.execute(
          `CREATE TABLE IF NOT EXISTS curso (
            id_curso INT NOT NULL AUTO_INCREMENT,
            curso VARCHAR(20),
            PRIMARY KEY(id_curso)
          );`
        );
    
        // Cria tabela matricula
        await connection.execute(
          `CREATE TABLE IF NOT EXISTS matricula  (
            id_matricula INT NOT NULL AUTO_INCREMENT,
            id_curso INT,
            id_aluno INT,
            id_disciplina INT,
            PRIMARY KEY(id_matricula),
            FOREIGN KEY (id_curso) REFERENCES curso(id_curso),
            FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
            FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina)
          );`
        );
    
        // Adiciona índice na coluna id_aluno da tabela matricula
        await connection.execute(
          `ALTER TABLE matricula ADD INDEX (id_aluno);`
        );
    
        // Adiciona as constraints de chave estrangeira na tabela matricula
        await connection.execute(
          `ALTER TABLE matricula
           ADD CONSTRAINT fk_aluno FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno),
           ADD CONSTRAINT fk_curso FOREIGN KEY (id_curso) REFERENCES curso(id_curso),
           ADD CONSTRAINT fk_disciplina FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina);`
        );
    
        console.log('Todas as tabelas foram criadas com sucesso!');
      } catch (error) {
        console.error(`Erro ao criar tabelas: ${error}`);
      }
    }



async function selecionarAluno(){
    
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM aluno;');
    return rows;
    
}

async function selecionarCurso(){
    
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM curso;');
    return rows;
    
}

async function selecionarDisciplina(){
    
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM disciplina;');
    return rows;
    
}


async function selecionarMatricula(matriculaID){
    
    const conn = await connect();
    const query = 'SELECT m.id_matricula, c.curso, a.nome, d.disciplina FROM matricula m ' +
                  'INNER JOIN aluno a ON m.id_aluno = a.id_aluno ' +
                  'INNER JOIN disciplina d ON d.id_disciplina = m.id_disciplina ' +
                  'INNER JOIN curso c ON c.id_curso = m.id_curso ' +
                  'WHERE m.id_matricula = ?';
    const [rows] = await conn.query(query, [matriculaID]);
    return rows;
    
}

async function inserirAluno(aluno){
    const conn = await connect();
    const sql = 'INSERT INTO aluno(nome) VALUES (?);';
    const values = [aluno.nome]
    return  await conn.query(sql,values)
}

async function inserirCurso(curso){
    const conn = await connect();
    const sql = 'INSERT INTO curso(curso) VALUES (?);';
    const values = [curso.curso]
    return  await conn.query(sql,values)
}

async function inserirDisciplina(disciplina){
    const conn = await connect();
    const sql = 'INSERT INTO disciplina(disciplina) VALUES (?);';
    const values = [disciplina.disciplina]
    return  await conn.query(sql,values)
}

async function inserirMatricula(matricula){
    const conn = await connect();
    const sql = 'INSERT INTO matricula(id_curso,id_aluno,id_disciplina) VALUES (?,?,?);';
    const values = [matricula.id_curso,matricula.id_aluno,matricula.id_disciplina]
    return  await conn.query(sql,values)
}

async function updateAluno(id,aluno){
    const conn = await connect();
    const sql = 'UPDATE aluno SET nome=? where id_aluno=?;';
    const values = [aluno.nome,id]
    return await conn.query(sql,values)
}

async function updateCurso(id,curso){
    const conn = await connect();
    const sql = 'UPDATE curso SET curso=? where id_curso=?;';
    const values = [curso.curso,id]
    return await conn.query(sql,values)
}

async function updateDisciplina(id,disciplina){
    const conn = await connect();
    const sql = 'UPDATE disciplina SET disciplina=? where id_disciplina=?;';
    const values = [disciplina.disciplina,id]
    return await conn.query(sql,values)
}

async function deletarAluno(id){
    const conn = await connect();
    const sql = 'DELETE from aluno where id_aluno=?;';
    return await conn.query(sql,[id])
}

async function deletarCurso(id){
    const conn = await connect();
    const sql = 'DELETE from curso where id_curso=?;';
    return await conn.query(sql,[id])
}

async function deletarDisciplina(id){
    const conn = await connect();
    const sql = 'DELETE from disciplina where id_disciplina=?;';
    return await conn.query(sql,[id])
}

module.exports = {selecionarMatricula,selecionarAluno,selecionarCurso,selecionarDisciplina,inserirAluno,inserirCurso,inserirDisciplina, updateAluno,updateCurso,updateDisciplina,deletarAluno,deletarCurso,deletarDisciplina,inicioDB,inserirMatricula}