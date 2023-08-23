import { api } from "boot/axios";

//Cria as funcoes de requisição de forma padronizada

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
      //o put precisa de uma url e o id que vain ser atualizadoq
      const { data } = await api.put("${url}/${dados.id}", dados);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  //Deleta dados - requisição put
  const remove = async (dados) => {
    try {
      //o delete precisa do id que vai ser removido
      const { data } = await api.delete("${url}/${dados.id}");
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    list,
    post,
    update,
    remove,
  };
}
