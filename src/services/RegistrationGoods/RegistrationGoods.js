export async function postGoodList({
    token,
    chabk,
    setMessageData,
    setCheckData,
    dataAll,
    setDataTable,
    setTotalItems,
    setCheckDataAll
}) {
    const url = `https://${chabk}/Product/Good/GetList`;
    const data = dataAll
    

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
            setDataTable(result.data.data)
            setTotalItems(result.data.count || result.data.data.length)
            setCheckDataAll((r) => ({...r,check1: true}));
        } else {
            setCheckData(true);
            setMessageData(
                result.errors ? result.errors : result.message
            );
        }
        
        return result;
    } catch (error) {
        setCheckData(true);

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

};

export async function postGoodDelete(edit, token, chabk, setMessageData) {
    const url = `https://${chabk}/Product/Good/Delete`;

    const data = {
        goodCodeId: edit.goodCodeId,
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
        //    ...
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

export async function postGoodUpdate(
      data,
      token,
      chabk,
      setCheckDataAll,
      setCheckData,
      setMessageData
    ) {
    const url = `https://${chabk}/Product/Good/Update`;


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
            setCheckDataAll((r) => ({...r,check1: true}));
        } else {
            setCheckData(true);
            setMessageData(
                result.errors ? result.errors : result.message
            );
        }

        return result;
    } catch (error) {
        setCheckData(true);

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