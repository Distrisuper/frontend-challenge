
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PokemonProvider } from "./context/PokemonContext"

createRoot(document.getElementById('root')!).render(
 
		<PokemonProvider>
			<App />
		</PokemonProvider>

)
