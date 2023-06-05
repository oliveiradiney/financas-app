import React, { useContext, useState, useEffect } from 'react';

import { Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import { format, isBefore, isPast } from 'date-fns';
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import Icon from '@expo/vector-icons/MaterialIcons';



import {
    Background,
    Container,
    Nome,
    Saldo,
    Title,
    List,
    Area
} from './styles';
import { Picker } from '@react-native-community/picker';

export default function Home({ navigation }) {
    const { user, signOut } = useContext(AuthContext);
    const [historico, setHistorico] = useState([]);
    const [saldo, setSaldo] = useState(0);


    const uid = user && user.uid;

    const [newDate, setNewDate] = useState(new Date());
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function loadlist() {
            await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
                setSaldo(snapshot.val().saldo);
            });

            await firebase.database().ref('historico')
                .child(uid)
                .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
                .limitToLast(10).on('value', (snapshot) => {
                    setHistorico([]);

                    snapshot.forEach((childItem) => {
                        let list = {
                            key: childItem.key,
                            tipo: childItem.val().tipo,
                            valor: childItem.val().valor,
                            date: childItem.val().date
                        };

                        setHistorico(oldArray => [...oldArray, list].reverse());
                    });


                })
        }

        loadlist();
    }, []);

    function handleDelete(data) {

        const [diaItem, mesItem, anoItem] = data.date.split('/');
        const dataItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);

        const formatDiaHoje = format(new Date(), 'dd/mm/yyyy');
        const [diahoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
        const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diahoje}`)

        if (isBefore(dataItem, dateHoje)) {
            alert('Voce não pode excluir um registro antigo');
            return;
        }

        Alert.alert(
            'Cuidado Atenção!',
            `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleDeleteSuccess(data)
                }
            ]
        )
    }

    async function handleDeleteSuccess(data) {
        await firebase.database().ref('historico')
            .child(uid).child(data.key).remove()
            .then(async () => {
                let saldoAtual = saldo;
                data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

                await firebase.database().ref('users').child(uid)
                    .child('saldo').set(saldoAtual);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handleShowPicker(){

    }

    return (
        <Background>
            <Header />
            <Container>
                <Nome>
                    {user && user.nome}
                </Nome>
                <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
            </Container>

            <Area>
                <TouchableOpacity onPress={handleShowPicker}>
                    <Icon name='event' color="#FFF" size={30} />
                </TouchableOpacity>
                <Title>Ultimas movimentações</Title>
            </Area>




            <List
                contentContainerStyle={{ paddingBottom: 20, paddingRight: 10, paddingLeft: 10 }}
                style={{ height: '95%' }}
                showsVerticalScrollIndicator={false}
                data={historico}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete} />)}
            />
            {/* {
                show && (
                    <Picker 

                    />
                )
            } */}
        </Background>
    )
}