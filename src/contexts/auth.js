import React, { createContext, useState } from "react";
import firebase from '../services/firebaseConnection'
import { Alert } from "react-native";

export const AuthContext = createContext({});

function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);


    //cadastrar usuario
    async function signUp(email, password, nome){ 
        setLoadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                };
                setUser(data);
                storegeUser(data)
                setLoadingAuth(false)
    
            })
        })
        .catch((error) => {
            Alert(error.code)
            setLoadingAuth(false)
          })
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, signUp}}>
            {children}
        </AuthContext.Provider>
        
    );
}

export default AuthProvider;