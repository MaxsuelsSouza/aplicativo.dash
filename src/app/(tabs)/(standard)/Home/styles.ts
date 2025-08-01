import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 80,
  },
  spacer24: {
    height: 24,
  },
  locationStatusWrapper: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 8,
    minHeight: 48,
    height: 48,
    gap: 8,
    zIndex: 3, // Maior que o SearchModal para ficar na frente
    position: 'relative',
  },
  searchBarContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 4,
  },
  pointsCounter: {
    marginLeft: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontFamily: "System",
    fontWeight: "900", // Espessura mais grossa
  },
  masonrySection: {
    marginTop: 16, // Reduzido de 24 para 16
    paddingHorizontal: 12,
    flex: 1,
  },
  masonryGrid: {
    paddingHorizontal: 0, // Removendo padding extra
    paddingTop: 16,
  },
  loadingMoreWrapper: {
    alignItems: "center",
    padding: 16,
  },
  loadingMoreText: {
    color: "#8B4513",
    fontFamily: "System",
    fontWeight: "900", // Espessura mais grossa
  },
  searchOverlay: {
    position: 'absolute',
    top: 130, // Mais próximo ao SearchBar para melhor efeito de "esconder atrás"
    left: 8,
    right: 8,
    backgroundColor: '#FFFAF0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD8C0',
    elevation: 2, // Menor elevação para ficar "atrás"
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    zIndex: 1, // Menor que o SearchBar para ficar atrás
    transformOrigin: 'top center', // Ponto de ancoragem no topo para a animação
  },
  searchContent: {
    minHeight: 200,
    padding: 16,
  },
  searchBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
});
