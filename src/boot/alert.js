import {Dialog} from "quasar";

const alert = (title, message) => {
  return Dialog.create({
    title: title,
    message: message,
    persistent: true
  })
}
export default alert;
