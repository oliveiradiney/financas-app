import React, {useContext, useState, useEffect} from 'react';

import { View, Text, Button} from 'react-native';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import { format } from 'date-fns';
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import {
    Background,
    Container,
    Nome,
    Saldo,
    Title,
    List
 } from './styles';

export default function Home({navigation}){
    const { user, signOut } = useContext(AuthContext);
    const [historico , setHistorico] = useState([]);
    const [ saldo, setSaldo ] = useState(0);

  
    const uid = user && user.uid;

    useEffect(() => {
        async function loadlist(){
            await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
                setSaldo(snapshot.val().saldo);
            });

            await firebase.database().ref('historico')
            .child(uid)
            .orderByChild('date').equalTo(format(new Date, 'dd/MM/yy'))
            .limitToLast(10).on('value', (snapshot) => {
                setHistorico([]);

                snapshot.forEach((childItem) => {
                    let list = {
                        key: childItem.key,
                        tipo: childItem.val().tipo,
                        valor: childItem.val().valor
                    };

                    setHistorico(oldArray => [...oldArray, list].reverse());
                });

                
            })
        }

        loadlist();
    }, []);
   
    return(
       <Background>
            <Header />
            <Container>
                <Nome>
                    {user && user.nome}
                </Nome>
                <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
            </Container>

            <Title>Ultimas movimentações</Title>

            <List 
                contentContainerStyle={{ paddingBottom: 20, paddingRight: 10, paddingLeft: 10}}
                style={{height: '95%'}}
                showsVerticalScrollIndicator={false}
                data={historico}
                keyExtractor={item => item.key}
                renderItem={({item}) => (<HistoricoList  data={item} />)}
            />
       </Background>
    )
}