const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка',
        sucsessMessage = 'Спасибо! Мы скоро с Вами свяжемся!',
        callForm = document.querySelector('.popup-call .capture-form'),
        discountForm = document.querySelector('.popup-discount .capture-form'),
        consultForm = document.querySelector('.popup-consultation .capture-form'),
        mainForm = document.querySelector('.main-form'),
        sectionForm = document.querySelector('.section-form .capture-form'),
        checkingForm = document.querySelector('.popup-check .capture-form'),
        forms = [callForm, discountForm, consultForm, mainForm, sectionForm, checkingForm];
    const bindingForm = (form) => {
        const statusMessage = document.createElement('div');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            const inputs = form.querySelectorAll('input');
            inputs.forEach(elem => elem.value = '');
            if (form === consultForm) {
                body['qst'] = document.querySelector('input[name="user_quest"]').value;
                document.querySelector('input[name="user_quest"]').value = '';
            }
            if (form === discountForm) {
                if (document.getElementById('inputLen').value !== '') {
                    body['diamFirst'] = document.querySelector('.first .diam').value;
                    body['countFirst'] = document.querySelector('.first .count').value;
                    if (document.querySelector('.second').style.display === 'block') {
                        body['diamSecond'] = document.querySelector('.second .diam').value;
                        body['countSecond'] = document.querySelector('.second .count').value;
                    }
                    if (document.querySelector('input[name="onoffswitch-two"]').hasAttribute('sas')) {
                        body['bottom'] = 'true';
                    } else {
                        body['bottom'] = 'false';
                    }
                    body['rasst'] = document.getElementById('inputLen').value;
                    body['sum'] = document.getElementById('calc-result').value;
                }
            }
            postData(body)
                .then((response) => {
                    if (response.status != 200) {
                        throw new Error('network status is not 200');
                    }
                    statusMessage.textContent = sucsessMessage;
                    setTimeout(() => form.removeChild(statusMessage), 10000)

                })
                .catch(error => {
                    console.error(error);
                    statusMessage.textContent = errorMessage;
                    setTimeout(() => form.removeChild(statusMessage), 10000)
                });
        });

        const postData = (body) => {
            return fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
        }
    }
    forms.forEach(elem => bindingForm(elem));
    const setReg = () => {
        forms.forEach(elem => {
            elem.querySelector('button[type="submit"]').setAttribute('disabled', 'true');
        })
        forms.forEach(elem => {
            elem.querySelector('input[name="user_phone"]').addEventListener('input', () => {
                if (elem.querySelector('input[name="user_phone"]').value.length < 5 || elem.querySelector('input[name="user_phone"]').value.length > 12) {
                    elem.querySelector('button[type="submit"]').setAttribute('disabled', 'true');
                    elem.querySelector('input[name="user_phone"]').style.border = '1px solid red';
                } else {
                    elem.querySelector('button[type="submit"]').removeAttribute('disabled')
                    elem.querySelector('input[name="user_phone"]').style.border = '1px solid gray';
                }
            })
        })
        const nameForms = document.querySelectorAll('[name="user_name"]');
        const telForms = document.querySelectorAll('[name="user_phone"]');
        const questForms = document.querySelectorAll('[name="user_quest"]');
        nameForms.forEach((elem) => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^А-яа-я ]/g, '');
            })
        });
        telForms.forEach((elem) => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^+0-9]/g, '');
            })
        });
        questForms.forEach((elem) => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^А-Яа-я.,:?()"! ]/g, '');
            })
        });
    }
    setReg();
}
export default sendForm;