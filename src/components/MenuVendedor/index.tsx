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

const opcoesMenu = [
  { name: 'Dashboard', icon: 'view-dashboard', path: '/(vendedor)/Dashboard' },
  { name: 'Loja', icon: 'storefront', path: '/(vendedor)/Loja' },
  { name: 'Produtos', icon: 'cube-outline', path: '/(vendedor)/Produtos' },
  { name: 'Perfil', icon: 'account-circle', path: '/(vendedor)/Perfil' },
];

export default function MenuVendedor() {
  const router = useRouter();
  const pathname = usePathname();

  const aoPressionar = (item: (typeof opcoesMenu)[number]) => {
    if (pathname === item.path) return;
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
