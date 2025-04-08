export type Muscle = {
  id: string;
  title: string;
  //parent?: MuscleDto | null;
  children: Muscle[];
};
