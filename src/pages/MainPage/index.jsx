import { Container } from '@mui/material';
import { CurrencyConverter } from '../../widgets/Converter';
import { WishListWidget } from '../../widgets/WishList';


export const MainPage = () => {

    return (
        <Container>
            <CurrencyConverter/>
            <WishListWidget/>
        </Container>
    )
};