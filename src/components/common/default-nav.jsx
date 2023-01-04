<nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="/#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>

        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" data-widget="fullscreen" role="button">
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
        {/*   <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button" aria-expanded="false"
              title={localStorage.getItem("user.name")}
            >
              <div style={{ width: "50px", display: "contents" }}>
                <img
                  style={{
    width: '34px',
    height: '34px',
    marginRight: '10px',
    marginTop: '-2px'
}}
                  src="/adminlte/img/default.png"
                  className="img-fluid float-left rounded-circle"
                  alt="User Image"
                />
              </div>
              <span className="d-none d-sm-block">
                {localStorage.getItem("user.name")}
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-header">
                {localStorage.getItem("user.name")}
              </span>
              <div className="dropdown-divider"></div>
              <div className="dropdown-divider"></div>
               <a
                href="{{ route('logout') }}"
                onClick={{event.preventDefault();
              document.getElementById('logout-form').submit();}}
                className="dropdown-item"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>Logout
                <span className="float-right text-muted text-sm">2 days</span>
              </a> 
              <form
                id="logout-form"
                action="{{ route('logout') }}"
                method="POST"
                className="d-none;"
              ></form>
            </div>
          </li> */}
          <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">Dropdown</a>
   
    <ul className="dropdown-menu">
      <li><a className="dropdown-item" href="#">Action</a></li>
      <li><a className="dropdown-item" href="#">Another action</a></li>
      <li><a className="dropdown-item" href="#">Something else here</a></li>
      <li><hr className="dropdown-divider"/></li>
      <li><a className="dropdown-item" href="#">Separated link</a></li>
    </ul>
    
  </li>
        </ul>
      </nav>