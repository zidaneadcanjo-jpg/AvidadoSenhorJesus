// js/videos.js
const videos = [
  {
    id: 1,
    title: "A Armadura de Deus – Efésios 6",
    youtubeId: "dQw4w9WgXcQ", // COLOQUE O ID REAL DO YOUTUBE
    likes: 0,
    comments: [],
    date: "2025-11-10",
    verse: "Efésios 6:10-18"
  },
  {
    id: 2,
    title: "O Poder do Perdão",
    youtubeId: "abc123xyz",
    likes: 0,
    comments: [],
    date: "2025-11-08",
    verse: "Mateus 6:14-15"
  },
  {
    id: 3,
    title: "Jesus Caminha Sobre as Águas",
    youtubeId: "xyz789abc",
    likes: 0,
    comments: [],
    date: "2025-11-05",
    verse: "Mateus 14:22-33"
  },
  {
    id: 4,
    title: "A Fé que Move Montanhas",
    youtubeId: "mov123faith",
    likes: 0,
    comments: [],
    date: "2025-11-03",
    verse: "Mateus 17:20"
  }
];

// Carrega dados do localStorage
function loadVideoData() {
  const saved = localStorage.getItem('videoData');
  if (saved) {
    const parsed = JSON.parse(saved);
    videos.forEach((video, i) => {
      if (parsed[i]) {
        video.likes = parsed[i].likes || 0;
        video.comments = parsed[i].comments || [];
      }
    });
  }
}

// Salva no localStorage
function saveVideoData() {
  localStorage.setItem('videoData', JSON.stringify(videos));
}

// Calcula o vídeo com mais engajamento (likes + 2x comentários)
function getVideoDaSemana() {
  return videos.reduce((top, video) => {
    const scoreTop = (top.likes || 0) + (top.comments?.length || 0) * 2;
    const scoreAtual = video.likes + (video.comments?.length || 0) * 2;
    return scoreAtual > scoreTop ? video : top;
  }, videos[0]);
}

// Inicializa
loadVideoData();
