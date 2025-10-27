export interface Chip {
  id: number;
  value: string;
}

export interface Service {
  thumbnailImageUrl: string;
  title: string;
  description: string;
  groupName: string[];
  summary: string;
  startDate: Date;
  endDate: Date;
  contribution: {
    totalPercent: number;
    description: string[];
  };
  workDetails: string[];
  techStack: {
    fe: string[];
    be: string[];
    infra: string[];
  };
  videoContentUrl: string[];
  imageContentUrls: string[];
  chips: Chip[];
  project: {
    githubUrl: string;
    demoUrl: string;
  };
}

export interface ServiceCardProps {
  service: Service;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onClose: () => void;
}
