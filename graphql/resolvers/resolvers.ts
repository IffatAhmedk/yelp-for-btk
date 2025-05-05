import user from "../../models/user";

let resolvers = {
  Query: {
    getUsers: async () => {
      try {
        return await user.find();
      } catch (err) {
        throw new Error("Failed to fetch users");
      }
    },

    getUser: async (_: any, { id }) => {
      try {
        const foundUser = await user.findById(id);
        if (!foundUser) {
          throw new Error(`User with ID ${id} not found`);
        }
        return foundUser;
      } catch (err) {
        throw new Error("Failed to fetch user");
      }
    },
  },

  Mutation: {
    addUser: async (_: any, name: String, email: String, age: Number) => {
      try {
        const newUser = new user({ name, email, age });
        await newUser.save();  
        return newUser;  
      } catch (err) {
        throw new Error("Failed to add user");
      }
    },

    updateUser: async (
      _: any,
      id: String,
      name: String,
      email: String,
      age: String
    ) => {
      try {
        const updatedUser = await user.findByIdAndUpdate(id, { name, email, age }, { new: true });  
        if (!updatedUser) {
          throw new Error(`User with ID ${id} not found`);
        }
        return updatedUser;  
      } catch (err) {
        throw new Error("Failed to update user");
      }
    },

    deleteUser: async (_: any, id: String) => {
      try {
        const deletedUser = await user.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error(`User with ID ${id} not found`);
        }
        return true;
      } catch (err) {
        throw new Error("Failed to delete user");
      }
    },

  },
};
export default resolvers;
