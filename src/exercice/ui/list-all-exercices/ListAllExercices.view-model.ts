import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useRouter} from "expo-router";
import {RootState} from "@/src/shared/application/root.store";
import {Exercice, ExercicesSortedByMuscle,} from "@/src/exercice/features/shared/exercice.model.type";
import {listExercicesUseCase} from "@/src/exercice/features/list-exercices/list-exercices.use-case";
import {ExerciceSortEnum} from "@/src/exercice/features/list-exercices/list-exercices-sort.enum";

export const uselistAllExercices = (): {
    exercices: Exercice[] | ExercicesSortedByMuscle[];
    isLoading: boolean;
    navigateToCreateExercice: () => void;
} => {
    const dispatch = useDispatch();
    const exercices = useSelector(
        (state: RootState) => state.exercices.list.exercices,
    );
    const isLoading = useSelector(
        (state: RootState) => state.exercices.list.isLoading,
    );

    useEffect(() => {
        //todo : fix type
        dispatch(listExercicesUseCase(ExerciceSortEnum.MUSCLE_GROUP));
    }, [dispatch]);

    const router = useRouter();
    const navigateToCreateExercice = () => {
        router.push("exercices/create-exercice");
    };

    return {exercices, isLoading, navigateToCreateExercice};
};
