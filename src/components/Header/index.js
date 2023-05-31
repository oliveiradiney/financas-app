import React from 'react';
import { View } from 'react-native';

import Icon from '@expo/vector-icons/Feather';

export default function Header() {
 return (
   <Container>
        <ButtonMenu>
            <Icon name='menu' color="#FFF" size={30}/>
        </ButtonMenu> 
   </Container>
  );
}