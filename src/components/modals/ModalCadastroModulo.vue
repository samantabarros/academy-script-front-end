<template>
    <card-base titulo="Cadastrar Módulo">
        <div class="col-12 col-4-md">
            <q-form @submit.prevent="submitForm">
                <q-card-section class="q-pt-xs">
                    <div>
                        <q-input outlined class="q-mb-xs" v-model="cadastro.nome_modulo" label="Nome" :rules="[
                            (val) => (val && val.length > 0) || 'Campo obrigatório',
                        ]" />
                    </div>
                    <div class="row q-pa-md q-gutter-lg justify-center">
                        <q-btn color="positive" type="submit" label="Cadastrar" />
                        <q-btn color="negative" label="Cancelar" v-close-popup />
                    </div>

                </q-card-section>
            </q-form>
        </div>
    </card-base>
</template>

<script setup>
import { ref } from "vue";
import { api } from "src/boot/axios";
import CardBase from "../commons/CardBase.vue";
import { Notify, useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const cadastro = ref({
    nome_modulo: ""
});

const submitForm = async () => {
    try {
        const { data } = await api.post("modulos", cadastro.value);
        console.log(data);
        $q.notify({
            message: "Módulo cadastrado com sucesso!",
            color: "positive",
            icon: "check_circle_outline",
            position: "top",
        });
        setTimeout(() => {
            location.reload();
        }, 2000);
    } catch (error) {
        if (error.response) {
            $q.notify({
                message: error.response.data.message,
                color: "negative",
                icon: "error",
                position: "top",
            });
        } else {
            $q.notify({
                message: "Erro ao cadastrar módulo!",
                color: "negative",
                icon: "error",
                position: "top",
            });
        }
    }


}

</script>