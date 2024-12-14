

export async function categoryCreate(name, code, level, parentCategoryId, token, chabk , setMessageData) {
    const url = `https://${chabk}/Category/Category/Create`;

    const data = {
        code: code,
        name: name,
        level: level,
        parentCategoryId: parentCategoryId
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
            throw new Error(response.status); 
        }
        
        const result = await response.json();
        if (result?.isSuccess) {
            // ...
        } else {
            setMessageData(
                result.errors ? result.errors : result.message
            );
        }

        return result;
    } catch (error) {

        if (error instanceof TypeError && error.message === "Failed to fetch") {
            setMessageData( 
                'مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.'
            );
        } else if (!navigator.onLine) {
            setMessageData(
                "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
            );
        } else {
            const errorMessages = {
                400: ' درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                401: 'برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                403: 'شما اجازه دسترسی به این قسمت را ندارید.',
                404: 'صفحه یا منبع مورد نظر پیدا نشد.',
                408: 'زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                500: 'مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                502: 'مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                503: 'سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                504: 'زمان اتصال به سرور اصلی تمام شد.'
            };
            
            const message = errorMessages[Number(error.message)] || 'خطای ناشناخته‌ای رخ داده است.';
            setMessageData( message);
        }
    }
}

export async function categoryGetAll(
    level,
     parentCategoryId,
      token,
       chabk,
       setCheckDataAll,
       setCheckData,
       setMessageData,
       setOptions
    ) {
    const url = `https://${chabk}/Category/Category/GetAll`;

    const data = {
        level: level,
        parentCategoryId: parentCategoryId
    }

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
                if (result?.isSuccess) {
                    setCheckDataAll((r) => ({...r,check1: true}));
                    setOptions(result?.data)
                } else {
                    setCheckData(true);
                    setMessageData(
                        result.errors ? result.errors : result.message
                    );
                }
                return result;
            })
            .catch((error) => {
                setCheckData(true);

                if (error instanceof TypeError && error.message === "Failed to fetch") {
                    setMessageData((prevData) => [
                        ...prevData, 
                        'خطا در دریافت دسته بندی کالا : شما اجازه دسترسی به این قسمت را ندارید.'
                    ]);
                } else if (!navigator.onLine) {
                    setMessageData((prevData) => [
                        ...prevData, 
                        "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
                    ]);
                } else {
                    const errorMessages = {
                        400: 'خطا در دریافت دسته بندی کالا : درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                        401: 'خطا در دریافت دسته بندی کالا : برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                        403: 'خطا در دریافت دسته بندی کالا : شما اجازه دسترسی به این قسمت را ندارید.',
                        404: 'خطا در دریافت دسته بندی کالا : صفحه یا منبع مورد نظر پیدا نشد.',
                        408: 'خطا در دریافت دسته بندی کالا : زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                        500: 'خطا در دریافت دسته بندی کالا : مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                        502: 'خطا در دریافت دسته بندی کالا : مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                        503: 'خطا در دریافت دسته بندی کالا : سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                        504: 'خطا در دریافت دسته بندی کالا : زمان اتصال به سرور اصلی تمام شد.'
                    };
                    
                    const message = errorMessages[Number(error.message)] || 'خطا در دریافت دسته بندی کالا : خطای ناشناخته‌ای رخ داده است.';
                    setMessageData((prevData) => [...prevData, message]);
                }
            });
    } catch (e) {
        setCheckData(true)
        setMessageData((prevData) => [...prevData,"خطا در دریافت دسته بندی کالا : مشکلی در ارسال درخواست به وجود آمده است. لطفاً دوباره تلاش کنید."]);
    }
}

export function ProductClassification(token, chabk, level, parentCategoryId, setMessageData , setCheckData) {
    const url = `https://${chabk}/Category/Category/GetAll`;

    const data = {
        level: level,
        parentCategoryId: parentCategoryId
    }
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
                'خطا در دریافت دسته بندی کالا : شما اجازه دسترسی به این قسمت را ندارید.'
            ]);
        } else if (!navigator.onLine) {
            setMessageData((prevData) => [
                ...prevData, 
                "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
            ]);
        } else {
            const errorMessages = {
                400: 'خطا در دریافت دسته بندی کالا : درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                401: 'خطا در دریافت دسته بندی کالا : برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                403: 'خطا در دریافت دسته بندی کالا : شما اجازه دسترسی به این قسمت را ندارید.',
                404: 'خطا در دریافت دسته بندی کالا : صفحه یا منبع مورد نظر پیدا نشد.',
                408: 'خطا در دریافت دسته بندی کالا : زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                500: 'خطا در دریافت دسته بندی کالا : مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                502: 'خطا در دریافت دسته بندی کالا : مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                503: 'خطا در دریافت دسته بندی کالا : سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                504: 'خطا در دریافت دسته بندی کالا : زمان اتصال به سرور اصلی تمام شد.'
            };
            
            const message = errorMessages[Number(error.message)] || 'خطا در دریافت دسته بندی کالا : خطای ناشناخته‌ای رخ داده است.';
            setMessageData((prevData) => [...prevData, message]);
        }
            });
    } catch (e) {
        setMessageData((prevData) => [...prevData,"خطا در دریافت دسته بندی کالا : مشکلی در ارسال درخواست به وجود آمده است. لطفاً دوباره تلاش کنید."]);
    }
}
