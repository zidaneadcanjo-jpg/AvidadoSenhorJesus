fetch("videos.json")
    .then(res => res.json())
    .then(videos => {
        const container = document.querySelector(".reels-container");

        videos.forEach(v => {
            const reel = document.createElement("div");
            reel.classList.add("reel");

            reel.innerHTML = `
                <div class="video-box">
                    <iframe src="https://www.facebook.com/plugins/video.php?href=${v.link}" frameborder="0" allowfullscreen></iframe>
                </div>

                <div class="side-actions">
                    <div class="action"><span class="icon">👍</span><p>${v.likes}</p></div>
                    <div class="action"><span class="icon">💬</span><p>${v.comments}</p></div>
                    <div class="action"><span class="icon">↗️</span><p>${v.shares}</p></div>
                </div>

                <div class="info">
                    <img src="https://static.thenounproject.com/png/363633-200.png">
                    <div>
                        <h3>${v.perfil}</h3>
                        <p>${v.descricao}</p>
                    </div>
                </div>
            `;

            container.appendChild(reel);
        });
    });
