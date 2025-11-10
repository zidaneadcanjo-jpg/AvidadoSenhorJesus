async function carregarVideoDaSemana() {
    const res = await fetch("videos.json");
    const videos = await res.json();

    let melhor = null;
    let maiorScore = 0;

    videos.forEach(v => {
        const score = v.likes + v.comentarios + v.partilhas;
        if (score > maiorScore) {
            maiorScore = score;
            melhor = v;
        }
    });

    if (!melhor) return;

    document.getElementById("video-semana-box").innerHTML = `
        <div class="video-semana-card">
            <iframe 
                src="https://www.facebook.com/plugins/video.php?href=${melhor.link}" 
                frameborder="0" allowfullscreen></iframe>

            <h3>${melhor.titulo}</h3>
            <p>${melhor.descricao}</p>

            <div class="info-semana">
                <span>👍 ${melhor.likes.toLocaleString()}</span>
                <span>💬 ${melhor.comentarios.toLocaleString()}</span>
                <span>↗️ ${melhor.partilhas.toLocaleString()}</span>
            </div>
        </div>
    `;
}

carregarVideoDaSemana();
