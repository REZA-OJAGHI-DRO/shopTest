import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import * as serviceWorker from './serviceWorker'; 
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    static getDerivedStateFromError(error) {
        // به‌روزرسانی state به این منظور که نمایش fallback UI انجام شود
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error, info) {
        // خطا را به یک سرویس گزارش دهی خطا ارسال کنید
        console.error("Error logged from Error Boundary:", error);
        // می‌توانید خطا را به یک سرویس مانند Sentry ارسال کنید
    }

    render() {
        if (this.state.hasError) {
            // می‌توانید هر UI سفارشی که می‌خواهید را اینجا برگردانید
            return (
                <div>
                    <p>خطا: {this.state.errorMessage}</p>
                    <p>لطفاً دوباره تلاش کنید و اگر مشکل ادامه داشت، با پشتیبانی تماس بگیرید.</p>
                </div>
            );
        }

        return this.props.children; 
    }
}

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <Provider store={store}> 
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </Provider>
        </ErrorBoundary>
    </StrictMode>,
);

// ثبت Service Worker
serviceWorker.register();
