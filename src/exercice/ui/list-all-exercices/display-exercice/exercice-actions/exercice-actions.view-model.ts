import {deleteExerciceUseCase} from "@/src/exercice/features/delete-exercice/delete-exercice.use-case";
import {useRouter} from "expo-router";
import {useDispatch, useSelector} from "react-redux";

import {
    DeleteExerciceStatus, getDeleteExerciceStatus
} from "@/src/exercice/features/delete-exercice/delete-exercice.state.model";

export const useExerciceActionsViewModel = (): {
    handleEdit: (exerciceId: string) => void;
    handleDelete: (exerciceId: string) => void;
    exerciceDeleteStatus: DeleteExerciceStatus;
} => {
    const router = useRouter();
    const dispatch = useDispatch();
    const exerciceDeleteStatus = useSelector(getDeleteExerciceStatus);

    const handleEdit = (exerciceId: string) => {
        router.push(`/exercices/update/${exerciceId}`);
    };

    const handleDelete = async (exerciceId: string) => {
        dispatch(deleteExerciceUseCase(exerciceId));
    };

    return {
        handleEdit,
        handleDelete
    };
};
