import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontFamily: "Avenir Next",
    fontSize: 42,
    fontWeight: "900"
  },
  email: {
    fontFamily: "Avenir Next",
    margin: 15,
    fontSize: 21,
    fontWeight: "700",
    alignSelf: "center"
  },
  safeAreaView: { flex: 1, backgroundColor: "white" },
  topContainer: {
    marginHorizontal: 32,
    borderBottomWidth: 3,
    borderBottomColor: "rgba(0,0,0,0.02)"
  },
  avatar: {
    height: 128,
    width: 128,
    borderRadius: 64,
    alignSelf: "center"
  },
  scrollViewWrapper: {
    marginHorizontal: 32,
    marginVertical: 16,
    height: "100%"
  },
  itemText: {
    fontFamily: "Avenir Next",
    fontSize: 24,
    fontWeight: "700"
  }
});

export default styles;
