export type IChipTitles =
  | 'Frontend'
  | 'Backend'
  | 'Infra'
  | 'Design'
  | 'Planning'
  | 'Test';

export interface IChips {
  IChipTitles: {
    id: number;
    value: IChipTitles;
  };
}

export interface IServicesList {
  thumbnailImageUrl: string;
  title: string;
  description: string;

  content: string;
  videoContentUrl: string;
  imageContentUrl: string;

  chips: IChips;
  project: {
    githubUrl: string;
    demoUrl: string;
  };
}
