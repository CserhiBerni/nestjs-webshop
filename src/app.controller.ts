import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('success')
  @Render('success')
  getSuccess() {
    return {
      message: "Sikeres megrendeles!"
    };
  }

  @Post('submit')
  handleSubmit(@Body() body: any) {
    const name = body.name;
    const billingCountry = body.billingCountry;
    const billingZip = body.billingZip;
    const billingCity = body.billingCity;
    const billingStreet = body.billingStreet;
    const shippingCountry = body.shippingCountry;
    const shippingZip = body.shippingZip;
    const shippingCity = body.shippingCity;
    const shippingStreet = body.shippingStreet;
    const couponCode = body.couponCode;
    const cardNumber = body.cardNumber;
    const expiryDate = body.expiryDate;
    const securityCode = body.securityCode;

    const date = new Date();
    if (date.getFullYear > expiryDate || (date.getFullYear == expiryDate && date.getMonth() > expiryDate)) {
      return "Lejart kartya";
    }

    const couponCodeRegExp = /^[A-Z]{2}-\d{4}$/;
    if (!couponCodeRegExp.test(couponCode)) {
      return "Nem letezo kupon kod";
    }

    const cardNumberRegExp = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (!cardNumberRegExp.test(cardNumber)) {
      return "Hibas kartyaszam formatum";
    }

    if (securityCode.length > 3) {
      return "Hibas biztonsagi kod";
    }
  }
}
