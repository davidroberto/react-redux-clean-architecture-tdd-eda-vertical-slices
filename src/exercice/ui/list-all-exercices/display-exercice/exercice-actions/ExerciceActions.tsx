import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {
    useExerciceActionsViewModel
} from "@/src/exercice/ui/list-all-exercices/display-exercice/exercice-actions/exercice-actions.view-model";

type ExerciceActionsProps = {
    exerciceId: string;
};

const ExerciceActions: React.FC<ExerciceActionsProps> = ({exerciceId}) => {
    const {handleEdit, handleDelete} = useExerciceActionsViewModel();

    return (
        <View style={styles.rightActions}>
            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEdit(exerciceId)}
            >
                <Ionicons name="pencil" size={12} color="white"/>
                <Text style={styles.actionText}>Modifier </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDelete(exerciceId)}
            >
                <Ionicons name="trash" size={15} color="white"/>
                <Text style={styles.actionText}>Supprimer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    rightActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#ff3b30",
        borderRadius: 10,
        marginBottom: 10,
    },
    actionButton: {
        width: 75,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    actionText: {
        color: "white",
        fontSize: 12,
        marginTop: 5,
    },
});

export default ExerciceActions;
