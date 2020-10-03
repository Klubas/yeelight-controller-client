import React, {useState} from 'react';
import Login from './components/Login'

import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core';

import ThemeToggler from './components/ThemeToggler';

const App = ({ access_token }) => {
  const [token, setToken] = useState(access_token)

  const Header = () => (
      <header className="App-header">
        <ThemeToggler />
      </header>
  )
  
  const Footer = () => (
      <footer className="App-footer">
        Icons made by&nbsp;
        <a 
          href="https://www.flaticon.com/authors/freepik" 
          title="Freepik">Freepik&nbsp;
        </a> 
        from&nbsp;
        <a 
          href="https://www.flaticon.com/" 
          title="Flaticon">www.flaticon.com&nbsp;
        </a>
      </footer>
  )

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <ColorModeProvider>
          <Header/>
            <Login access_token={token}/>
          <Footer/>
        </ColorModeProvider>
      </ThemeProvider>
    </div>
    ) 
}

export default App;
