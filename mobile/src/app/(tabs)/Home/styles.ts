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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  titleText: {
    color: "#8B4513",
    fontSize: 18,
    fontWeight: "900", // Espessura mais grossa
    fontFamily: "System",
  },
  seeMoreText: {
    color: "#8B4513",
    fontSize: 15,
    fontWeight: "900", // Espessura mais grossa
    opacity: 0.7,
    fontFamily: "System",
  },
  sectionTitleWrapper: {
    paddingHorizontal: 12,
  },
  titleTextWithMargin: {
    color: "#8B4513",
    fontSize: 18,
    fontWeight: "900", // Espessura mais grossa
    marginBottom: 8,
    marginTop: 16,
    fontFamily: "System",
  },
  masonrySection: {
    marginTop: 24,
    paddingHorizontal: 12,
    flex: 1,
  },
  titleTextWithMarginBottom: {
    color: "#8B4513",
    fontSize: 18,
    fontWeight: "900", // Espessura mais grossa
    marginBottom: 12,
    fontFamily: "System",
  },
  masonryGrid: {
    paddingHorizontal: 11,
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
});
