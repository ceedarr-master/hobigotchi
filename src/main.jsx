import 'galmuri/dist/galmuri.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactGA from "react-ga4"; // 임포트 추가
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

ReactGA.initialize("G-384765112");

// (선택 사항) 초기 페이지 로드 전송
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
