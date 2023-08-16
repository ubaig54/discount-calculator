import { Controller, Post, Body } from '@nestjs/common';

@Controller('api')
export class SendValueController {
    @Post('send-value')
    sendValue(@Body() body: { value: string }): { message: object } {
        const priceBefore = body.value['priceBefore'];
        const discount = body.value['discount'];
        const discountType = body.value['discountType'];

        let priceAfter, priceSaved, discountPercentage, savedValue;

        switch (discountType) {
            case "percent":
                priceAfter = priceBefore - (discount * priceBefore / 100);
                priceSaved = priceBefore - priceAfter;
                savedValue = priceSaved.toFixed(2);
                break;
            case "fixed":
                priceAfter = priceBefore - discount;
                discountPercentage = 100 - (priceAfter * 100 / priceBefore);
                savedValue = discountPercentage && discountPercentage.toFixed(2);
            default:
                break;
        }

        return { message: { priceAfter, savedValue } };
    }
}
