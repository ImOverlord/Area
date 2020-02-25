import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: "black" },
  header: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24
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
  }
});

export default styles;
