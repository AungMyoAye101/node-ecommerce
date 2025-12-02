import { NextFunction, Request, Response } from "express";
import { createAddressService, deleteAddressService, getAddressByUserIdService, updateAddressService } from "../services/address.service";
import { successResponse } from "../common/utils/apiResponse";

export const addressCreateControl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await createAddressService(req.validatedBody)

        successResponse(res, 201, "Address created success.", { data })
    } catch (error) {
        next(error)
    }
}
export const addressUpdateControl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const [addressId, updatedata] = [req.validatedParams.id, req.validatedBody]
        const data = await updateAddressService(addressId, updatedata);

        successResponse(res, 201, "Address created success.", { data })
    } catch (error) {
        next(error)
    }
}

export const getAddressByUserIdControl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.validatedParams.id;
        console.log(userId)
        const data = await getAddressByUserIdService(req.validatedParams.id);
        successResponse(res, 200, "Get address by id", { data })
    } catch (error) {
        next(error)
    }
}

export const addressDeleteControl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        req.validatedParams.id
        const data = await deleteAddressService(req.validatedParams.id);

        successResponse(res, 201, "Address deleted success.", { data })
    } catch (error) {
        next(error)
    }
}
