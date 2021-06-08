/* так как вкладки делал с помощью :target и по умолчанию его не выставить,
	сразу делаю редирект на нужную*/
location="/#tab-2"

const form = document.forms['card-data']

// переменные для валидации
let cardNumber = null
let numberValid = false
let nameValid = false
let cvcValid = false

// функция для кнопки "отправить"
const sendForm = () => {

	if (numberValid && cvcValid && nameValid) {
		alert(
			`
			card number: ${cardNumber}
			name: ${form.name.value.replace(/\s\s+/g, ' ')}
			cvc: ${form.cvc.value}
			date: ${selectDayValue.textContent} ${selectMonthValue.textContent}
			`
		)
	} else {
		alert(
			"заполните форму"
		)
	}
}

// функция, ограничивающая количество вводимых символов
const cutValue = (input, maxLength) => {

	if (input.value.length > maxLength) {
		input.value = input.value.substring(0, maxLength)
	}
}

// валидация номера карты
form.number.forEach((item, index) => {
	item.oninput = () => {
		cutValue(item, 4)

	// подсвечиваю, если введены не только цифры
	if (!/^[ 0-9]+$/.test(item.value) && item.value.length !== 0) {
		item.classList.add('invalid')
	} else {

			if (item.classList.contains('invalid')) {
				item.classList.remove('invalid');
			}
	}

	/* перевод фокуса на следущее поле, при правильном заполнении,
	при неправильном заполнении, следущее поле блокируется */
		if (item.value.length === 4 && /^[ 0-9]+$/.test(item.value) && index < 3) {

			if (form.number[index + 1].hasAttribute("readonly", "readonly")){
				form.number[index + 1].removeAttribute("readonly", "readonly")
			}
				form.number[index + 1].focus()

		} else if (index < 3) {
			form.number[index+1].setAttribute("readonly", "readonly")
		}

		// номер карты, собранный из 4х инпутов
		cardNumber = Array.from(form.number).map(item=> item.value).join('');

		// валидация
		/^[ 0-9]+$/.test(cardNumber) && cardNumber.length === 16 ? numberValid = true : numberValid = false
	}

		/* перевод фокуса на предыдущее поле, при нажатии backspase, 
		если актуальное поле пустое */
		item.onkeydown = (e) => {
			if (e.keyCode === 8) {

				if (item.value.length === 0 && index !== 0) {
					form.number[index - 1].focus()
				}
			}
		}

	// подсвечиваю поле при потере фокуса, если кол-во меньше нужного
	item.onblur = () => {
		if ( item.value.length > 0 && item.value.length < 4) {
			item.classList.add('invalid')
		} 
	}

	// убираю подсветку при фокусе, если нет запрещённых символов
	item.onfocus = () => {
		if (/^[ 0-9]+$/.test(item.value)) {

			if (item.classList.contains('invalid')) {
				item.classList.remove('invalid');
			}
		}

		// если поле не пустое, то убираю блокировку
		if (item.value.length !==0 && item.hasAttribute("readonly", "readonly")){
			item.removeAttribute("readonly", "readonly")
		} 
	}
})

// валидация имени
form.name.oninput = () => {
	// подсвечиваю, если введены не только латинские буквы
	if (!/^[a-zA-Z\s]+$/.test(form.name.value) && form.name.value.length !== 0) {
		form.name.classList.add('invalid')
	} else {

			if (form.name.classList.contains('invalid')) {
				form.name.classList.remove('invalid');
			}
	}

// валидация
	/^[a-zA-Z\s]+$/.test(form.name.value) && form.name.value.length > 3 ? nameValid = true : nameValid = false
}

form.name.onblur = () => {
	// при потере фокуса с пустого поля вешаю плейсхолдер
	if ( form.name.value.length === 0 ){

		if (!form.name.hasAttribute("placeholder", "Иванов Иван Иванович")){
			form.name.setAttribute("placeholder", "Иванов Иван Иванович")
		}
	}
	
	// подсвечиваю поле при потере фокуса, если кол-во меньше нужного
	if ( form.name.value.length > 0 && form.name.value.length < 4) {
		form.name.classList.add('invalid')
	} 
}

form.name.onfocus = () => {
	// убираю плейсхолдер при фокусе
	form.name.removeAttribute("placeholder", "placeholder")

	// убираю подсветку при фокусе, если нет запрещённых символов
	if (/^[ 0-9]+$/.test(form.name.value)) {

		if (form.name.classList.contains('invalid')) {
			form.name.classList.remove('invalid');
		}
	}
}

// валидация cvc
form.cvc.oninput = () => {
	cutValue(form.cvc, 3)
	
	// подсвечиваю, если введены не только цифры
	if (!/^[ 0-9]+$/.test(form.cvc.value) && form.cvc.value.length !== 0) {
		form.cvc.classList.add('invalid')
	} else {

			if (form.cvc.classList.contains('invalid')) {
				form.cvc.classList.remove('invalid');
			}
	}

	// валидация
	/^[ 0-9]+$/.test(form.cvc.value) && form.cvc.value.length === 3 ? cvcValid = true : cvcValid = false
}

// подсвечиваю поле при потере фокуса, если кол-во меньше нужного
form.cvc.onblur = () => {
if ( form.cvc.value.length > 0 && form.cvc.value.length < 3) {
	form.cvc.classList.add('invalid')
} 
}

// убираю подсветку при фокусе, если нет запрещённых символов
form.cvc.onfocus = () => {
if (/^[ 0-9]+$/.test(form.cvc.value)) {

	if (form.cvc.classList.contains('invalid')) {
		form.cvc.classList.remove('invalid');
	}
}
}

// выпадающие списки дней и месяцев
const daysList = document.getElementsByClassName('card-form__select-list')[0]
const monthList = document.getElementsByClassName('card-form__select-list')[1]
const selectDaysListWrpr = document.getElementsByClassName('card-form__select-list-wrapper')[0]
const selectMonthsListWrpr = document.getElementsByClassName('card-form__select-list-wrapper')[1]
const daySelect = document.getElementById('card-form__day-select')
const monthSelect = document.getElementById('card-form__month-select')
const selectDayValue = document.getElementById('card-form__day-select-value')
const selectMonthValue = document.getElementById('card-form__month-select-value')

// функция, возвращающая массивы цифр для дней или месяцев
const sourceArrBuilder = (num) => {
	return Array(num).fill().map((x,i)=> i < 9 ? "0" + String(i+1) : String(i+1))
} 

// функция, рендерящая выпадающие списки дней и месяцев
const selectListBuilder = (sourceArr, resultList) => {
	sourceArr.forEach(item => {
		resultList.insertAdjacentHTML('beforeend', `<div class="card-form__select-list-item"><span>${item}</span></div>`)
	})
}

selectListBuilder(sourceArrBuilder(31), daysList)
selectListBuilder(sourceArrBuilder(12), monthList)

// список выпадает при клике
daySelect.onclick = () => {
	selectDaysListWrpr.classList.add('show-select')
}

// выбор значения из списка
daysList.onclick = (e) => {
	selectDayValue.textContent = e.target.textContent
}

// список выпадает при клике
monthSelect.onclick = () => {
	selectMonthsListWrpr.classList.add('show-select')
}

// выбор значения из списка
monthList.onclick = (e) => {
	selectMonthValue.textContent = e.target.textContent
}

// сворачивание списков по клику вне
document.onclick = (e) => {
	if (!daySelect.contains(e.target)){

		if (selectDaysListWrpr.classList.contains('show-select')){
			selectDaysListWrpr.classList.remove('show-select')
		}
	}

	if (!monthSelect.contains(e.target)){

		if (selectMonthsListWrpr.classList.contains('show-select')){
			selectMonthsListWrpr.classList.remove('show-select')
		}
	}

	if (!document.getElementById('nav-menu').contains(e.target) && !burgerButton.contains(e.target)) {

		if (burgerWrapper.classList.contains('show')){
			burgerWrapper.classList.remove('show')
		}
	}

	Array.from(navLinks).forEach(item => {
		if (item.contains(e.target)) {

			if (burgerWrapper.classList.contains('show')){
				burgerWrapper.classList.remove('show')
			}
		}
	})
}

const navLinks = document.getElementsByClassName('nav-menu__item--tab')
const burgerWrapper = document.getElementById('burger-wrapper')
const burgerButton = document.getElementById('burger-button')

// бургер
const burgerClick = () => {
	burgerWrapper.classList.add('show')
}
