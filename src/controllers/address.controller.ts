import { NextFunction, Request, Response } from "express";
import { createAddressService, updateAddressService } from "../services/address.service";
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
export const getAllAddressControl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

    } catch (error) {
        next(error)
    }
}
export const getAddressByIdControl = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

    } catch (error) {
        next(error)
    }
}