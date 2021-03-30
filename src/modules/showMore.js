const showMore = () => {
    const btn = document.querySelector('.add-sentence-btn'),
        hidden = document.querySelectorAll('.hidden');
    btn.addEventListener('click', () => {
        btn.style.display = 'none';
        hidden.forEach((elem) => {
            elem.classList.toggle('hidden');
        })
    })
}

export default showMore;