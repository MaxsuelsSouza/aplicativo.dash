import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerTela: {
    flex: 1,
    backgroundColor: "#fff", // Branco
    paddingTop: 130,
  },
  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#fff", // Branco
    zIndex: 5,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    // Branco
    zIndex: 10,
    paddingTop: 35,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  locationText: {
    color: "#8B4513", // Marrom escuro para contraste com bege
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFAF0", // Bege mais claro
    color: "#8B4513", // Marrom escuro
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD8C0", // Bege médio
    marginRight: 12,
  },
  pointsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 60,
  },
  pointsLabel: {
    color: "#8B4513", // Marrom escuro
    fontSize: 10,
    fontWeight: "500",
  },
  codeText: {
    color: "#8B4513", // Marrom escuro
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 100,
    paddingTop: 8,
  },
  column: {
    justifyContent: "space-between",
  },
  productCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    flex: 1,
    marginHorizontal: 4,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    color: "#fff",
    fontSize: 14,
  },
  productPrice: {
    color: "#a287ff",
    marginTop: 4,
  },
  infiniteScrollTitle: {
    color: "#8B4513", // Marrom escuro
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    textAlign: "left",
  },
  carouselContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  storeItem: {
    alignItems: "center",
    marginRight: 16,
  },
  storeImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 8,
    backgroundColor: "#EEE",
  },
  storeName: {
    maxWidth: 72,
    textAlign: "center",
    color: "#8B4513",
    fontSize: 12,
  },
});
