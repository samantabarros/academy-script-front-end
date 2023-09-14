/*
 *Conjunto padronizado de funções que são usadas para
 *fazer requisições HTTP a uma API usando o Axios
 */

//Importação do objeto 'api do módulo "boot/axios"

import { api } from "boot/axios";

//Cria as funcoes de requisição de forma padronizada
/*
 * a função principal 'useApi aceita uma URL como argumento e
 * retorna um conjunto de funções para fazer operações CRUD(Create, Read, Update, Delete)
 */

export default function useApi(url) {
  //Listar dados - requisição get
  const list = async () => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  //Enviar dados - requisição post
  const post = async (dados) => {
    try {
      const { data } = await api.post(url, dados);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  //Atualizar dados - requisição put
  const update = async (dados) => {
    try {
      //o put precisa de uma url e o id que vai ser atualizados
      const { data } = await api.put(`${url}/${dados.id}`, dados);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  //Deleta dados - requisição delete
  const remove = async (dados) => {
    try {
      //o delete precisa do id que vai ser removido
      const { data } = await api.delete(`${url}/${dados.id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * Todas as funções acima possui um bloco 'try...catch'.Assim, se
   * ocorrer um erro durante a requisição, ele será capturado pelo bloco 'catch'
   * e um novo erro será lançado com a mensagem do erro capturado.
   * */

  /*
   * A função useApi retorna um objeto com as funções CRUD, permitindo que
   * sejam usadas em outras partes do código
   */
  return {
    list,
    post,
    update,
    remove,
  };
}
