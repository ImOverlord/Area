import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    marginTop: 32,
    marginHorizontal: 32,
    marginBottom: 52,
    fontFamily: "Avenir",
    fontSize: 25,
    fontWeight: "700",
    fontStyle: "normal"
  },
  button: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginVertical: 32
  },
  buttonDisabled: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginVertical: 32
  },
  buttonText: {
    fontFamily: "Avenir",
    fontSize: 22,
    fontWeight: "900",
    fontStyle: "normal",
    color: "#ffffff"
  },
  input: {
    fontFamily: "Avenir",
    fontSize: 25,
    marginBottom: 32,
    height: 40,
    borderBottomWidth: 1,
    borderColor: "black",
    fontWeight: "900",
    marginHorizontal: 32
  }
});

export default styles;
