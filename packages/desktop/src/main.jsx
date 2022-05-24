import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
