import { useRouter } from "next/router";
import { createContext, FC, PropsWithChildren, useEffect, useReducer } from "react";
import { useQuery } from "react-query";
import { AuthService } from "../API/auth.service";
import { IUser } from "../types/user.types";
import { ActionTypes, AllActions, IState, TAuthContext } from "./Context.types";

const initialState: IState = {
    regError: "",
    logError: "",
    user: null,
    isSubmitting: false,
    isInitializing: true
}


export const AuthContext = createContext<TAuthContext>(initialState as TAuthContext)


const authReducer = (state: IState, action: ActionTypes): IState => {
    switch (action.type) {

        case AllActions.REGISTER_FULLFILLED: {
            return {
                ...state,
                regError: '',
                isSubmitting: false,
                user: action.payload
            }
        }

        case AllActions.REGISTER_PENDING: {
            return {
                ...state,
                isSubmitting: true,
            }
        }

        case AllActions.REGISTER_ERROR: {
            return {
                ...state,
                regError: action.payload,
                isSubmitting: false,
            }
        }


        case AllActions.LOGIN_FULLFILLED: {
            return {
                ...state,
                logError: '',
                isSubmitting: false,
                user: action.payload
            }
        }

        case AllActions.LOGIN_PENDING: {
            return {
                ...state,
                isSubmitting: true,
            }
        }

        case AllActions.LOGIN_ERROR: {
            return {
                ...state,
                logError: action.payload,
                isSubmitting: false,
            }
        }

        case AllActions.GETAUTH_FULLFILLED: {
            return {
                ...state,
                user: action.payload,
                isInitializing: false
            }
        }

        case AllActions.GETAUTH_PENDING: {
            return {
                ...state,
                isSubmitting: true,
                isInitializing: true
            }
        }

        case AllActions.GETAUTH_ERROR: {
            return {
                ...state,
                isInitializing: false
            }
        }

        case AllActions.LOGOUT: {
            return {
                ...state,
                logError: '',
                regError: "",
                user: null,
            }
        }

        default: {
            return state
        }
    }
}



export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const actionCreators = {
        loginFullfilled: (user: IUser) => dispatch({ type: AllActions.LOGIN_FULLFILLED, payload: user }),
        loginPending: () => dispatch({ type: AllActions.LOGIN_PENDING }),
        loginError: (err: string) => dispatch({ type: AllActions.LOGIN_ERROR, payload: err }),

        registerFullfilled: (user: IUser) => dispatch({ type: AllActions.REGISTER_FULLFILLED, payload: user }),
        registerPending: () => dispatch({ type: AllActions.REGISTER_PENDING }),
        registerError: (err: string) => dispatch({ type: AllActions.REGISTER_ERROR, payload: err }),

        getAuthFullfilled: (user: IUser) => dispatch({ type: AllActions.GETAUTH_FULLFILLED, payload: user }),
        getAuthPending: () => dispatch({ type: AllActions.GETAUTH_PENDING }),
        getAuthError: (err: string) => dispatch({ type: AllActions.GETAUTH_ERROR, payload: err }),

        logout: () => dispatch({ type: AllActions.LOGOUT })
    }


    const { refetch } = useQuery('get auth', async () => await AuthService.getAuth(),
        {
            retry: false,

            onSuccess: (data) => {
                actionCreators.getAuthFullfilled(data)
                console.log(data);
            }
        }
    )


    return <AuthContext.Provider value={{ ...state, ...actionCreators }}>
        {children}
    </AuthContext.Provider>
}