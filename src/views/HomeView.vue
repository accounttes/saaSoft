<script lang="ts">
import { defineComponent, ref } from 'vue'
import AccountForm from '@/components/AccountForm.vue'

export default defineComponent({
  components: {
    AccountForm,
  },
  setup() {
    const accountFormRef = ref<InstanceType<typeof AccountForm> | null>(null)

    const addAccount = () => {
      if (accountFormRef.value) {
        accountFormRef.value.addAccount()
      }
    }

    return {
      accountFormRef,
      addAccount,
    }
  },
})
</script>

<template>
  <header class="header">
    <h1 class="title">Учетные записи</h1>
    <button class="button-add" type="button" @click="addAccount">
      <img src="../assets/icons/plus.svg" alt="plus" />
    </button>
  </header>
  <main>
    <div class="faq">
      <img class="icon-faq" src="../assets/icons/faq.svg" alt="faq" />
      <span
        >Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span
      >
    </div>

    <!-- Передаем ref в компонент AccountForm -->
    <AccountForm ref="accountFormRef" />
  </main>
</template>

<style scoped>
.header {
  display: flex;
}

.title {
  font-weight: bold;
}

.button-add {
  cursor: pointer;
  width: 50px;
  height: 50px;
  border: 1px solid lightgray;
  background: 0;
  border-radius: 5px;
  margin-left: 20px;
}

.faq {
  display: flex;
  align-items: center;
  background: #eef4fa;
  width: 100%;
  margin-top: 30px;
  height: 40px;
  padding: 10px;
}

.icon-faq {
  height: 30px;
  margin-right: 10px;
}
</style>
