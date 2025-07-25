import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1F28",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  addButton: {
    padding: 4,
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#23242a",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    width: "100%",
  },
  storeName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  storeAddress: {
    color: "#ddd",
    marginTop: 4,
  },
});
