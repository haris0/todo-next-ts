import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import TodosContextProvider from 'context/TodosContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <TodosContextProvider>
    <Component {...pageProps} />
  </TodosContextProvider>
);

export default MyApp;
