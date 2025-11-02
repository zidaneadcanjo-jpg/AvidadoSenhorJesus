// DADOS DOS VÍDEOS
const videos = [
    {
        id: 1,
        title: "O versículo que os demônios não querem que você saiba",
        description: "Efésios 6:10-12 - Revesti-vos da armadura de Deus",
        likes: 1200,
        comments: 356,
        embed: 'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/reel/2216784141828906&autoplay=1&muted=1&width=500'
    },
    {
        id: 2, 
        title: "O Poder da Oração",
        description: "Como conversar com Deus no seu dia a dia",
        likes: 2400,
        comments: 891,
        embed: 'https://www.youtube.com/embed/7JJ3C8kLrz0?autoplay=1&mute=1'
    },
    {
        id: 3,
        title: "A Paz que Excede Todo Entendimento",
        description: "Filipenses 4:6-7 - Não andeis ansiosos",
        likes: 1800,
        comments: 542,
        embed: 'https://www.youtube.com/embed/6g3Vf1Xqq3o?autoplay=1&mute=1'
    }
];

let currentVideo = 1;
const totalVideos = videos.length;
let progressInterval;

function updateVideoIndicator() {
    document.getElementById('videoIndicator').textContent = `${currentVideo}/${totalVideos}`;
}

function showVideo(videoId) {
    if (progressInterval) {
        clearInterval(progressInterval);
    }
    
    document.querySelectorAll('.video-item').forEach(video => {
        video.classList.remove('active');
    });
    
    const currentVideoElement = document.querySelector(`[data-id="${videoId}"]`);
    if (currentVideoElement) {
        currentVideoElement.classList.add('active');
        
        const progressBar = document.getElementById(`progress${videoId}`);
        if (progressBar) {
            progressBar.style.width = '0%';
            startProgressBar(videoId);
        }
    }
    
    currentVideo = videoId;
    updateVideoIndicator();
    updateFeaturedVideo();
}

function startProgressBar(videoId) {
    const progressBar = document.getElementById(`progress${videoId}`);
    let width = 0;
    
    progressInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressInterval);
            if (currentVideo < totalVideos) {
                nextVideo();
            }
        } else {
            width += 0.5;
            progressBar.style.width = width + '%';
        }
    }, 100);
}

function nextVideo() {
    if (currentVideo < totalVideos) {
        showVideo(currentVideo + 1);
    } else {
        showVideo(1);
    }
}

function prevVideo() {
    if (currentVideo > 1) {
        showVideo(currentVideo - 1);
    } else {
        showVideo(totalVideos);
    }
}

function likeVideo(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (video) {
        video.likes++;
        document.getElementById(`likes${videoId}`).textContent = formatCount(video.likes);
        
        const likeBtn = document.querySelector(`[onclick="likeVideo(${videoId})"]`);
        likeBtn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            likeBtn.style.transform = 'scale(1)';
        }, 300);
    }
}

function commentVideo(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (video) {
        alert(`💬 Comentários do vídeo: "${video.title}"\n\nEm breve você poderá ver e adicionar comentários!`);
    }
}

function shareVideo(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (video) {
        if (navigator.share) {
            navigator.share({
                title: video.title,
                text: video.description,
                url: window.location.href + `?video=${videoId}`
            });
        } else {
            alert(`📤 Partilhe este vídeo abençoado!\n\n"${video.title}"\n\nCom seus amigos e familiares!`);
        }
    }
}

function formatCount(count) {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    }
    return count;
}

function updateFeaturedVideo() {
    const mostLiked = videos.reduce((prev, current) => 
        (prev.likes > current.likes) ? prev : current
    );
    localStorage.setItem('featuredVideo', JSON.stringify(mostLiked));
}

// CONTROLE POR SWIPE
let startY = 0;
let isSwiping = false;

document.getElementById('videoFeed').addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
    isSwiping = true;
});

document.getElementById('videoFeed').addEventListener('touchmove', e => {
    if (!isSwiping) return;
    e.preventDefault();
});

document.getElementById('videoFeed').addEventListener('touchend', e => {
    if (!isSwiping) return;
    
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextVideo();
        } else {
            prevVideo();
        }
    }
    
    isSwiping = false;
});

// Controle por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === ' ') {
        nextVideo();
    } else if (e.key === 'ArrowUp') {
        prevVideo();
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    showVideo(1);
    
    const urlParams = new URLSearchParams(window.location.search);
    const videoParam = urlParams.get('video');
    if (videoParam && videoParam >= 1 && videoParam <= totalVideos) {
        showVideo(parseInt(videoParam));
    }
});
