import React from 'react'

const LoginContext = React.createContext({
  userName: '',
  passWord: '',
  updateUsername: () => {},
  updatePassword: () => {},
})

export default LoginContext
