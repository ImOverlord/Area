import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topContainer: {
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bottomContainer: {
    padding: 24,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: "Avenir Next",
    fontSize: 42,
    fontWeight: "900"
  },
  email: {
    fontFamily: "Avenir Next",
    fontSize: 14,
    fontWeight: "700"
  },
  bottomButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#3d3d3d",
    borderRadius: 25
  },
  bottomButtonText: {
    fontFamily: "Avenir Next",
    fontSize: 18,
    fontWeight: "700",
    color: "white"
  },
  bsWrapper: {
    padding: 16,
    backgroundColor: "white",
    height: "100%"
  },
  topSafeAreaView: { flex: 0, backgroundColor: "white" },
  bottomSafeAreaView: { flex: 1, backgroundColor: "black" },
  scrollView: { flex: 1, backgroundColor: "white" }
});

export default styles;
