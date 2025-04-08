import { MuscleRepositoryInterface } from "@/src/muscle/features/shared/muscle.repository.interface";
import { Muscle } from "@/src/muscle/features/shared/muscle.model.type";

export class MuscleRepositoryInMemory implements MuscleRepositoryInterface {
  private muscles: Muscle[] = [
    {
      id: "1",
      title: "Chest",
      children: [
        {
          id: "101",
          title: "Upper Chest",
          children: [],
        },
        {
          id: "102",
          title: "Middle Chest",
          children: [],
        },
        {
          id: "103",
          title: "Lower Chest",
          children: [],
        },
      ],
    },
    {
      id: "2",
      title: "Back",
      children: [
        {
          id: "201",
          title: "Traps",
          children: [],
        },
        {
          id: "202",
          title: "Lats",
          children: [],
        },
        {
          id: "203",
          title: "Rhomboids",
          children: [],
        },
      ],
    },
    {
      id: "3",
      title: "Legs",
      children: [
        {
          id: "301",
          title: "Quads",
          children: [],
        },
        {
          id: "302",
          title: "Hamstrings",
          children: [],
        },
        {
          id: "303",
          title: "Calves",
          children: [
            {
              id: "30301",
              title: "Soleus",
              children: [],
            },
            {
              id: "30302",
              title: "Gastrocnemius",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: "4",
      title: "Arms",
      children: [
        {
          id: "401",
          title: "Biceps",
          children: [],
        },
        {
          id: "402",
          title: "Triceps",
          children: [],
        },
      ],
    },
  ];

  async findAll(): Promise<MuscleDto[]> {
    return this.muscles.map((muscle) => ({
      ...muscle,
    }));
  }
}
