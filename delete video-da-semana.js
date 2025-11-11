const link = encodeURIComponent("https://www.facebook.com/share/r/1W9Sunt19E/");

document.getElementById("video-semana-box").innerHTML = `
<iframe
    src="https://www.facebook.com/plugins/video.php?href=${link}&show_text=false&width=500"
    style="width:100%;height:320px;border:none;overflow:hidden;background:#000"
    scrolling="no"
    frameborder="0"
    allowfullscreen="true"
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
</iframe>
`;
