import Layout from './components/Layout'
import Favorites from './components/Main/Card/Favorites/index.jsx'
import { Route, Routes } from 'react-router-dom'
import Card from './components/Main/Card/index.jsx'
import ErrrorPage from './components/Error/index.jsx'
import { ThemeProvider } from './providers/ThemeProvider.jsx'
import ThemeLayout from './components/Layout/ThemeLayout/index.jsx'

function App() {
  return (
    <>
      <ThemeProvider>
        <ThemeLayout>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Card />} />
              <Route path="Favorites" element={<Favorites />}/>
            </Route>
            <Route path='*' element={<ErrrorPage />} />
          </Routes>
        </ThemeLayout>
      </ThemeProvider>
    </>
  )
}

export default App
