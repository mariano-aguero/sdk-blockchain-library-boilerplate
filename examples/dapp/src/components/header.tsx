import React from 'react'

import { Connect } from './connect'

export const Header = () => {
  return (
    <>
      <nav className="nav">
        <div className="nav-left" />
        <div className="nav-center">
          <span className="brand">
            <h3>
              A <strong>dApp</strong> example.
            </h3>
          </span>
        </div>
        <div className="nav-right">
          <Connect />
        </div>
      </nav>
    </>
  )
}
