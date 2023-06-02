function transform(nome_da_tabela, schema, operacao, tags, dependencias, 
                        query, descricao_tabela='', descricao_colunas={}){
    /**
     * A partir de uma query fornecida pelo usuário, transforma os dados e cria uma view ou tabela no BigQuery.
     * @param {String} nome_da_tabela  Nome da tabela que será criada no BigQuery
     * @param {String} schema   Nome do dataset onde a tabela será criada no BigQuery
     * @param {String} operacao   Tipo de operação do Dataform: table ou view
     * @param {Array of String} tags Tags do Dataform utilizando para organizar o processamento dos dados pelo Dataform
     * @param {Array of String} dependencias   Lista de tabelas dependentes para serem utilizadas
     * @param {String} query Consulta do SQL responsável por realizar as transformações nos dados
     * @param {String} descricao_tabela   Opcional - Descrição da tabela no BigQuery
     * @param {Array of String} descricao_colunas   Opcional - Descrição das colunas da tabela no BigQuery
    */


    publish (
        nome_da_tabela, {
            type: operacao,
            schema: schema,
            dependencies: dependencias,
            tags: tags,
            description: descricao_tabela,
            columns: descricao_colunas
            }
        ).query(
            query
        )
};


module.exports = {transform};