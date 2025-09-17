#!/bin/bash

# Configuração do package base
BASE_PACKAGE="com.senai.infoa.dvdrental"

# Pergunta quantas entidades serão criadas
read -p "Quantas entidades deseja criar? " qtd

# Loop para cada entidade
for ((i=1; i<=qtd; i++))
do
  read -p "Digite o nome da entidade #$i (ex: Produto): " entity

  # Converte para PascalCase (caso usuário digite errado)
  entityPascal=$(echo "$entity" | sed -r 's/(^|_)([a-z])/\U\2/g')

  # Cria diretórios se não existirem
  mkdir -p models repositories controllers services

  # Cria os arquivos .java
  echo "package ${BASE_PACKAGE}.models;

public class ${entityPascal} {
    private Long id;

    // TODO: adicionar atributos
}
" > models/${entityPascal}.java

  echo "package ${BASE_PACKAGE}.repositories;

public class ${entityPascal}Repository {
    // TODO: lógica de persistência
}
" > repositories/${entityPascal}Repository.java

  echo "package ${BASE_PACKAGE}.services;

public class ${entityPascal}Service {
    // TODO: lógica de negócio
}
" > services/${entityPascal}Service.java

  echo "package ${BASE_PACKAGE}.controllers;

public class ${entityPascal}Controller {
    // TODO: endpoints REST
}
" > controllers/${entityPascal}Controller.java

  echo "✔ Arquivos gerados para a entidade ${entityPascal}"
done

echo "✅ Processo concluído!"