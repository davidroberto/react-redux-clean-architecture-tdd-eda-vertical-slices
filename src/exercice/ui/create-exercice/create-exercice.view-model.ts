import {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {useRouter} from "expo-router";
import {useDispatch} from "react-redux";
import {createExerciceUseCase} from "@/src/exercice/features/create-exercice/create-exercice.use-case";

export const useCreateExerciceViewModel = (): {
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    image: string | null;
    setImage: (image: string | null) => void;
    youtubeVideoUrl: string;
    setYoutubeVideoUrl: (youtubeVideoUrl: string) => void;
    handleImagePick: () => void;
    handleSubmit: () => void;
} => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [youtubeVideoUrl, setYoutubeVideoUrl] = useState("");

    const handleImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            //setImage(result.uri);
        }
    };

    const router = useRouter();

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        dispatch(
            createExerciceUseCase({
                title,
                description,
                image,
                youtubeVideoUrl,
                primaryMuscles: [{id: "101"}],
                secondaryMuscles: [],
            }),
        );
        router.push("/exercices");
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        image,
        setImage,
        youtubeVideoUrl,
        setYoutubeVideoUrl,
        handleImagePick,
        handleSubmit,
    };
};
