import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import {
    Container,
    Logout,
    LogoutText,
    NewLink,
    NewText,
    Nome,
} from './styles'

export default function Profile() {
    const navigation = useNavigation();

    const { user, signOut } = useContext(AuthContext);

    return (
        <Container>
            <Header />
            <Nome>
                {user && user.nome}
            </Nome>
            <NewLink onPress={() => navigation.navigate("Registrar")}>
                <NewText>Registrar gastos</NewText>
            </NewLink>

            <Logout onPress={() => signOut()}>
                <LogoutText>Sair</LogoutText>
            </Logout>
        </Container>
    );
}