import React from "react";
import { useNavigate } from "react-router-dom";
import { userStoreZustand } from "../store/user-store";
import { aiModelsStoreZustand } from "../store/ai-models-store";

export const useAuth = () => {
    const { initializeUser, user: { token } } = userStoreZustand((state) => state);
    const fetchModels = aiModelsStoreZustand((state) => state.fetchModels);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        const checkAuth = async () => {
            const userData = localStorage.getItem("userData");
            const authStatus = !!userData;
            initializeUser();
            fetchModels(token);
            setIsAuthenticated(authStatus);

            if (!authStatus) {
                navigate("/login");
            }
        };

        checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isAuthenticated;
}