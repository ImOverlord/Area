import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topSafeAreaView: { flex: 0, backgroundColor: "black" },
  bottomSafeAreaView: { flex: 1, backgroundColor: "white" },
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
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
