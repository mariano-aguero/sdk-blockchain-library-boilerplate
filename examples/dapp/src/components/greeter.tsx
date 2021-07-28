import React from 'react'

export const Greeter = () => {
  return (
    <section id="greeter">
      <header>
        <h1>Greeter</h1>
      </header>
      <form>
          <p className="grouped">
            <input type="text" name="greeter" id="greeter" placeholder="Greeter"/>
            <button className="button primary">Submit</button>
          </p>
      </form>
    </section>
  )
}
