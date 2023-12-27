import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, result }) => {
  return (
    <div>
      <Header currentUser={result} />
      <Component {...pageProps} />
    </div>
  );
};


AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/current");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
