import user from "../../models/user";

let resolvers = {
  Query: {
    users: async () => user.find(),
    user: async (_: any, { id }) => user.findById(id),
  },
  Mutation: {
    addUser: async (_: any, name: String, email: String, age: Number) => {
      let User = new user(name, email, age);
      User.save();
      console.log(User);
      return User._id;
    },
    updateUser: async (
      _: any,
      id: String,
      name: String,
      email: String,
      age: String
    ) => {
      return user.findByIdAndUpdate(id, { name, email, age });
    },
    deleteUser: async (_: any, id: String) => {
      return user.findByIdAndDelete(id);
    },
  },
};
export default resolvers;
