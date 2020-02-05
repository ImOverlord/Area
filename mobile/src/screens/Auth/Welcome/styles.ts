import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontFamily: "Avenir Next",
    fontSize: 42,
    fontWeight: "900",
    marginLeft: 32
  },
  subtitle: {
    marginHorizontal: 32,
    fontFamily: "Avenir Next",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 40,
    marginTop: 12
  },
  subtitle2: {
    width: "100%",
    fontFamily: "Avenir Next",
    fontSize: 22,
    fontWeight: "700",
    fontStyle: "normal",
    textAlign: "center"
  },
  button: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "#d24a3b",
    justifyContent: "center",
    alignItems: "center"
  },
  emailButton: {
    backgroundColor: "#000000"
  },
  buttonText: {
    fontFamily: "Avenir Next",
    fontSize: 22,
    fontWeight: "700",
    fontStyle: "normal",
    color: "#ffffff"
  }
});

export default styles;
