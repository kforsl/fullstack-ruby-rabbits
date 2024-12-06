import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import agent from '../../services/api/agent';
import { InternalAxiosRequestConfig } from 'axios';
import { InternalAxiosRequestConfig from 'axios';

const AuthContext = createContext(undefined);

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) throw new Error('useAuth must be used withing an AuthProvider');

    return AuthContext;
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await agent.Authenticate.refreshToken();
                setToken(response.data.accessToken);
            } catch {
                setToken(null);
            }
        };
        fetchMe();
    }, []);

    useLayoutEffect(() => {
        const authInterceptor = agent.Configs.interceptors.request.use((config: any ) => void => {
            config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
        });
        return () => {
            agent.Configs.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    useLayoutEffect(() => {
        const refreshInterceptor = agent.Configs.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && error.response.data.message === 'Unauthorized') {
                    try {
                        const response = await agent.Authenticate.refreshToken();
                        setToken(response.data.accessToken);

                        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                        originalRequest._retry = true;
                    } catch {
                        setToken(null);
                    }
                }
            },
            
        );
    });
};
