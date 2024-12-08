import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from 'react';
import agent from '../../services/api/agent';

const AuthContext = createContext(undefined);

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) throw new Error('useAuth must be used withing an AuthProvider');

    return AuthContext;
};

interface Props {
    children?: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await agent.Authenticate.refreshToken();
                setToken(response.token);
            } catch {
                setToken(null);
            }
            console.log(token);
        };
        fetchMe();
    }, []);

    useLayoutEffect(() => {
        const authInterceptor = agent.api.interceptors.request.use((config: any) => {
            config.headers.Authorization =
                !(config?._retry as boolean) && token ? `Bearer ${token}` : config.headers.Authorization;
            return config;
        });

        return () => {
            agent.api.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    useLayoutEffect(() => {
        const refreshInterceptor = agent.api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && error.response.data.message === 'Unauthorized') {
                    try {
                        const response = await agent.Authenticate.refreshToken();
                        setToken(response.token);

                        originalRequest.headers.Authorization = `Bearer ${response.token}`;
                        originalRequest._retry = true;
                        return agent.api(originalRequest);
                    } catch {
                        setToken(null);
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => {
            agent.api.interceptors.response.eject(refreshInterceptor);
        };
    });

    return <>{children}</>;
};
