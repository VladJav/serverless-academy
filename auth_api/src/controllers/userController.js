export const showMe = (req, res) => {
    const { userId, email } = req.user;

    res.json({
        success: true,
        data: {
            id: userId,
            email
        }
    });
};