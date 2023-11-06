import { Box } from "@mui/material"
import { WishCard } from "./WishCard"
import { convertCurrency } from "../../../shared/util"

export const WishList = ({ currencyRate, items }) => {


    return (
        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
            {items && items.map((item, index) => {
                let result = convertCurrency(item.countCurrency, currencyRate[item.from].value, currencyRate[item.to].value)

                return (
                    <WishCard
                        key={`${index}-${item.from}-${item.countCurrency}`}
                        title={item.wishName}
                        initialPrice={`${item.countCurrency} ${item.from}`}
                        priceInfo={`${item.countCurrency} ${item.from} = ${result.toFixed(3)} ${item.to}`} />
                )
            })}
        </Box>
    )
}