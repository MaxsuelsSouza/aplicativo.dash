import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 4,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 0,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    color: "#8B4513", // Marrom escuro
    fontSize: 16,
    fontWeight: "bold",
  },
  seeMoreButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#FFD700", // Amarelo dourado
    borderRadius: 12,
    marginRight: 0,
  },
  seeMoreText: {
    color: "#8B4513", // Marrom escuro
    fontSize: 12,
    fontWeight: "600",
  },
  carousel: {
    paddingVertical: 4,
  },
  circularCarousel: {
    alignItems: "flex-start",
    paddingLeft: 3,
  },
  circularContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  circularCard: {
    width: 80,
    height: 80,
    borderRadius: 40, // Círculo perfeito
    overflow: "hidden",
    backgroundColor: "#DDD8C0", // Bege médio
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#C0B08A", // Bege mais escuro/neutro
  },
  circularImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  circularTitle: {
    color: "#8B4513", // Marrom escuro
    fontSize: 12,
    textAlign: "center",
    maxWidth: 80,
  },
});
