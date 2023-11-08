<template>
    <q-card>
        <div class="row q-pt-lg q-pb-sx row justify-center">
            <q-avatar icon="info" color="orange" text-color="white" />
            <div class="row">
                <span class="text-h6 q-px-sm text-center">
                    <p>Tem certeza que deseja excluir a matrícula desse aluno? </p> 
                    <p>Ao confirmar essaação vocẽ não poderá desfazê-lá.</p>
                </span>
            </div>
            <div class="col-sm-12">
                <q-card-actions align="center">
                    <q-btn flat label="Sim, excluir" color="positive" @click="deletarModulo(id)" />
                    <q-btn flat label="Cancelar" color="negative" v-close-popup />
                </q-card-actions>
            </div>
        </div>
    </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";

const $q = useQuasar();
const props = defineProps({
    id: {type: String }
});

const deletarModulo = async (id) => {
    try {
        const {data} = await api.delete(`matricula/${id}`);
        $q.notify({
            message: "Módulo excluido com sucesso!",
            color: "positive",
            icon: "check_circle_outline",
            position: "top"
        });
        setTimeout(() => {
            location.reload();
        }, 2000);
    }catch(error){
        console.log(error);
        $q.notify({
            message: error.response.data.message,
            color: "negative",
            icon: "error",
            position: "top"
        });
    }
}


</script>