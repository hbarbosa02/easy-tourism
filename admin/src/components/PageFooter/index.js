import React from 'react';

import './styles.css';

function PageFooter({title, description, children}) {
    return (
        <footer className="page-footer">
            <div className="top-bar-container">
              <span>
                <span>PH Viagens e Turismo</span> &copy; {new Date().getFullYear()}.
              </span>
              <span className="ml-auto">
                Desenvolvido por <a href="https://www.linkedin.com/in/hiran-silva-2a28baa4/">Hiran Silva</a>
              </span>
            </div>
        </footer>
    );
}

export default PageFooter;