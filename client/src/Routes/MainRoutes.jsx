import React from 'react'
import { Route, Routes } from 'react-router'
import { Home } from '../Pages/Home'

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
