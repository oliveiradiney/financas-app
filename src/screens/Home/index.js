import React, {useContext, useState} from 'react';

import { View, Text, Button} from 'react-native';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';

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

    const [historico, setHistorico ] = useState([
        {key: '1', tipo:'receita', valor: 1200},
        {key: '2', tipo:'despesa', valor: 200},
        {key: '3', tipo:'receita', valor: 40},
        {key: '4', tipo:'receita', valor: 89.62},
        {key: '5', tipo:'despesa', valor: 520},
        {key: '6', tipo:'despesa', valor: 310},
        {key: '7', tipo:'receita', valor: 1200},
        {key: '8', tipo:'despesa', valor: 200},
        {key: '9', tipo:'receita', valor: 40},
        {key: '10', tipo:'receita', valor: 89.62},
        {key: '11', tipo:'despesa', valor: 520},
    ])
    return(
       <Background>
            <Header />
            <Container>
                <Nome>
                    {user && user.nome}
                </Nome>
                <Saldo>R$ 200</Saldo>
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