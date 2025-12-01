import { NextFunction, Request, Response } from "express";
import { createAddressService, getAddressByUserIdService, updateAddressService } from "../services/address.service";
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
        const [addressId, updatedata] = [req.validatedParams, req.validatedBody]
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
        const data = await getAddressByUserIdService(req.validatedParams);
        successResponse(res, 200, "Get address by id")
    } catch (error) {
        next(error)
    }
}