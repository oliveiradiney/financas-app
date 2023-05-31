import React, {useContext} from 'react';

import { View, Text, Button} from 'react-native';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';

import {
    Background,
    Container,
    Nome,
    Saldo,
    Title
 } from './styles';

export default function Home({navigation}){
    const { user, signOut } = useContext(AuthContext);
    return(
       <Background>
            <Header />
            <Container>
                <Nome>
                    Diney
                </Nome>
                <Saldo>R$ 123,00</Saldo>
            </Container>

            <Title>Ultimas movimentações</Title>
       </Background>
    )
}