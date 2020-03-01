import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topContainer: {
<<<<<<< HEAD
    backgroundColor: "white",
=======
>>>>>>> edge
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
<<<<<<< HEAD
    fontFamily: "AvenirNext-Heavy",
    fontSize: 42
  },
  email: {
    fontFamily: "AvenirNext-Bold",
    fontSize: 14
=======
    fontFamily: "Avenir Next",
    fontSize: 42,
    fontWeight: "900"
  },
  email: {
    fontFamily: "Avenir Next",
    fontSize: 14,
    fontWeight: "700"
>>>>>>> edge
  },
  bottomButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#3d3d3d",
    borderRadius: 25
  },
  bottomButtonText: {
<<<<<<< HEAD
    fontFamily: "AvenirNext-Bold",
    fontSize: 18,
    color: "white"
  },
=======
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
>>>>>>> edge
  topSafeAreaView: { flex: 0, backgroundColor: "white" },
  bottomSafeAreaView: { flex: 1, backgroundColor: "black" },
  scrollView: { flex: 1, backgroundColor: "white" }
});

export default styles;
