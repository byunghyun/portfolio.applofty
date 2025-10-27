export const chips = {
  Frontend: {
    id: 0,
    value: 'Frontend',
  },
  Backend: {
    id: 1,
    value: 'Backend',
  },
  Infra: {
    id: 2,
    value: 'Infra',
  },
  Design: {
    id: 3,
    value: 'Design',
  },
  Planning: {
    id: 4,
    value: 'Planning',
  },
  Test: {
    id: 5,
    value: 'Test',
  },
};

export const servicesList = [
  {
    // About Thumbnail
    thumbnailImageUrl: '/assets/images/bg-gradient.webp',
    title: 'Kia PASS Web - Driver Monitoring Dashboard',
    description:
      '3D 시각화 기반 실시간 운전자 모니터링 대시보드(MAU·성능 지표 개선 중심)',

    // Detail Content
    groupName: ['Automotive', 'Safety'],
    summary: 'LCP 60% 개선, 오류율 82% 감소, 3D/R3F로 상태 인지 속도 향상',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-06-30'),
    contribution: {
      totalPercent: 75,
      description: [
        'UI/UX & 핵심 화면 설계/구현(알람 타임라인, 3D 상태 패널)',
        'R3F/drei 적용 및 성능 최적화(Instancing, GLTF 압축, Suspense 프리로드)',
        '상태 관리 구조 분리(TanStack Query 서버상태 · Zustand UI상태)',
        'CI/CD 파이프라인(ECR→ECS, CloudFront 캐싱 정책, 환경 분리)',
        '품질/분석: Sentry 이슈 트리아지, GA4 대시보드 설정',
      ],
    },
    workDetails: [
      `- 문제: 복잡한 실시간 텔레메트리로 가독성·반응성이 낮고 초기 로드가 느림`,
      `- 해결: 코드 스플리팅 + 이미지/모델 최적화 + 캐싱 정책 수립(SSR 제외, CSR 최적화)`,
      `- 3D: R3F/drei로 카메라 프리셋/컨트롤, 상태 기반 하이라이트, ContactShadows 간소화`,
      `- 성능: LCP 4.8s → 1.9s, 번들 1.2MB → 430KB(압축·트리셰이킹·dynamic import)`,
      `- DX: PR 미리보기, Conventional Commits, 린트·테스트 Git hooks 자동화`,
    ],
    techStack: {
      fe: [
        'React',
        'Vite',
        'TypeScript',
        'TanStack Query',
        'Zustand',
        'Tailwindcss',
        'shadcn/ui',
        'R3F',
        'drei',
      ],
      be: ['Spring Boot', 'R2DBC'],
      infra: [
        'AWS ECS/ECR',
        'CloudFront',
        'S3',
        'Route53',
        'CloudWatch',
        'Sentry',
        'GA4',
      ],
    },
    videoContentUrl: ['https://youtu.be/clEDzcu6ZEc?si=1KT5rFlZdnRe8mvv'],
    imageContentUrls: ['/assets/images/bg-gradient.webp'],
    chips: [chips['Frontend'], chips['Infra'], chips['Test']],
    project: {
      githubUrl: 'https://github.com/DeltaX-AI-Lab/spg-kiapass-frontend-react',
      demoUrl: 'https://demo.example.com/kiapass',
    },
  },
];
