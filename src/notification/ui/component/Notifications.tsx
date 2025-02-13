import {NotificationsViewModel} from "@/src/notification/ui/component/Notifications.view-model";
import {StyleSheet, Text, View} from "react-native";

const Notifications = () => {
    const {notifications, handleCloseNotification} = NotificationsViewModel();

    return (
        <View style={styles.container}>
            {notifications.map((notification, index) => (
                <View
                    style={[
                        styles.notificationContainer,
                        notification.type === "success" ? styles.success : styles.error,
                    ]}
                    key={index}
                >
                    <Text style={styles.text}>{notification.message}</Text>
                    <Text
                        style={styles.closeButton}
                        onPress={() => handleCloseNotification(notification.id)}
                    >
                        ×
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    notificationContainer: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ffffff55",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        flex: 1,
    },
    closeButton: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
    },
    success: {
        backgroundColor: "#28a745",
    },
    error: {
        backgroundColor: "#dc3545",
    },
});
