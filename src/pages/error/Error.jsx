import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function ErrorPage() {
  return (
    <>
    <Header />
    <div className="error-container">
      <h1 className="error-message">Sorry, an error has occurred.</h1>
      <br />
      <p className="redirect-message">
        Click on the logo to return to the homepage.
      </p>
    </div>
    <Footer />
    </>
  );
}

export default ErrorPage;
