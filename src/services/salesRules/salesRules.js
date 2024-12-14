export async function sendGoodDiscount(dataAll, token, chabk) {
    const url = `https://${chabk}/Financial/GoodDiscount/Create`;

    const data = {
        "supplierId": dataAll.supplierId,
        "name": dataAll.name,
        "conditionDescription": dataAll.conditionDescription,
        "goodIds": dataAll.goodIds,
        "saleType": dataAll.saleType,
        "paymentType": dataAll.paymentType,
        "paymentDurationDays": dataAll.paymentDurationDays,
        "amountMaxLimit": dataAll.amountMaxLimit,
        "amountMinLimit": dataAll.amountMinLimit,
        "costMinLimit": dataAll.costMinLimit,
        "shopperRankLimit": dataAll.shopperRankLimit,
        "invoiceDiscountPercent": dataAll.invoiceDiscountPercent,
        "goodDiscountPercent": dataAll.goodDiscountPercent,
        "giftItem": dataAll.giftItem
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // console.log('Response from API:', result);
        return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// ***********

export const fetchGoodGetAll = async (
    token,
    chabk,
    setMessageData,
    setCheckData,
    data = {}
) => {
    const url = `https://${chabk}/Product/Good/GetAll`;


    try {
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status); 
                }
                return response.json(); 
            })
            .then(result => {
                return result;
            })
            .catch((error) => {
                setCheckData(true);

                if (error instanceof TypeError && error.message === "Failed to fetch") {
                    setMessageData((prevData) => [
                        ...prevData, 
                        'خطا در دریافت لیست کالای شروط : شما اجازه دسترسی به این قسمت را ندارید.'
                    ]);
                } else if (!navigator.onLine) {
                    setMessageData((prevData) => [
                        ...prevData, 
                        "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
                    ]);
                } else {
                    const errorMessages = {
                        400: 'خطا در دریافت لیست کالای شروط : درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                        401: 'خطا در دریافت لیست کالای شروط : برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                        403: 'خطا در دریافت لیست کالای شروط : شما اجازه دسترسی به این قسمت را ندارید.',
                        404: 'خطا در دریافت لیست کالای شروط : صفحه یا منبع مورد نظر پیدا نشد.',
                        408: 'خطا در دریافت لیست کالای شروط : زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                        500: 'خطا در دریافت لیست کالای شروط : مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                        502: 'خطا در دریافت لیست کالای شروط : مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                        503: 'خطا در دریافت لیست کالای شروط : سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                        504: 'خطا در دریافت لیست کالای شروط : زمان اتصال به سرور اصلی تمام شد.'
                    };
                    
                    const message = errorMessages[Number(error.message)] || 'خطا در دریافت لیست کالای شروط : خطای ناشناخته‌ای رخ داده است.';
                    setMessageData((prevData) => [...prevData, message]);
                }
            });
    } catch (e) {
        setCheckData(true)
        setMessageData((prevData) => [...prevData,"خطا در دریافت لیست کالای شروط : مشکلی در ارسال درخواست به وجود آمده است. لطفاً دوباره تلاش کنید."]);
    }


};


// ******

export async function postGoodDiscountGetList({
    dataAll,
    token,
    chabk
}) {
    const url = `https://${chabk}/Financial/GoodDiscount/GetList`;
    const data = {
        "filter": {
            "keyword": dataAll.keyword,
            "saleType": dataAll.shopperRankLimit,
            "paymentType": dataAll.paymentType,
            "shopperRankLimit": dataAll.shopperRankLimit
        },
        "pageSize": dataAll.pageSize,
        "pageIndex": dataAll.pageIndex,
        "orderType": dataAll.orderType,
        "orderPropertyName": dataAll.orderPropertyName
    }


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};