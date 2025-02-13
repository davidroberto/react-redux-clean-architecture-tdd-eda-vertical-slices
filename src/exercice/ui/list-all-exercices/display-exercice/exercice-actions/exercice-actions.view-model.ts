import { deleteExerciceUseCase } from "@/src/exercice/features/delete-exercice/delete-exercice.use-case";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";

export const useExerciceActionsViewModel = (): {
  handleEdit: (exerciceId: string) => void;
  handleDelete: (exerciceId: string) => void;
} => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEdit = (exerciceId: string) => {
    router.push(`/exercices/update/${exerciceId}`);
  };

  const handleDelete = async (exerciceId: string) => {
    dispatch(deleteExerciceUseCase(exerciceId));
  };

  return { handleEdit, handleDelete };
};
