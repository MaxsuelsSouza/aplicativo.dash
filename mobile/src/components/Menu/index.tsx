import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter, usePathname } from 'expo-router';
import {
  ContainerMenu,
  BotaoMenu,
  ItemMenu,
  RotuloMenu,
  IconeMenu,
} from './styles';
import { emitirExibicaoCabecalhoHome } from '@/utils/homeHeaderEvents';

const opcoesMenu = [
  { name: 'Home', icon: 'home', path: '/Home' },
  { name: 'Finanças', icon: 'safe', path: '/Financas' },
  { name: 'Crédito', icon: 'cash-multiple', path: '/Credito' },
  { name: 'Notícias', icon: 'newspaper', path: '/Noticias' },
  { name: 'Conta', icon: 'account-circle', path: '/Conta' },
];

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();

  const aoPressionar = (item: (typeof opcoesMenu)[number]) => {
    if (pathname === item.path) {
      if (item.path === '/Home') {
        emitirExibicaoCabecalhoHome();
      }
      return;
    }
    router.push(item.path as any);
  };

  return (
    <ContainerMenu>
      {opcoesMenu.map(item => (
        <BotaoMenu key={item.name} onPress={() => aoPressionar(item)}>
          <ItemMenu>
            <IconeMenu
              as={Icon}
              name={item.icon}
              size={28}
              color={pathname === item.path ? '#A287FF' : '#868686'}
            />
            <RotuloMenu ativo={pathname === item.path}>{item.name}</RotuloMenu>
          </ItemMenu>
        </BotaoMenu>
      ))}
    </ContainerMenu>
  );
}
