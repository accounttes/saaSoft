<template>
  <div>
    <div v-for="(account, index) in accounts" :key="index" class="account-entry mb-4">
      <div class="form-group">
        <label>Метка (до 50 символов):</label>
        <input
          type="text"
          v-model="account.label"
          @blur="transformLabelToArray(index)"
          placeholder="Необязательно"
        />
      </div>
      <div class="form-group">
        <label>Тип записи:</label>
        <select v-model="account.type" @change="handleTypeChange(index)">
          <option value="LDAP">LDAP</option>
          <option value="Локальная">Локальная</option>
        </select>
      </div>
      <div class="form-group">
        <label>Логин (обязательно, до 100 символов):</label>
        <input
          type="text"
          v-model="account.login"
          @blur="validateAccount(index)"
          placeholder="Обязательно"
          :class="{ 'is-invalid': account.loginInvalid }"
        />
      </div>
      <div v-if="account.type === 'Локальная'" class="form-group">
        <label>Пароль (обязательно, до 100 символов):</label>
        <div class="password-container">
          <input
            :type="account.showPassword ? 'text' : 'password'"
            v-model="account.password"
            @blur="validateAccount(index)"
            placeholder="Обязательно"
            :class="{ 'is-invalid': account.passwordInvalid }"
          />
          <button
            type="button"
            @click="togglePasswordVisibility(index)"
            class="toggle-password-btn"
          >
            {{ account.showPassword ? 'Скрыть' : 'Показать' }}
          </button>
        </div>
      </div>
      <button type="button" @click="deleteAccount(index)" class="delete-button">Удалить</button>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useAccountStore } from '@/stores/accountStore'
import type { Account } from '@/stores/accountStore'

export default defineComponent({
  setup() {
    const accountStore = useAccountStore()
    const accounts = ref<Account[]>(JSON.parse(localStorage.getItem('accounts') || '[]'))

    accounts.value.forEach((account) => {
      account.showPassword = false
    })

    watch(
      accounts,
      (newAccounts) => {
        accountStore.accounts = newAccounts
        localStorage.setItem('accounts', JSON.stringify(newAccounts))
      },
      { deep: true },
    )

    const addAccount = () => {
      accounts.value.unshift({
        label: '',
        type: 'LDAP',
        login: '',
        password: '',
        loginInvalid: false,
        passwordInvalid: false,
        labelArray: [],
        labelText: '',
        showPassword: false,
      })
    }

    const deleteAccount = (index: number) => {
      accounts.value.splice(index, 1)
    }

    const handleTypeChange = (index: number) => {
      const account = accounts.value[index]
      if (account.type === 'LDAP') {
        account.password = ''
      }
      account.passwordInvalid = false
    }

    const transformLabelToArray = (index: number) => {
      const account = accounts.value[index]
      if (account.label) {
        account.labelArray = account.label
          .split(';')
          .map((text) => text.trim())
          .slice(0, 50)
      } else {
        account.labelArray = []
      }
    }

    const validateAccount = (index: number) => {
      const account = accounts.value[index]
      account.loginInvalid = !account.login || account.login.length > 100
      account.passwordInvalid =
        account.type === 'Локальная' && (!account.password || account.password.length > 100)

      transformLabelToArray(index)
    }

    const togglePasswordVisibility = (index: number) => {
      accounts.value[index].showPassword = !accounts.value[index].showPassword
    }

    return {
      accounts,
      addAccount,
      deleteAccount,
      validateAccount,
      handleTypeChange,
      transformLabelToArray,
      togglePasswordVisibility,
    }
  },
})
</script>

<style scoped>
.account-entry {
  background: #ffffff;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 50px;
  margin-top: 25px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

input.is-invalid {
  border-color: red;
}

.password-container {
  position: relative;
}

.toggle-password-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
}

.delete-button {
  display: inline-block;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  background-color: #dc3545;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c82333;
}

hr {
  margin: 10px 0;
  border: none;
  border-top: 1px solid #e0e0e0;
}

.add-button {
  margin-bottom: 20px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}
.add-button:hover {
  background-color: #218838;
}
</style>
