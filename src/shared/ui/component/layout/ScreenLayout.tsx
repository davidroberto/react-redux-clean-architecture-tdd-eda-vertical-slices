import Notifications from "@/src/notification/ui/component/Notifications";
import { View, StyleSheet } from "react-native";

const ScreenLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <Notifications />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
});
