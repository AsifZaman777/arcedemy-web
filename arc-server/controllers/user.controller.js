const User = require('../models/user.model');

const getAllUsers = async(req, res) => {
   try{
    const users = await User.find();
    res.status(200).json(
        users
    );
   }
    catch (error)
    {
     res.status(500).json({
          message: 'Error getting users',
          error: error.message
     });
    }

}

const getUserById = (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        message: `Get user by id ${id}`
    });
}

const createUser = async (req, res) => {
   try
   {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    await newUser.save();
    res.status(201).json({
        message: 'User created',
        user: newUser
    });
   }
    catch (error)
    {
     res.status(500).json({
          message: 'Error creating user',
          error: error.message
     });
    }
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    res.status(200).json({
        message: `User with id ${id} updated`,
        user: {
            name,
            email
        }
    });
}

const deleteUser = async(req, res) => {
    try
    {
        const { id } = req.params;
        const user = User.findByIdAndDelete(id);
        if (!user)
        {
            return res.status(404).json({
                message: `User with id ${id} not found`
            });
        }
        await user.remove();
        res.status(200).json({
            message: `User with id ${id} deleted`
        });
    }
    catch (error)
    {
     res.status(500).json({
          message: 'Error deleting user',
          error: error.message
     });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}