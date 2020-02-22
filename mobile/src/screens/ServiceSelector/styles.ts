import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: "black" },
  header: {
    backgroundColor: "black",
    height: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    backgroundColor: "white",
    height: "85%",
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitle: {
    color: "white",
    fontFamily: "Avenir Next",
    fontSize: 26,
    fontWeight: "700"
  },
  headerSubTitle: {
    color: "white",
    fontFamily: "Avenir Next",
    fontSize: 16,
    fontWeight: "500"
  },
  searchBar: {
    marginTop: 22,
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: "10%",
    width: "80%",
    alignItems: "center"
  },
  searchBarText: {
    fontFamily: "Avenir Next",
    padding: 12,
    fontWeight: "600",
    width: "100%"
  }
});

export default styles;
