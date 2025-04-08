import {useUpdateExerciceViewModel} from "@/src/exercice/ui/update-exercice/update-exercice.view-model";
import {Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";

export default function UpdateExercice() {
    const {
        title,
        setTitle,
        description,
        setDescription,
        image,
        youtubeVideoUrl,
        setYoutubeVideoUrl,
        handleImagePick,
        handleSubmit,
        exerciceByIdStatus
    } = useUpdateExerciceViewModel();

    if (exerciceByIdStatus === "loading") {
        return (<View style={styles.container}>
            <Text style={styles.header}>Chargement...</Text>
        </View>);
    }

    return (<View style={styles.container}>
        <Text style={styles.header}>Modifier l'exercice</Text>

        <TextInput
            style={styles.input}
            placeholder="Titre"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
        />

        <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            multiline
        />

        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
            <Text style={styles.imageButtonText}>
                {image ? "Changer l'image" : "Ajouter une image"}
            </Text>
        </TouchableOpacity>
        {image && <Image source={{uri: image}} style={styles.imagePreview}/>}

        <TextInput
            style={styles.input}
            placeholder="URL de la vidéo YouTube"
            placeholderTextColor="#888"
            value={youtubeVideoUrl}
            onChangeText={setYoutubeVideoUrl}
        />

        <Button
            title="Modifier l'exercice"
            onPress={handleSubmit}
            color="#ffd33d"
        />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        padding: 20,
    },
    header: {
        fontSize: 24,
        color: "#fff",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#333",
        color: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    textArea: {
        height: 80,
    },
    imageButton: {
        backgroundColor: "#ffd33d",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    imageButtonText: {
        color: "#25292e",
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginVertical: 10,
        alignSelf: "center",
    },
});
