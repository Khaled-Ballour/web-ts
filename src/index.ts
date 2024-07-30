import { User } from "./models/User";
import { UserForm } from "./Views/UserForm";

const user = User.buildUser(
  { name: "NAME", age: 40 },
  "http://localhost:3000/users"
);
user.on("change", () => {
  console.log(user.get("age"));
});
const userForm = new UserForm(
  document.getElementById("root") as HTMLElement,
  user
);
userForm.render();
