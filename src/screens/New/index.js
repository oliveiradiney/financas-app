import React, { useContext, useState } from 'react';
import { Container, Input, SubmitButton, SubmitText } from './styles';
import Header from '../../components/Header';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import format from 'date-fns/format';
import firebase from '../../services/firebaseConnection';

import Picker from '../../components/Picker';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'
export default function New() {

    const navigation = useNavigation();
    const { user: usuario } = useContext(AuthContext)
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('receita');

    function handleSubmit(){
        Keyboard.dismiss();
        if(isNaN(parseFloat(valor)) || tipo === null){
            alert('Preencha todos os campos!');
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo ${tipo} - Valor: ${parseFloat(valor)}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )
        
    }

    async function handleAdd(){
        let uid = usuario.uid;
        let key = await firebase.database().ref('historico').child(uid).push().key;

        await firebase.database().ref('historico').child(uid).child(key).set({
            tipo: tipo,
            valor: parseFloat(valor),
            date: format(new Date(), 'dd/MM/yyyy')
        })

        //atualizar o saldo
        let user = firebase.database().ref('users').child(uid);
        await user.once('value').then((snapshot) => {
            let saldo = parseFloat(snapshot.val().saldo);

            tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

            user.child('saldo').set(saldo);
        });

        setValor('');
        setTipo('')
        Keyboard.dismiss();

        navigation.navigate('Home')
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
            <Header />
            <SafeAreaView style={{alignItems: 'center'}}>
                <Input 
                    placeholder="Valor desejado"
                    keyboardType='numeric'
                    returnKeyType='next'
                    onSubmitEditing={() => Keyboard.dismiss()}
                    value={valor}
                    onChangeText={(text) => setValor(text)}
                />

                <Picker onChange={setTipo} tipo={tipo}/>

                <SubmitButton onPress={handleSubmit}>
                    <SubmitText>Registrar</SubmitText>
                </SubmitButton>
            </SafeAreaView>
        </Container>
        </TouchableWithoutFeedback>
    );
}