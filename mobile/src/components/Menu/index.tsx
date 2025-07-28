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
  { name: 'Início', icon: 'home', path: '/Home/page' },
  { name: 'Pedido', icon: 'receipt', path: '/Pedido' },
  { name: 'Perfil', icon: 'account-circle', path: '/Conta' },
];

export default function Menu() {
  const router = useRouter();
  const pathname = usePathname();

  const aoPressionar = (item: (typeof opcoesMenu)[number]) => {
    if (pathname === item.path) {
      if (item.path === '/Home/page') {
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
              color={pathname === item.path ? '#FFD700' : '#8B4513'}
            />
            <RotuloMenu ativo={pathname === item.path}>{item.name}</RotuloMenu>
          </ItemMenu>
        </BotaoMenu>
      ))}
    </ContainerMenu>
  );
}
