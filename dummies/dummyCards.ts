// 홈 화면 카드들 더미데이터

export enum CardFeature {
  HITS,
  LIKES,
}
export interface dummyCardType {
  id: number;
  title: string;
  tags: string[];
  background: string;
  src: string;
  feature?: CardFeature;
}

export const dummyCards = [
  {
    id: 0,
    title: "상자 대탈출",
    tags: ["방탈출", "난이도상", "힌트없음"],
    background: "#5160AC",
    src: "https://images.unsplash.com/photo-1631641551473-fbe46919289d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
    feature: CardFeature.HITS,
  },
  {
    id: 1,
    title: "아이탈출",
    tags: ["상식퀴즈", "첫작품"],
    background: "#37204E",
    src: "https://images.unsplash.com/photo-1657905041924-ffa7ab898773?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
    feature: CardFeature.LIKES,
  },
  {
    id: 2,
    title: "연습게임2",
    tags: ["취미", "2시간만에만든게임"],
    background: "#AC7D51 ",
    src: "https://images.unsplash.com/photo-1658778176925-e0027cd4259a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8Ym84alFLVGFFMFl8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    title: "연습게임11",
    tags: ["방탈출", "난이도상", "힌트없음"],
    background: "#575A66",
    src: "https://images.unsplash.com/photo-1658841641300-74d68a03d56f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    title: "asdafdsa",
    tags: ["방탈출", "난이도상", "힌트없음"],
    background: "#739E50",
    src: "https://images.unsplash.com/photo-1658851874316-0c6666b7bf08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    title: "bbbbbb",
    tags: ["상식퀴즈", "첫작품"],
    background: "#CB9200",
    src: "https://images.unsplash.com/photo-1658847338849-fd76cee49bf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    title: "qqqqq",
    tags: ["취미", "2시간만에만든게임"],
    background: "#C62C17 ",
    src: "https://images.unsplash.com/photo-1658761059709-70ec538880dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 7,
    title: "what",
    tags: ["방탈출", "난이도상", "힌트없음"],
    background: "#E7BDAE",
    src: "https://images.unsplash.com/photo-1658732049821-0e5ce13224cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 8,
    title: "상자 대탈출",
    tags: ["방탈출", "난이도상", "힌트없음"],
    background: "#A43D50",
    src: "https://images.unsplash.com/photo-1658679684720-12041e151b90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDMzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 9,
    title: "아이탈출",
    tags: ["상식퀴즈", "첫작품"],
    background: "#574E60",
    src: "https://images.unsplash.com/photo-1658433433300-c558ffde0710?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ0fGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 10,
    title: "연습게임2",
    tags: ["취미", "2시간만에만든게임"],
    background: "#AC7D51",
    src: "https://images.unsplash.com/photo-1658276556630-932c9f30f28c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 11,
    title: "연습게임11",
    tags: ["방탈출", "난이도상", "힌트없음"],
    background: "#575A66",
    src: "https://images.unsplash.com/photo-1658494330378-4716bf247bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQzfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];
