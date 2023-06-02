function assertion(nome_assertion, dependencias,
                   query_assertion){
    /**
     * Faz teste de qualidade nos dados localizados no bigquery baseado na query que o usuário fornece.
     * @param {String} nome_assertion  Nome da tabela que será criada no BigQuery
     * @param {Array of String} dependencias   Lista de tabelas dependentes 
     * para criar uma árvore dependencias
     * @param {String} query_assertion  Consulta do SQL responsável por realizar o teste de qualidade nos dados
    */
    publish(
        nome_assertion, {
            dependencies: dependencias
        }
    ).query(
        query_assertion
    );
}


module.exports = {assertion};