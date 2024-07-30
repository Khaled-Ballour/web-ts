import { User } from "./models/User";
import { UserForm } from "./Views/UserForm";

const user = User.buildUser(
  { name: "Hamsa", age: 20 },
  "http://localhost:3000/users"
);

const root = document.getElementById("root");

if (root) {
  const userForm = new UserForm(root, user);
  userForm.render();
} else {
  throw new Error("Root Element not found");
}
