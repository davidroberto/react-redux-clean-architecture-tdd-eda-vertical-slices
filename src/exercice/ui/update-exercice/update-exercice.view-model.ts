import {useEffect, useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {getExerciceByIdUseCase} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.usecase";
import {updateExerciceUseCase} from "@/src/exercice/features/update-exercice/update-exercice.usecase";
import {
    getExerciceByIdData, getExerciceByIdStatus
} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.state.model";

export const useUpdateExerciceViewModel = (): {
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
    exerciceByIdStatus: string;
} => {
    const {id} = useLocalSearchParams();
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [youtubeVideoUrl, setYoutubeVideoUrl] = useState("");

    useEffect(() => {
        dispatch(getExerciceByIdUseCase(id));
    }, [id]);

    const exercice = useSelector(getExerciceByIdData);

    useEffect(() => {
        if (exercice) {
            setTitle(exercice.title);
            setDescription(exercice.description);
            setImage(exercice.image);
            setYoutubeVideoUrl(exercice.youtubeVideoUrl);
        }

    }, [exercice]);

    const handleImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // setImage(result.uri);
        }
    };

    const router = useRouter();

    const handleSubmit = async () => {
        dispatch(updateExerciceUseCase(id, {
            title,
            description,
            image,
            youtubeVideoUrl,
        }));

        router.push("exercices");
    };

    const exerciceByIdStatus = useSelector(getExerciceByIdStatus);

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
        exerciceByIdStatus
    };
};
