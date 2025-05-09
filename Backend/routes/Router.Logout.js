import express from 'express';

const router = express.Router();


const logout = router.post('/', async (req, res) => {
    try {
        // Clear the cookies
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        };

        res.clearCookie('accessToken', options);
        res.clearCookie('refreshToken', options);

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
)


export default logout;