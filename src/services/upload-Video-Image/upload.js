

export const SupplierGetFiles = async (
    id,
    token,
    chabk,
    setMessageData,
    setCheckData,
    setData,
    setPlay,
    setCheckDataAll
) => {
    const url = `https://${chabk}/Profile/Supplier/GetFiles`;
    const data = { id };

  
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
            console.log(result.data);
            const RData = result.data
            setData(RData);
            setPlay(
                RData &&
                RData.length > 0 &&
                RData.filter((item) => item.fileType === 10)[0]
            )
            setCheckDataAll((r) => ({...r,check1: true}));
        } else {
            setCheckData(true);
            setMessageData((prevData) => [
                ...prevData,
                result.errors ? result.errors : result.message
            ]);
        }

        return result;
    } catch (error) {
        setCheckData(true);

        if (error instanceof TypeError && error.message === "Failed to fetch") {
            setMessageData((prevData) => [
                ...prevData, 
                'خطا در دریافت اطلاعات تامین کننده : شما اجازه دسترسی به این قسمت را ندارید.'
            ]);
        } else if (!navigator.onLine) {
            setMessageData((prevData) => [
                ...prevData, 
                "مشکلی در ارتباط با سرور وجود دارد. لطفاً اتصال اینترنت خود را بررسی کنید."
            ]);
        } else {
            const errorMessages = {
                400: 'خطا در دریافت اطلاعات تامین کننده : درخواست نادرست است. لطفاً اطلاعات ورودی را بررسی کنید.',
                401: 'خطا در دریافت اطلاعات تامین کننده : برای دسترسی به این بخش باید وارد حساب کاربری خود شوید.',
                403: 'خطا در دریافت اطلاعات تامین کننده : شما اجازه دسترسی به این قسمت را ندارید.',
                404: 'خطا در دریافت اطلاعات تامین کننده : صفحه یا منبع مورد نظر پیدا نشد.',
                408: 'خطا در دریافت اطلاعات تامین کننده : زمان درخواست تمام شد. لطفاً دوباره امتحان کنید.',
                500: 'خطا در دریافت اطلاعات تامین کننده : مشکلی در سرور به وجود آمده است. لطفاً بعداً دوباره تلاش کنید.',
                502: 'خطا در دریافت اطلاعات تامین کننده : مشکلی در ارتباط با سرور پیش آمده است. لطفاً بعداً امتحان کنید .',
                503: 'خطا در دریافت اطلاعات تامین کننده : سرویس در حال حاضر در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.',
                504: 'خطا در دریافت اطلاعات تامین کننده : زمان اتصال به سرور اصلی تمام شد.'
            };
            
            const message = errorMessages[Number(error.message)] || 'خطا در دریافت اطلاعات تامین کننده : خطای ناشناخته‌ای رخ داده است.';
            setMessageData((prevData) => [...prevData, message]);
        }
    }
};


export async function addFile(id, data, token, chabk) {
    const url = `https://${chabk}/Profile/Supplier/AddFile`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "supplierId": id,
            "fileIds": [data]
        }),
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            // اگر پاسخ نادرست بود، یک شیء با وضعیت شکست برگردانید
            return {
                isSuccess: false,
                message: `HTTP error! status: ${response.status}`
            };
        }

        const responseData = await response.json();
        return {
            isSuccess: true,
            data: responseData.data // یا هر چیزی که می‌خواهید برگردانید
        };
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            isSuccess: false,
            message: error.message || 'Unknown error occurred'
        };
    }
}

export async function SupplierUpdateMainFile(id, fileId, fileType, token, chabk) {
    const url = `https://${chabk}/Profile/Supplier/UpdateMainFile`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "supplierId": id,
            "fileId": fileId,
            "fileType": fileType
        }),
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}
export async function SupplierRemoveFile(id, fileId, token, chabk) {
    const url = `https://${chabk}/Profile/Supplier/RemoveFile`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "supplierId": id,
            "fileIds": [fileId]
        }),
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {

            return {
                isSuccess: false,
                message: `HTTP error! status: ${response.status}`
            };
        }

        const responseData = await response.json();
        return {
            isSuccess: true,
            data: responseData.data
        };
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            isSuccess: false,
            message: error.message || 'Unknown error occurred'
        };
    }
}