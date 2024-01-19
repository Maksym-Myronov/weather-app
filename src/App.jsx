import Layout from './components/Layout'
import Favorites from './components/Main/Card/Favorites/index.jsx'
import { Route, Routes } from 'react-router-dom'
import Card from './components/Main/Card/index.jsx'

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Card />} />
            <Route path="Favorites" element={<Favorites />}/>
          </Route>
        </Routes>
    </>
  )
}

export default App
