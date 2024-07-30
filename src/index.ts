import { User } from "./models/User";
import { UserEdit } from "./Views/UserEdit";

const user = User.buildUser(
  { name: "Hamsa", age: 20 },
  "http://localhost:3000/users"
);

const root = document.getElementById("root");

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
} else {
  throw new Error("Root Element not found");
}
