import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ConvertForm } from '../../features/ConvertForm';
import { currencyService } from '../../shared/api/currency.service';
import { useState } from 'react';
import { convertCurrency } from '../../shared/util/convert/currency';
import { mapCurrencyRatesToLabelValue } from '../../entities/currency';

export const CurrencyConverter = () => {

    const [converterResult, setConverterResult] = useState(null);

    const { isLoading, data: currencyRate } = useQuery({ queryKey: ['currencyRate'], queryFn: currencyService.getCurrency, select: (data) => data.data })

    const onSubmit = (data) => {
        let result = convertCurrency(data.countCurrency, currencyRate[data.from].value, currencyRate[data.to].value)

        return setConverterResult(`${data.countCurrency} ${data.from} = ${result.toFixed(3)} ${data.to}`)
    }

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant='h4'>
                Конвертер валют
            </Typography>

            <Box sx={{padding: '16px'}}>
               <ConvertForm currencyList={mapCurrencyRatesToLabelValue(currencyRate)} onSubmit={onSubmit} buttonLabel="Конвертировать"/>
            </Box>

            <Box sx={{padding: '16px', minHeight: '64px'}}>
                {converterResult && <Typography variant='h5'>{converterResult}</Typography>}
            </Box>
        </Box>
    )
}