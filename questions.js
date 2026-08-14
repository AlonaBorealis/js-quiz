const quizQuestions = [
    {
        question: "Что такое DOM в контексте веб-разработки?",
        options: [
            "Документ объектной модели",
            "Динамический оператор метода",
            "Дополнительный оптимизированный модуль",
            "Детальный обработчик метаданных"
        ],
        correctAnswer: 0,
        explanation: "DOM (Document Object Model) - это программный интерфейс, который представляет HTML-документ в виде древовидной структуры объектов."
    },
    {
        question: "Какой метод используется для поиска элемента по ID?",
        options: [
            "document.findElementById()",
            "document.getElementById()",
            "document.querySelector('#id')",
            "document.getElementByName()"
        ],
        correctAnswer: 1,
        explanation: "document.getElementById() - стандартный метод для поиска элемента по его уникальному идентификатору."
    },
    {
        question: "Как добавить новый класс к элементу с помощью JavaScript?",
        options: [
            "element.class += 'новый-класс'",
            "element.className += 'новый-класс'",
            "element.classList.add('новый-класс')",
            "element.addClassName('новый-класс')"
        ],
        correctAnswer: 2,
        explanation: "element.classList.add() - современный метод для добавления класса к элементу."
    },
    {
        question: "Какой метод используется для создания нового элемента в DOM?",
        options: [
            "document.createElement()",
            "document.newElement()",
            "document.addElement()",
            "document.makeElement()"
        ],
        correctAnswer: 0,
        explanation: "document.createElement() создает новый HTML-элемент, который затем можно добавить в DOM."
    },
    {
        question: "Как добавить созданный элемент в DOM?",
        options: [
            "document.append(element)",
            "document.body.appendChild(element)",
            "element.appendTo(document.body)",
            "document.body.insert(element)"
        ],
        correctAnswer: 1,
        explanation: "appendChild() добавляет элемент как последний дочерний элемент к указанному родителю."
    },
    {
        question: "Как удалить элемент из DOM?",
        options: [
            "element.delete()",
            "document.removeElement(element)",
            "element.remove()",
            "document.deleteNode(element)"
        ],
        correctAnswer: 2,
        explanation: "element.remove() - современный метод для удаления элемента из DOM."
    },
    {
        question: "Какой метод используется для добавления обработчика события?",
        options: [
            "element.addEventListener()",
            "element.attachEvent()",
            "element.on()",
            "element.handleEvent()"
        ],
        correctAnswer: 0,
        explanation: "addEventListener() - стандартный метод для назначения обработчика события элементу."
    },
    {
        question: "Что такое событийное делегирование?",
        options: [
            "Передача события от одного элемента к другому",
            "Назначение нескольких обработчиков на одно событие",
            "Обработка событий на родительском элементе вместо дочерних",
            "Отмена стандартного поведения событий"
        ],
        correctAnswer: 2,
        explanation: "Событийное делегирование - это техника, когда обработчик назначается родительскому элементу вместо множества дочерних, что улучшает производительность."
    },
    {
        question: "Как изменить стиль элемента с помощью JavaScript?",
        options: [
            "element.style = 'color: red'",
            "element.css('color', 'red')",
            "element.style.color = 'red'",
            "element.setStyle('color', 'red')"
        ],
        correctAnswer: 2,
        explanation: "element.style.имя_свойства позволяет изменять инлайн-стили элемента."
    },
    {
        question: "Что делает метод querySelector?",
        options: [
            "Возвращает все элементы, соответствующие CSS-селектору",
            "Возвращает первый элемент, соответствующий CSS-селектору",
            "Возвращает элемент по его ID",
            "Возвращает коллекцию элементов по их имени тега"
        ],
        correctAnswer: 1,
        explanation: "querySelector() возвращает первый элемент, который соответствует указанному CSS-селектору."
    },
    {
        question: "Как получить значение атрибута элемента?",
        options: [
            "element.value('атрибут')",
            "element.getAttribute('атрибут')",
            "element.атрибут",
            "element.getProperty('атрибут')"
        ],
        correctAnswer: 1,
        explanation: "getAttribute() возвращает значение указанного атрибута элемента."
    },
    {
        question: "Какой метод используется для получения всех элементов по CSS-селектору?",
        options: [
            "document.getElements()",
            "document.querySelectorAll()",
            "document.getElementsBySelector()",
            "document.findAll()"
        ],
        correctAnswer: 1,
        explanation: "querySelectorAll() возвращает статический NodeList, содержащий все элементы, соответствующие CSS-селектору."
    },
    {
        question: "Что означает 'всплытие событий' (event bubbling)?",
        options: [
            "Распространение события от родительского элемента к дочерним",
            "Распространение события от дочернего элемента к родительским",
            "Отмена события до его обработки",
            "Создание нескольких одинаковых событий одновременно"
        ],
        correctAnswer: 1,
        explanation: "Всплытие - это механизм распространения события от элемента, на котором оно возникло, вверх по дереву DOM к родителям."
    },
    {
        question: "Что такое HTML-шаблон (template)?",
        options: [
            "Специальный элемент, содержащий HTML, который не отображается, но может быть клонирован для создания новых элементов",
            "Предварительно созданный HTML-код для повторного использования",
            "Заготовка HTML-страницы, используемая для начала разработки",
            "CSS-файл, содержащий общие стили для сайта"
        ],
        correctAnswer: 0,
        explanation: "Элемент <template> содержит HTML-код, который не отображается на странице, но может быть использован JavaScript для создания новых элементов."
    },
    {
        question: "Как клонировать содержимое HTML-шаблона?",
        options: [
            "template.copy(true)",
            "template.clone()",
            "template.content.cloneNode(true)",
            "template.duplicate()"
        ],
        correctAnswer: 2,
        explanation: "content.cloneNode(true) возвращает полную копию содержимого шаблона, включая все дочерние элементы."
    }
];

const url = "https://js-quiz-questions-server.vercel.app/api/questions";
const quesries = {
    theme: "js | html | css",
    limit: 10,
    page: 1,
}
const restrictedUrls = "https://js-quiz-questions-server.vercel.app/api/restricted"
const alternativeAPI = "https://country-search-seven-gilt.vercel.app"
