import ErrorMessege from "../errorMessege/ErrorMessege";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <ErrorMessege />
      <p
        style={{
          'textAlign': 'center',
          'fontWeight': 'bold',
          'fontSize': '24px',
        }}
      >Страница не найдена</p>

      <Link
        to="/"
        style={{
          'display': 'block',
          'textAlign': 'center',
          'fontWeight': 'bold',
          'fontSize': '24px',
          'marginTop': '30px'
        }}
      >Вернуться в главное меню</Link>
    </div>
  )
}

export default Page404;