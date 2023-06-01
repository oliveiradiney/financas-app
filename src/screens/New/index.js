import React, { useState } from 'react';
import { Container, Input, SubmitButton, SubmitText } from './styles';
import Header from '../../components/Header';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Picker from '../../components/Picker';

export default function New() {
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('receita');

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

                <SubmitButton>
                    <SubmitText>Registrar</SubmitText>
                </SubmitButton>
            </SafeAreaView>
        </Container>
        </TouchableWithoutFeedback>
    );
}