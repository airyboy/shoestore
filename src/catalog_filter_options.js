export const types = [
    'Балетки',
    'Босоножки и сандалии',
    'Ботильоны',
    'Ботинки',
    'Ботфорты',
    'Галоши',
    'Тапочки',
    'Туфли',
    'Сапоги'];

export class FilterOptions {
    constructor() {
        this.types = [
            'Балетки',
            'Босоножки и сандалии',
            'Ботильоны',
            'Ботинки',
            'Кроссовки',
            'Галоши',
            'Тапочки',
            'Туфли',
            'Сапоги']
    }

    get colors() {
        return [
            {class: 'beige', name: 'Бежевый'},
            {class: 'whitesnake', name: 'Белый'},
            {class: 'shocking-blue', name: 'Голубой'},
            {class: 'yellow', name: 'Жёлтый'},
            {class: 'king-crimson', name: 'Алый'},
            {class: 'deep-purple', name: 'Фиолетовый'},
            {class: 'black-sabbath', name: 'Чёрный'}]
    }

    get sizes() {
        return {
            odd: [...Array(10).keys()].filter(n => n%2 > 0).map(n => 10 + n),
            even: [...Array(10).keys()].filter(n => n%2 === 0).map(n => 12 + n)
        }
    }

    get heelSizes() {
        return {
            odd: [1, 3, 5, 7, 9],
            even: [2, 4, 6, 8, 10]
        }
    }

    get reasons() {
        return [
            'Офис',
            'Вечеринка',
            'Свадьба',
            'Спорт',
            'Путешествие',
            'Свидание',
            'Высокая мода',
        ]        
    }

    get seasons() {
        return [
            'Зима',
            'Весна',
            'Лето',
            'Осень'
        ]                
    }
}