import { Environment } from "../util"

const createCurrencyService = () => {

    return {
        getCurrency() {
            return fetch(`https://api.currencyapi.com/v3/latest?apikey=${import.meta.env[Environment.CURRENCY_API_KEY]}`)
                .then(response => response.json())
        }
    }
}

export const currencyService = createCurrencyService();