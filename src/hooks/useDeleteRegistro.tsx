import { useCallback } from 'react';
import { Alert } from 'react-native';
import { Registro, deleteRecorrente, deleteRegistro } from '@/app/registros';

export default function useDeleteRegistro(onDeleted?: () => void) {
  return useCallback(
    (registro: Registro): Promise<boolean> => {
      return new Promise(resolve => {
        Alert.alert('Excluir', 'Deseja excluir este lan\u00e7amento?', [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: 'OK',
            onPress: async () => {
              if (registro.id_pai !== null) await deleteRecorrente(registro.id);
              else await deleteRegistro(registro.id);
              onDeleted?.();
              resolve(true);
            },
          },
        ]);
      });
    },
    [onDeleted]
  );
}
