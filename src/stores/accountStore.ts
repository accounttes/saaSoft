import { defineStore } from 'pinia'

export interface Account {
  label: string
  labelText: string
  type: 'LDAP' | 'Локальная'
  login: string
  password: string | null
  loginInvalid: boolean
  passwordInvalid: boolean
  labelArray: string[]
  showPassword: boolean
}

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        label: '',
        type: 'Локальная',
        login: '',
        password: null,
        labelText: '',
        loginInvalid: false,
        passwordInvalid: false,
        labelArray: [],
        showPassword: false,
      })
    },
    deleteAccount(index: number) {
      this.accounts.splice(index, 1)
    },
    updateAccount(index: number, account: Account) {
      this.accounts[index] = account
    },
  },
})
