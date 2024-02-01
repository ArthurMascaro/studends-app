const student = {
    name: "Anne",
    mother: "Bethany", // ou motherName
    phones: ["(16) 12345-6789"],
    bornDate: "data em milissegundos/dayjs",
    grade: "1° Ano E.M.", // sigla E.M. ou E.F. (front já envia certo)
    CPF: "",
    observation: "",
    owing: 2 //atributo de "devendo" não pertence ao usuário, mas ao buscar usuários deve estar junto
}

const week = { 
    start: "data de inicio da semana tipo 09/06/2024",
    finish: "data do fim da semana tipo 15/06/2024",
    totalLessons: 12, // numero de aulas para aquela semana (data de inicio até data final)
    days: [
        {
            name: "Segunda",
            date: "data do dia tipo 09/06/2024",
            lessons: [
                {
                    student: {
                        name: "Anne",
                        owing: 2
                    },
                    startTime: "hora do inicio da aula (do tipo date com acrescimo da hora)",
                    finishTime: "hora do fim da aula (do tipo date com acrescimo da hora)"
                },
                {
                    student: {
                        name: "Bob",
                        owing: 0
                    },
                    startTime: "hora do inicio da aula (do tipo date com acrescimo da hora)",
                    finishTime: "hora do fim da aula (do tipo date com acrescimo da hora)"
                }
            ]
        }
    ]
}

const lesson = {
    student: {
        name: "Anne"
    },
    date: "data igual as outras",
    startTime: "hora do inicio da aula (do tipo date com acrescimo da hora)",
    finishTime: "hora do fim da aula (do tipo date com acrescimo da hora)",
    payed: true | false, // editavel com um clique pelo front (deve existir um update payed),
    present: true | false // editavel com clique também, representa se o aluno foi na aula
}

const amout = [
    {
        month: "Janeiro 2024",
        lessons: [
            { 
                student: {
                    name: "Anne"
                },
                totalLessons: 4,
                totalValue: 140
            },
            { 
                student: {
                    name: "Bob"
                },
                totalLessons: 5,
                totalValue: 175
            }
        ]
    }
]

/*
-- (OK -> fiz um pouco diferente,
    te retorno todas as lectures da semana
    e ai por cada lecture fiz queries pra user e lesson
    que você pode achar cada um deles pela lecture id) Pagina inicial => retornar a consulta da semana (pegar data do server e encontrar a semana 
    que essa data pertence, retornar todos os dias dessa semana com numero, nome e aulas do dia; a
    aula contém o nome do aluno e o atributo de valor da divida ( puxado do banco) )

-- (OK) Adicionar aluno => receber dados e adicionar (pode telefones iguais, nome mãe igual; telefone, CPF e 
    serie já chegarão formatadas com regex para telefone e cpf e a serie com selector )

-- (OK -> método pra achar numero de aulas em dividas
    método para achar valor total em dívida
    método para achar usuários em divida) Pagina de alunos => Listar todos os alunos com a junção de aulas em divida (valor owing)

-- (OK) Consultar alunos => Por nome, telefone, nome da mãe, alunos em divida (tem que fazer join) e série (tipo grade == "1° Ano E.M.")
    ainda não sei como unir todas as consultas no front mas é bom deixar feito

-- (OK) Pagina aulas => Listar todas as aulas em ordem da mais nova para a mais velha (tenta fazer o bd recuperar de 20 em 20, por exemplo, 
    assim eu faço paginação e não fica lerdo)

-- (OK) Listar aulas de acordo com o cpf do aluno (com implementação de paginação)

-- (OK) Criar aula => os dados são enviados já formatados, mas preciso de uma serviço que verifique se uma aula está cadastrada
    no mesmo horario e dia que outra (não vou impedir o cadastro, apenas avisar que já tem uma aula no horário)

-- (OK) Consulta valores => agrupar dados de aulas por nome de aluno e por mes, somando os lucros de cada aluno e o total de aulas
    dadas para aquele aluno no mes
*/

