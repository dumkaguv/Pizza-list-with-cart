import Header from "../components/Header";

function NotFound() {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <div className="container">
          <h1>404</h1>
          <p>Страница не найдена</p>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
