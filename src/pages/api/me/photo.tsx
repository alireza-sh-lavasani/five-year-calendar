import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

/**
 * Create a get request to microsoft graph api to get user's photo
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // fetch the token from req headers
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const headers = {
        Authorization: `Bearer ${'EwCgA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAASZpTWurbxOu+bKsuDDnntuKUfxT0e0cFozpUpnKMpE3q9GvA5zbZDdr3mIFILWxgSVql0omd2nLDgaRTeR6VVYzFjBIrYhRh7JEmYC90QQdQFVT+V/EUN026VdzrXczR/7x/724WFw0mYGISH6aKEVdZ/eARumsM6Sb7r5D6SNQcoKdU0D3kotq54u30LMjNSHCHbJiP83bGSRZ5JDxwkhO02nWW6zhEq9RkTn/M1nXYtQz4n0ZfTZmv8oqyAHSvnAs45r74mElubX77pTZp9NOGmrBD6LgV9HM0IV4pmmF4lIL0uGoECnvfKb+CmMsx5WP+w3bLUVZA9MEfg1JGRMDZgAACMyJ4C4pcxSqcAKTU/69VkwMzg4qTb+RNomvhNXIjngY54T2NflboQspeS+mKxITSx1J2ZT0m9B8i/VfApx5yW1vZqxDNjCkPO14JrfQV7d8L/KPtfygBVUKNsM9GqeXxzYo++H6U1MDchk4C97YSGgmdba/OBUvM7Hd62A3t0P+R6UBKobgDiAbbXbaHq298/McRPfexj2r8HNL7JtuKFyl5flOuRW6jnE7QcPO2Ctx3L/WZXnlugZqyHPK9eiS7Jlrf3hjRLf3oLn/wKHwUs/5AOy/u+eGh6acrkLFmXxRRoMZ3rYBfBEt6VC0vqgZEAU4PvggdXVum1Xm0bgs74x/UCaaj+PURasnGbUmONnTCsabN56D+5EOfTb3DDU9XlDsBWa4DHKYq7cSUZo8tQDnCxx2LpfUQu/CkVBUjSF79xbzJCHu7BejXB07iTHzkW6CjUNHf/6H6G/DEki3mEYYCwBr2PBMLoCQrqnisBCDdrRLBf0BVFTKyXpzDtEwUuqRbWHHfh0yXSLva34DLRY5A1WBVKaX5Tc/Ra2eQqCcMmduQymasZt8gCOMH+t/xWYtU1u8k6Fx9jZvZPqwaHaATjm2OREep8Kplzf023QJ+eCnqdOm6UEvF94qrtro6rSi1Zh3hd00dKzcSmo8m1/oiNM2KYnTK0q8GOq6t1KCgoPsYNqDrJPOBhkLklFP1ATSSrmSkvHW1m9yQMaVNbdS0JNtE1eXCtGLFA3nWgBDZhcrvTPTgFXCFYiUEwZTmVM4i9ZL+rt58ecZZoAf7tUGPvbd35wt05IIwy8Lvn2AvwvFA/C7T6+NH3nj1cHHwR7qxm7zSUqkKcChAg=='}`,
        'Content-Type': 'application/json',
    };
    try {
        const response = await axios.get('https://graph.microsoft.com/v1.0/me/photo/$value', { headers });
        res.status(200).json({ message: 'User photo fetched successfully', data: response.data });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user photo' });
    }
}