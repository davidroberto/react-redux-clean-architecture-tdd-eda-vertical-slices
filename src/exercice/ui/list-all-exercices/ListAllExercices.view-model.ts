import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useRouter} from "expo-router";
import {Exercice, ExercicesSortedByMuscle,} from "@/src/exercice/features/shared/exercice.model.type";
import {listExercicesUseCase} from "@/src/exercice/features/list-exercices/list-exercices.use-case";
import {ExerciceSortEnum} from "@/src/exercice/features/list-exercices/list-exercices-sort.enum";
import {
    getExercicesList, getExercicesListLoading
} from "@/src/exercice/features/list-exercices/list-exercices.selectors";

export const uselistAllExercices = (): {
    exercices: Exercice[] | ExercicesSortedByMuscle[];
    isLoading: boolean;
    navigateToCreateExercice: () => void;
} => {
    const dispatch = useDispatch();
    const exercices = useSelector(getExercicesList);
    const isLoading = useSelector(getExercicesListLoading);

    useEffect(() => {
        //todo : fix type
        dispatch(listExercicesUseCase(ExerciceSortEnum.MUSCLE_GROUP));
    }, [dispatch]);

    const router = useRouter();
    const navigateToCreateExercice = () => {
        router.push("exercices/create-exercice");
    };

    return {
        exercices,
        isLoading,
        navigateToCreateExercice
    };
};
