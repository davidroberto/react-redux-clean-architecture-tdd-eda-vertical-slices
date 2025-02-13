import {Swipeable} from "react-native-gesture-handler";
import {Image, StyleSheet, Text, View} from "react-native";
import ExerciceActions from "@/src/exercice/ui/list-all-exercices/display-exercice/exercice-actions/ExerciceActions";
import {Exercice} from "@/src/exercice/features/shared/exercice.model.type";

type DisplayExerciceProps = {
    item: Exercice;
};

const DisplayExercice: React.FC<DisplayExerciceProps> = ({
                                                             item: exercice,
                                                         }) => {
    return (
        <Swipeable
            key={exercice.id}
            renderRightActions={() => <ExerciceActions exerciceId={exercice.id}/>}
            containerStyle={styles.swipeableContainer}
        >
            <View style={styles.exerciceItem}>
                {exercice.image ? (
                    <Image source={{uri: exercice.image}} style={styles.image}/>
                ) : (
                    <View style={styles.imagePlaceholder}/>
                )}
                <Text style={styles.exerciceText}>{exercice.title}</Text>
            </View>
        </Swipeable>
    );
};

export default DisplayExercice;

const styles = StyleSheet.create({
    swipeableContainer: {
        flex: 1,
    },
    exerciceItem: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 5,
        backgroundColor: "#444",
        padding: 5,
        borderRadius: 5,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    imagePlaceholder: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#cccccc",
        marginRight: 10,
    },
    exerciceText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "left",
        flex: 1,
    },
});
