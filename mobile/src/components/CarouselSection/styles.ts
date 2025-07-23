import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 4,
  },
  title: {
    color: "#8B4513", // Marrom escuro
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  carousel: {
    paddingVertical: 4,
  },
  // Primeiro carrossel (pequeno)
  carouselContainer: {
    width: 110,
    marginRight: 8,
  },
  carouselCard: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff", // Branco
    marginBottom: 8,
    aspectRatio: 1,
  },
  carouselImage: {
    width: "100%",
    backgroundColor: "#fff", // Branco
    resizeMode: "cover",
  },
  carouselTitle: {
    color: "#8B4513", // Marrom escuro
    fontSize: 14,
    textAlign: "left",
  },
  // Segundo carrossel (grande)
  secondCarouselContainer: {
    width: 320,
    marginRight: 4,
  },
  secondCarouselCard: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#DDD8C0", // Bege médio
    marginBottom: 8,
    aspectRatio: 18 / 9,
  },
  secondCarouselImage: {
    backgroundColor: "#fff", // Branco
    height: "100%",
    resizeMode: "cover",
  },
  secondCarouselTitle: {
    color: "#8B4513", // Marrom escuro
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
  },
  // Dots indicator
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FFD700", // Amarelo dourado
  },
  inactiveDot: {
    backgroundColor: "#DDD8C0", // Bege médio
  },
});
