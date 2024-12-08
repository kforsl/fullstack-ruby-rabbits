import { configureAuth } from 'react-query-auth';
import agent from '../api/agent';
import { SignInForm, SignUpForm } from '../../interfaces/interfaceAuth';

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
    userFn: () => agent.Profile.getProfile(),
    loginFn: (credentials: SignInForm) => agent.Authenticate.signIn(credentials),
    registerFn: (credentials: SignUpForm) => agent.Authenticate.signUp(credentials),
    logoutFn: () => agent.Authenticate.signOut(),
});
