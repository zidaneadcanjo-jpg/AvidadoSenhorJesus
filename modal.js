function openModal() {
    document.getElementById("storyModal").style.display = "block";
}

function closeModal() {
    document.getElementById("storyModal").style.display = "none";
}

window.onclick = function (event) {
    const modal = document.getElementById("storyModal");
    if (event.target === modal) {
        closeModal();
    }
};
