'use strict';

var chalk = require('chalk');

describe('Order create Tests:', function () {
    var order = {
        orderId: '20160703202055',
        items: [
            {
                name: 'SUSTAGEN 医院配方营养粉奶粉 老人孕妇体弱适用 840克 香草味 可直邮回国',
                price: 25.80,
                quantity: 1,
                url: 'http://www.wellcome.co.nz/product-1294.html'
            },
            {
                name: 'Ecostore 实木婴儿洗护礼盒 大号七件套',
                price: 64.64,
                quantity: 1,
                url: 'http://www.wellcome.co.nz/product-1759.html'
            },
            {
                name: 'BIO OIL 万能生物油 60毫升/200毫升 预防妊娠纹 祛疤祛痘 (200毫升)',
                price: 28.00,
                quantity: 1,
                url: 'http://www.wellcome.co.nz/product-956.html'
            }
        ],
        shipping: [{
            no: 'EF516295686NZ'
        }],
        created: '2016-07-04 16:27',
        subtotal: 118.44,
        shiping_fee: 0,
        local_fee: 0,
        totalRmbCost: 500,
        status: '已发货',
        address: {
            name: '	张xx',
            tel: '11111111',
            zip: '200093',
            address: '中国上海市xxxxxxxxxxxxxx',
            ID: '320xxxxxxxxxxxxx',
            weight: 4020
        }
    };
    
    describe('Create Validation', function () {
        it('Should report missing order No.', function () {
            browser.get('http://localhost:3001/order/create');
            element(by.model('order.orderId')).sendKeys(order.orderId);
            element(by.model('order.subtotal')).sendKeys(order.subtotal);
            element(by.model('order.created')).sendKeys(order.created);
            element(by.model('order.totalCost')).sendKeys(order.totalCost);
            element(by.model('order.totalRmbCost')).sendKeys(order.totalRmbCost);

            element(by.xpath('(//a[@class="accordion-toggle"])[4]')).click();
            element(by.model('order.address.name')).sendKeys(order.address.name);
            element(by.model('order.address.address')).sendKeys(order.address.address);
            element(by.model('order.address.tel')).sendKeys(order.address.tel);
            element(by.model('order.address.weight')).sendKeys(order.address.weight);
            element(by.model('order.orderId')).clear();

            element(by.css('button[type=submit]')).click();
            expect(element(by.xpath("(//p[@class='help-block error-text ng-scope'])[1]")).getText()).toEqual('Order No. is required');

        });
        it('Should report missing order subtotal', function () {
            browser.get('http://localhost:3001/order/create');
            element(by.model('order.orderId')).sendKeys(order.orderId);
            element(by.model('order.subtotal')).sendKeys(order.subtotal);
            element(by.model('order.created')).sendKeys(order.created);
            element(by.model('order.totalCost')).sendKeys(order.totalCost);
            element(by.model('order.totalRmbCost')).sendKeys(order.totalRmbCost);

            element(by.xpath('(//a[@class="accordion-toggle"])[4]')).click();
            element(by.model('order.address.name')).sendKeys(order.address.name);
            element(by.model('order.address.address')).sendKeys(order.address.address);
            element(by.model('order.address.tel')).sendKeys(order.address.tel);
            element(by.model('order.address.weight')).sendKeys(order.address.weight);
            element(by.model('order.subtotal')).clear();

            element(by.css('button[type=submit]')).click();
            expect(element(by.xpath("(//p[@class='help-block error-text ng-scope'])[1]")).getText()).toEqual('Subtotal is required');

        });
        it('Should report missing order created time', function () {
            browser.get('http://localhost:3001/order/create');
            element(by.model('order.orderId')).sendKeys(order.orderId);
            element(by.model('order.subtotal')).sendKeys(order.subtotal);
            element(by.model('order.created')).sendKeys(order.created);
            element(by.model('order.totalCost')).sendKeys(order.totalCost);
            element(by.model('order.totalRmbCost')).sendKeys(order.totalRmbCost);

            element(by.xpath('(//a[@class="accordion-toggle"])[4]')).click();
            element(by.model('order.address.name')).sendKeys(order.address.name);
            element(by.model('order.address.address')).sendKeys(order.address.address);
            element(by.model('order.address.tel')).sendKeys(order.address.tel);
            element(by.model('order.address.weight')).sendKeys(order.address.weight);
            element(by.model('order.created')).clear();

            element(by.css('button[type=submit]')).click();
            expect(element(by.model('order.created')).getText()).toEqual('');
            // expect(element(by.model('order.created')).getAttribute("class")).toContain('ng-invalid');
            // expect(element(by.xpath("(//p[@class='help-block error-text ng-scope'])[1]")).getText()).toEqual('Created Time is required');

        });
        it('Should report missing total cost', function () {
            browser.get('http://localhost:3001/order/create');
            element(by.model('order.orderId')).sendKeys(order.orderId);
            element(by.model('order.subtotal')).sendKeys(order.subtotal);
            element(by.model('order.created')).sendKeys(order.created);
            element(by.model('order.totalCost')).sendKeys(order.totalCost);
            element(by.model('order.totalRmbCost')).sendKeys(order.totalRmbCost);

            element(by.xpath('(//a[@class="accordion-toggle"])[4]')).click();
            element(by.model('order.address.name')).sendKeys(order.address.name);
            element(by.model('order.address.address')).sendKeys(order.address.address);
            element(by.model('order.address.tel')).sendKeys(order.address.tel);
            element(by.model('order.address.weight')).sendKeys(order.address.weight);
            element(by.model('order.totalCost')).clear();

            element(by.css('button[type=submit]')).click();
            expect(element(by.xpath("(//p[@class='help-block error-text ng-scope'])[1]")).getText()).toEqual('Total cost is required');

        });
        it('Should report missing total Rmb cost', function () {
            browser.get('http://localhost:3001/order/create');
            element(by.model('order.orderId')).sendKeys(order.orderId);
            element(by.model('order.subtotal')).sendKeys(order.subtotal);
            element(by.model('order.created')).sendKeys(order.created);
            element(by.model('order.totalCost')).sendKeys(order.totalCost);
            element(by.model('order.totalRmbCost')).sendKeys(order.totalRmbCost);

            element(by.xpath('(//a[@class="accordion-toggle"])[4]')).click();
            element(by.model('order.address.name')).sendKeys(order.address.name);
            element(by.model('order.address.address')).sendKeys(order.address.address);
            element(by.model('order.address.tel')).sendKeys(order.address.tel);
            element(by.model('order.address.weight')).sendKeys(order.address.weight);
            element(by.model('order.totalRmbCost')).clear();

            element(by.css('button[type=submit]')).click();
            expect(element(by.xpath("(//p[@class='help-block error-text ng-scope'])[1]")).getText()).toEqual('Total RMB cost is required');

        });
        it('Should report missing address name', function () {
            browser.get('http://localhost:3001/order/create');
            element(by.model('order.orderId')).sendKeys(order.orderId);
            element(by.model('order.subtotal')).sendKeys(order.subtotal);
            element(by.model('order.created')).sendKeys(order.created);
            element(by.model('order.totalCost')).sendKeys(order.totalCost);
            element(by.model('order.totalRmbCost')).sendKeys(order.totalRmbCost);

            element(by.xpath('(//a[@class="accordion-toggle"])[4]')).click().then(function () {
                element(by.model('order.address.name')).sendKeys(order.address.name);
                element(by.model('order.address.address')).sendKeys(order.address.address);
                element(by.model('order.address.tel')).sendKeys(order.address.tel);
                element(by.model('order.address.weight')).sendKeys(order.address.weight);
                element(by.model('order.address.name')).clear();
                element(by.model('order.address.name')).sendKeys(order.address.name);

                element(by.css('button[type=submit]')).click();
                expect(element(by.xpath("(//p[@class='help-block error-text ng-scope'])[1]")).getText()).toEqual('Name is required');
            });

        });
        it('Should report missing address detail', function () {
            browser.get('http://localhost:3001/order/create');
            element(by.model('order.orderId')).sendKeys(order.orderId);
            element(by.model('order.subtotal')).sendKeys(order.subtotal);
            element(by.model('order.created')).sendKeys(order.created);
            element(by.model('order.totalCost')).sendKeys(order.totalCost);
            element(by.model('order.totalRmbCost')).sendKeys(order.totalRmbCost);

            element(by.xpath('(//a[@class="accordion-toggle"])[4]')).click().then(function () {
                element(by.id('address_name')).sendKeys(order.address.name);
                element(by.model('order.address.address')).sendKeys(order.address.address);
                element(by.model('order.address.tel')).sendKeys(order.address.tel);
                element(by.model('order.address.weight')).sendKeys(order.address.weight);
                element(by.model('order.address.address')).clear();
                element(by.model('order.address.name')).sendKeys(order.address.name);

                element(by.css('button[type=submit]')).click();
                expect(element(by.xpath("(//p[@class='help-block error-text ng-scope'])[3]")).getText()).toEqual('Address is required');
            });

        });
        it('Should report missing address tel', function () {
            browser.get('http://localhost:3001/order/create');
            element(by.model('order.orderId')).sendKeys(order.orderId);
            element(by.model('order.subtotal')).sendKeys(order.subtotal);
            element(by.model('order.created')).sendKeys(order.created);
            element(by.model('order.totalCost')).sendKeys(order.totalCost);
            element(by.model('order.totalRmbCost')).sendKeys(order.totalRmbCost);

            element(by.xpath('(//a[@class="accordion-toggle"])[4]')).click().then(function () {
                element(by.id('address_name')).sendKeys(order.address.name);
                element(by.model('order.address.address')).sendKeys(order.address.address);
                element(by.model('order.address.tel')).sendKeys(order.address.tel);
                element(by.model('order.address.weight')).sendKeys(order.address.weight);
                element(by.model('order.address.tel')).clear();
                element(by.model('order.address.name')).sendKeys(order.address.name);

                element(by.css('button[type=submit]')).click();
                expect(element(by.xpath("(//p[@class='help-block error-text ng-scope'])[3]")).getText()).toEqual('Tel is required');
            });

        });
        it('Should report missing order weight', function () {
            browser.get('http://localhost:3001/order/create');
            element(by.model('order.orderId')).sendKeys(order.orderId);
            element(by.model('order.subtotal')).sendKeys(order.subtotal);
            element(by.model('order.created')).sendKeys(order.created);
            element(by.model('order.totalCost')).sendKeys(order.totalCost);
            element(by.model('order.totalRmbCost')).sendKeys(order.totalRmbCost);

            element(by.xpath('(//a[@class="accordion-toggle"])[4]')).click().then(function () {
                element(by.model('order.address.name')).sendKeys(order.address.name);
                element(by.model('order.address.address')).sendKeys(order.address.address);
                element(by.model('order.address.tel')).sendKeys(order.address.tel);
                element(by.model('order.address.weight')).sendKeys(order.address.weight);
                element(by.model('order.address.weight')).clear();
                element(by.model('order.address.name')).sendKeys(order.address.name);

                element(by.css('button[type=submit]')).click();
                expect(element(by.xpath("(//p[@class='help-block error-text ng-scope'])[3]")).getText()).toEqual('Weight is required');
            });
        });
        it('Should have valid value of Total Cost and RMB Cost if subtotal exists', function () {
            browser.get('http://localhost:3001/order/create');
            element(by.model('order.subtotal')).sendKeys(order.subtotal);

            expect(element(by.model('order.totalCost')).getAttribute('value')).toBeGreaterThan(0);
            expect(element(by.model('order.totalRmbCost')).getAttribute('value')).toBeGreaterThan(0);

        })
    })

});