import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import $ from 'jquery';
declare global {
    interface Window {
        $: typeof $;
        jQuery: typeof $;
    }
}


window.$ = $;
window.jQuery = $;

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
