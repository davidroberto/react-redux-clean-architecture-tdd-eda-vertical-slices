import React from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {uselistAllExercices} from "@/src/exercice/ui/list-all-exercices/ListAllExercices.view-model";
import DisplayExercice from "@/src/exercice/ui/list-all-exercices/display-exercice/DisplayExercice";
import {ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.state";
import {ListExercicesStatus} from "@/src/exercice/features/list-exercices/list-exercices.state.model";

export default function ListAllExercices() {
    const {
        exercices,
        listExercicesStatus,
        navigateToCreateExercice
    } = uselistAllExercices();

    if (listExercicesStatus === ListExercicesStatus.LOADING) {
        return <Text>Loading...</Text>;
    }

    const renderMuscle = (muscle: ExercicesSortedByMuscle) => (<View key={muscle.id} style={styles.muscleContainer}>
        <Text style={styles.muscleTitle}>{muscle.title}</Text>
        {muscle.exercises && muscle.exercises.length > 0 && (<FlatList
            data={muscle.exercises}
            renderItem={({item}) => <DisplayExercice item={item}/>}
            keyExtractor={(item) => item.id}
        />)}
        {muscle.children && muscle.children.length > 0 && (<View style={styles.subMuscleContainer}>
            {muscle.children.map((subMuscle) => renderMuscle(subMuscle))}
        </View>)}
    </View>);

    return (<View style={styles.container}>
        <Text style={styles.headerText}>Les exercices</Text>
        <FlatList
            data={exercices}
            renderItem={({item}) => renderMuscle(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
        />
        <TouchableOpacity
            style={styles.roundButton}
            onPress={navigateToCreateExercice}
        >
            <Ionicons name="add" size={30} color="white"/>
        </TouchableOpacity>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        color: "#fff",
        marginBottom: 20,
        alignSelf: "center",
    },
    listContentContainer: {
        paddingBottom: 100,
    },
    muscleContainer: {
        marginBottom: 20,
    },
    muscleTitle: {
        fontSize: 20,
        color: "#ffd33d",
        marginBottom: 10,
    },
    subMuscleContainer: {
        paddingLeft: 20,
    },
    roundButton: {
        width: 60,
        height: 60,
        backgroundColor: "#ffd33d",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 30,
        right: 30,
    },
});
