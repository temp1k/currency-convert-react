import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';

import { convertCurrency } from './../../shared/util/convert/currency';
import { currencyService } from './../../shared/api/currency.service';
import { ConvertForm } from './../../features/ConvertForm/index';
import { useInputState } from '../../shared/util';
import { ModalBase } from '../../shared/ui';
import { mapCurrencyRatesToLabelValue } from '../../entities/currency';
import { useWishListState } from '../../entities/wish/lib/useWishListState';
import { WishList } from '../../entities/wish';

export const WishListWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoading, data: currencyRate } = useQuery({ queryKey: ['currencyRate'], queryFn: currencyService.getCurrency, select: (data) => data.data })
    const { wishList, saveItem } = useWishListState();

    const { value, setValue, error, setError } = useInputState();

    const onSubmit = useCallback((data) => {
        let result = convertCurrency(data.countCurrency, currencyRate[data.from].value, currencyRate[data.to].value)

        if (!value) {
            return setError(true)
        }

        let newWishItem = {
            ...data,
            wishName: value
        }

        console.log(newWishItem);
    
        saveItem(newWishItem);

        return setIsOpen(false);
    }, [saveItem, setError, value])

    const onAddWishClick = () => {
        setIsOpen(true);
    }

    const onValueChange = (e) => {
        let value = e.target.value;
        if (value) {
            setError(false)
        }
        else {
            setError(true)
        }

        return setValue(e.target.value);
    }

    if (isLoading) {
        return (
            <CircularProgress />
        )
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4">Список желаний</Typography>
            <Button variant="outlined" color="primary" onClick={onAddWishClick}>Добавить желание</Button>

            <Box>
                <WishList currencyRate={currencyRate} items={wishList} />
            </Box>

            <ModalBase
                title='Опишите важе желание'
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <Box display="flex" flexDirection="column" alignItems="center" gap={2} padding={2}>
                    <TextField
                        label="Название мечты"
                        type="text"
                        value={value}
                        onChange={onValueChange}
                        autoComplete='off'
                        sx={{ width: '200px' }}
                        error={error}
                        helperText={error ? 'Обязательное поле' : ''}
                    />
                    <ConvertForm onSubmit={onSubmit} currencyList={mapCurrencyRatesToLabelValue(currencyRate)} buttonLabel='Добавить' />
                </Box>
            </ModalBase>
        </Box>
    )

}