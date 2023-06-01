import styled from "styled-components/native";

export const Container = styled.View`
    margin-bottom: 5px;
    padding: 10px;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.40);

    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
`;

export const Tipo = styled.View`
    flex-direction: row;
`;

export const IconView = styled.View`
    flex-direction: row;
    background-color: ${props => props.tipo === 'despesa' ? '#c62c36' : '#049301'};
    padding-bottom: 4px;
    padding-top: 4px;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 7px;
    margin-bottom: 8px;
`;

export const TipoText = styled.Text`
    color: #FFF;
    font-size: 16px;
    font-style: italic;
`;

export const ValorText = styled.Text`
    color: #222;
    font-size: 22px;
    font-weight: bold;
`;