const accordMenu = () => {
    let activePanel = document.querySelector('.questions .panel-default');
    const panelGroup = document.querySelector('.questions .panel-group');
    panelGroup.addEventListener('click', (event) => {
        let target = event.target;
        event.preventDefault()
        target = event.target.closest(".panel-default");
        target.querySelector('.panel-collapse').classList.toggle('in');
        activePanel.querySelector('.panel-collapse').classList.toggle('in');
        activePanel = target;
    })
}
export default accordMenu;