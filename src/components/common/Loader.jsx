
const Loader = () => {
    return (  
        // <!-- Preloader -->
window.location.pathname !== "/admin"?
        <div className="preloader flex-column justify-content-center align-items-center">
          <img className="animation__shake" src="/images/1.png" alt="SAGA" height="60" width="60"/>
        </div>
:null
    )
}
 
export default Loader;