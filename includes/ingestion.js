function ingest(nome_da_tabela, schema, tags, formato, uri) {
    /**
     * Faz ingestão de dados de um arquivo no Cloud Storage no BigQuery.
     * @param {String} nome_da_tabela  Nome da tabela que será criada no BQ
     * @param {String} schema   Nome do dataset onde a tabela será criada no BQ
     * @param {Array of String} tag Tag do Dataform utilizando para organizar o processamento dos dados pelo Dataform
     * @param {String} formato formato do arquivo
     * @param {String} uri Caminho do arquivo que está armazenado no Cloud Storage
    */


    query = (
        ctx => `
        CREATE OR REPLACE EXTERNAL TABLE ${ctx.self()} 
        OPTIONS(
            format = ${formato},
            uris = ['${uri}']
        );`
    );


    operate(
        nome_da_tabela, 
        ).queries(
            query
        ).hasOutput(
            true
        ).schema(
            schema
        ).tags(
            tags
        )
};
module.exports = {ingest};