/*Requisições para  a manipulação dos dados dos Módulos*/

import useApi from "/src/composables/UseApi";

//Importa os métodos que vão ser utilizados da Api

export default function postsService() {
  const { list, update, remove, post } = useApi("/modulos");

  return {
    list,
    post,
    update,
    remove,
  };
}
