import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topSafeAreaView: { flex: 0, backgroundColor: "black" },
  bottomSafeAreaView: { flex: 1, backgroundColor: "white" },
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
  body: {
    fontFamily: "Avenir Next",
    fontSize: 56,
    fontWeight: "700"
  },
  thisButtonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -56
  }
});

export default styles;
