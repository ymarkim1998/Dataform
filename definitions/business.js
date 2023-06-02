// assertion
var query = (
  ctx => `
  SELECT
    'cliente_email like "%@%.%"' AS failing_row_condition,
    *
  FROM 
    ${ctx.ref("MP_ext_clientes2")}
  WHERE NOT (cliente_email like "%@%.%")
  `)

assertion.assertion('raw_MP_clientes_row_condition2',['MP_ext_clientes2'],query);


//-----------------------------//---------------------------------------//
//  Constantes
var schema = 'business';
var tags = ['business'];
var dependencia_managed = ['MP_tb_itens_pedidos_clientes2'];


//-----------------------------//---------------------------------------//
//  Marketing Cliente

query = (
  ctx => `
  SELECT DISTINCT
      cliente_nome, cliente_email, cliente_cidade,
      cliente_estado
  FROM 
      ${ctx.ref('MP_tb_itens_pedidos_clientes2')}
  WHERE
      cliente_cpf NOT IN (SELECT cliente_cpf
                          FROM ${ctx.ref('raw_MP_clientes_row_condition2')})  
  `);

transformation.transform(
  nome_da_tabela = 'MP_marketing_clientes2', 
  schema, 
  operacao = 'view', 
  tags, 
  dependencias = ['MP_tb_itens_pedidos_clientes2', 
        'raw_MP_clientes_row_condition2'], 
  query
);



//-----------------------------//---------------------------------------//
// Receita MG

query = (
  ctx => `
  SELECT 
    pedido_data, cliente_cidade,
    ROUND(SUM(item_pedido_quantidade * produto_preco), 2) as total
  FROM 
      ${ctx.ref('MP_tb_itens_pedidos_clientes2')}
  WHERE
      cliente_estado = 'MG'
  GROUP BY   
      cliente_cidade, pedido_data
  ORDER BY
    pedido_data DESC, cliente_cidade DESC
  `)

transformation.transform(
  nome_da_tabela = 'MP_adm_receita_MG2', 
  schema, 
  operacao='view', 
  tags, 
  dependencia_managed, 
  query, 
  descricao_tabela= "Tabela com a receita dos estados",
  descricao_colunas = {
      cliente_cidade: 'Coluna com as cidades do estado de Minas Gerais',
      total: 'Cálculo das soma dos pedidos de cada cidade do estado de MG'
    }
)


//-----------------------------//---------------------------------------//
//  Receita SP

query = (
  ctx => `
  SELECT 
    pedido_data, cliente_cidade,
    ROUND(SUM(item_pedido_quantidade * produto_preco), 2) as total
  FROM 
      ${ctx.ref('MP_tb_itens_pedidos_clientes2')}
  WHERE
      cliente_estado = 'SP'
  GROUP BY   
      cliente_cidade, pedido_data
  ORDER BY
    pedido_data DESC, cliente_cidade DESC  
  `)

transformation.transform(
  nome_da_tabela = 'MP_adm_receita_SP2', 
  schema, 
  operacao='view', 
  tags, 
  dependencia_managed, 
  query, 
  descricao_tabela="Tabela com a receita dos estados",
  descricao_colunas = {
      cliente_cidade: 'Coluna com as cidades do estado de São Paulo',
      total: 'Cálculo das soma dos pedidos de cada cidade do estado de SP'
    }
)

//-----------------------------//---------------------------------------//
//  Receita por dia

query = (
  ctx => `
  SELECT 
      pedido_data, 
      ROUND(SUM(item_pedido_quantidade * produto_preco), 2) as total
  FROM 
      ${ctx.ref('MP_tb_itens_pedidos_clientes2')}
  WHERE 
      pedido_data > '2021-03-01'
  GROUP BY   
      pedido_data
  ORDER BY
    pedido_data DESC 
  `)

transformation.transform(
  nome_da_tabela = 'MP_adm_receita_por_dia2', 
  schema, 
  operacao='view', 
  tags, 
  dependencia_managed, 
  query, 
  descricao_tabela="Tabela com a receita dos estados",
  descricao_colunas = {
      pedido_data: 'Receita do supermercado por dia',
      total: 'Cálculo da receita diária do supermercado'
    }
)

//-----------------------------//---------------------------------------//
//  Receita por estado

query = (
  ctx => `
  SELECT 
      cliente_estado, 
      ROUND(SUM(item_pedido_quantidade * produto_preco), 2) as total
  FROM 
      ${ctx.ref('MP_tb_itens_pedidos_clientes2')}
  GROUP BY   
      cliente_estado
  ORDER BY
    total DESC
  `)

transformation.transform(
  nome_da_tabela = 'MP_adm_receita_por_estado2', 
  schema, 
  operacao='view', 
  tags, 
  dependencia_managed, 
  query, 
  descricao_tabela="Tabela com a receita dos estados",
  descricao_colunas = {
      total: 'Cálculo da receita por estado'
    }
)
