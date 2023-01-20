import {redirect} from "react-router-dom"
import ErrorPage from "./error"

export function action () {
  return redirect("/store/all")
}

export {
  ErrorPage
};
