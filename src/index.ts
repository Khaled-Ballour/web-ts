import { User } from "./models/User";
import { UserForm } from "./Views/UserForm";

const userForm = new UserForm(document.getElementById("root") as HTMLElement);
userForm.render();

const userCollection = User.buildUserCollection("http://localhost:3000/users");
userCollection.on("change", () => {
  console.log(userCollection.models);
});

userCollection.fetch();
