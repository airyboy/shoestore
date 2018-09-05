export default class Storage {
    static getFavoriteIds() {
        const json = localStorage.getItem('favorites')

        let favs = [];
        if (json) {
            favs = JSON.parse(json)
        }

        return favs
    }

    static addToFavorites(id) {
        const favs = Storage.getFavoriteIds()

        if (!favs.find(a => a === id) && id !== null) {
            favs.push(id)
        }

        localStorage.setItem('favorites', JSON.stringify(favs))

        return Storage.getFavoriteIds()

    }

    static removeFromFavorites(id) {
        const favs = Storage.getFavoriteIds()

        const alteredFavs = favs.filter(a => a !== id)

        localStorage.setItem('favorites', JSON.stringify(alteredFavs))

        return Storage.getFavoriteIds()
    }

    static addProductToVisited(product) {
        const visited = Storage.getVisited()

        const foundIndex  = visited.findIndex(p => p.id === product.id)

        if (foundIndex > -1) {
            visited.splice(foundIndex, 1)
        }

        visited.unshift(product)
        if (visited.length > 10) {
            visited.pop()
        }

        localStorage.setItem('visited', JSON.stringify(visited))

        return Storage.getVisited()
    }

    static getVisited() {
        const json = localStorage.getItem('visited')

        let visited = []
        if (json) {
            visited = JSON.parse(json)
        }

        return visited
    }

    static getBasketId() {
        const basketId = localStorage.getItem('basketId')

        return basketId || null;
    }

    static setBasketId(basketId) {
        if (basketId) {
            localStorage.setItem('basketId', basketId)
        } else {
            localStorage.removeItem('basketId')
        }

        
    }


}

